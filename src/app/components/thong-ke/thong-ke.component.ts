import { Component, OnInit } from "@angular/core";
import { DonHangService } from "../../services/don-hang.service";

interface tongThongKe {
  TongTram: number;
  TongKH: number;
  TongShipper: number;
  TongNhanVien: number;
}

@Component({
  selector: "app-thong-ke",
  templateUrl: "./thong-ke.component.html",
  styleUrls: ["./thong-ke.component.scss"],
})
export class ThongKeComponent implements OnInit {
  _tongThongKe: any;
  _donHang: any[] = [];
  _tongSoDonHang: number = 0;
  _tongSoTienShip: number = 0;
  _tongSoTienThuHo: number = 0;
  _tongSoTienHangHoa: number = 0;
  trangThaiDonHang: any;
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  legendPosition: any = "right";
  xAxisLabel = "Trạng thái đơn hàng";
  yAxisLabel = "Số lượng đơn hàng";
  colorScheme = {
    domain: ["#ffb600", "#007fff", "#b20091", "#56ea00", "#ce0000"],
  };
  constructor(private donHangService: DonHangService) {}

  ngOnInit() {
    this.donHangService.tongThongKe().subscribe((res) => {
      this._tongThongKe = res;
      console.log(res);
    });
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
          {
            name: "Chờ xác nhận",
            value: res.filter((data) => data.trangThai === "Cho_xac_nhan")
              .length,
          },
          {
            name: "Chờ giao hàng",
            value: res.filter((data) => data.trangThai === "Cho_giao_hang")
              .length,
          },
          {
            name: "Đang giao",
            value: res.filter((data) => data.trangThai === "Dang_giao").length,
          },
          {
            name: "Hoàn thành",
            value: res.filter((data) => data.trangThai === "Hoan_thanh").length,
          },
          {
            name: "Đơn bị huỷ",
            value: res.filter((data) => data.trangThai === "Don_bi_huy").length,
          },
        ];
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  onChange(result: Date[]): void {
    this.staticticalWithDate(result[0], result[1]);
  }

  selectedValue: string = "";
  selectedChange() {
    switch (this.selectedValue) {
      case "OneWeekAgo": {
        let _dateNow = new Date();
        let _oneWeekAge = new Date(
          _dateNow.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        this.staticticalWithDate(_oneWeekAge, _dateNow);
        break;
      }
      case "OneMonthAgo": {
        let _dateNow = new Date();
        let _oneWeekAge = new Date(
          _dateNow.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        this.staticticalWithDate(_oneWeekAge, _dateNow);
        break;
      }
      case "OneYearAgo": {
        let _dateNow = new Date();
        let _oneWeekAge = new Date(
          _dateNow.getTime() - 365 * 24 * 60 * 60 * 1000
        );
        this.staticticalWithDate(_oneWeekAge, _dateNow);
        break;
      }
    }
  }

  staticticalWithDate(from: Date, to: Date) {
    this.donHangService.thongKetTheoThoiGian(from, to).subscribe(
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
            {
              name: "Chờ xác nhận",
              value: res.filter(
                (data: any) => data.trangThai === "Cho_xac_nhan"
              ).length,
            },
            {
              name: "Chờ giao hàng",
              value: res.filter(
                (data: any) => data.trangThai === "Cho_giao_hang"
              ).length,
            },
            {
              name: "Đang giao",
              value: res.filter((data: any) => data.trangThai === "Dang_giao")
                .length,
            },
            {
              name: "Hoàn thành",
              value: res.filter((data: any) => data.trangThai === "Hoan_thanh")
                .length,
            },
            {
              name: "Đơn bị huỷ",
              value: res.filter((data: any) => data.trangThai === "Don_bi_huy")
                .length,
            },
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
