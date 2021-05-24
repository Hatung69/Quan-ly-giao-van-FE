import { Component, OnInit } from "@angular/core";
import { DonHangService } from "../../services/don-hang.service";

interface tongThongKe {
  TongDH: number;
  TongKH: number;
  TongShipper: number;
  TongNhanVien: number;
}
interface trangThaiDonHang {
  ChoXacNhan: number;
  ChoGiaoHang: number;
  DangGiao: number;
  HoanThanh: number;
  DonBiHuy: number;
}

@Component({
  selector: "app-thong-ke",
  templateUrl: "./thong-ke.component.html",
  styleUrls: ["./thong-ke.component.scss"],
})
export class ThongKeComponent implements OnInit {
  _donHang: any[] = [];
  _tongSoDonHang: number = 0;
  _tongSoTienShip: number = 0;
  _tongSoTienThuHo: number = 0;
  _tongSoTienHangHoa: number = 0;
  // _tongThongKe: tongThongKe | undefined;
  _trangThaiDonHang: trangThaiDonHang | undefined;
  trangThaiDonHang: any[] = [];
  columnNames = [
    "Chờ xác nhận",
    "Chờ giao hàng",
    "Đang giao",
    "Hoàn thành",
    "Đơn bị huỷ",
  ];
  typeTT: any = "PieChart";
  optionsTT = {
    isStacked: true,
    colors: ["#ffb600", "#ff00a5", "#0055ff", "#1fef00", "#f90404"],
    slices: {
      1: { offset: 0.2 },
      3: { offset: 0.3 },
    },
  };

  constructor(private donHangService: DonHangService) {}

  ngOnInit() {
    // this.donHangService.tongThongKe().subscribe(
    //   (res) => {
    //     this._tongThongKe = res;
    //     console.log(this._tongThongKe);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    this.donHangService.dsDonHang$.subscribe(
      (res) => {
        if (res === null) return;

        this._donHang = res;
        this._tongSoDonHang = this._donHang.length;
        this._tongSoTienThuHo = Number(
          this._donHang
            .map((val) => val.tongTienThuHo)
            .reduce((acc, currValue) => acc + currValue, 0)
        );
        this._tongSoTienShip = Number(
          this._donHang
            .map((val) => val.phiShip)
            .reduce((acc, currValue) => acc + currValue, 0)
        );

        let dsTienHang: any[] = [];
        this._donHang
          .map((val) => val.dsHangHoa)
          .map((val: any[]) => {
            val.filter((hh) => dsTienHang.push(hh.giaTri));
          });
        this._tongSoTienHangHoa = Number(
          dsTienHang.reduce((acc, currValue) => acc + currValue, 0)
        );

        this.trangThaiDonHang = [
          [
            "Chờ xác nhận",
            res.filter((data) => data.trangThai === "Cho_xac_nhan").length,
          ],
          [
            "Chờ giao hàng",
            res.filter((data) => data.trangThai === "Cho_giao_hang").length,
          ],
          [
            "Đang giao",
            res.filter((data) => data.trangThai === "Dang_giao").length,
          ],
          [
            "Hoàn thành",
            res.filter((data) => data.trangThai === "Hoan_thanh").length,
          ],
          [
            "Đơn bị huỷ",
            res.filter((data) => data.trangThai === "Don_bi_huy").length,
          ],
        ];
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  onChange(result: Date[]): void {
    console.log(result);
    this.donHangService.thongKetTheoThoiGian(result[0], result[1]).subscribe(
      (res) => {
        this._donHang = res;
        console.log(res);
        if (res === null) {
          this.trangThaiDonHang = res;
          this._tongSoDonHang = 0;
          this._tongSoTienShip = 0;
          this._tongSoTienThuHo = 0;
          this._tongSoTienHangHoa = 0;
        } else {
          this._tongSoDonHang = this._donHang.length;
          this._tongSoTienThuHo = Number(
            this._donHang
              .map((val) => val.tongTienThuHo)
              .reduce((acc, currValue) => acc + currValue, 0)
          );
          this._tongSoTienShip = Number(
            this._donHang
              .map((val) => val.phiShip)
              .reduce((acc, currValue) => acc + currValue, 0)
          );

          let dsTienHang: any[] = [];
          this._donHang
            .map((val) => val.dsHangHoa)
            .map((val: any[]) => {
              val.filter((hh) => dsTienHang.push(hh.giaTri));
            });
          this._tongSoTienHangHoa = Number(
            dsTienHang.reduce((acc, currValue) => acc + currValue, 0)
          );
          this.trangThaiDonHang = [
            [
              "Chờ xác nhận",
              res.filter((data: any) => data?.trangThai === "Cho_xac_nhan")
                .length,
            ],
            [
              "Chờ giao hàng",
              res.filter((data: any) => data?.trangThai === "Cho_giao_hang")
                .length,
            ],
            [
              "Đang giao",
              res.filter((data: any) => data?.trangThai === "Dang_giao").length,
            ],
            [
              "Hoàn thành",
              res.filter((data: any) => data?.trangThai === "Hoan_thanh")
                .length,
            ],
            [
              "Đơn bị huỷ",
              res.filter((data: any) => data?.trangThai === "Don_bi_huy")
                .length,
            ],
          ];
        }
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  format(n: any, currency: any) {
    return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + currency;
  }
}
