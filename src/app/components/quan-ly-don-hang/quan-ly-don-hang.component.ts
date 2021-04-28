import { Component, OnInit } from "@angular/core";
import { DonHangService } from "../../services/don-hang.service";

@Component({
  selector: "app-quan-ly-don-hang",
  templateUrl: "./quan-ly-don-hang.component.html",
  styleUrls: ["./quan-ly-don-hang.component.scss"],
})
export class QuanLyDonHangComponent implements OnInit {
  tongDH = 0;
  dsDonHang!: any[];
  dsChoXacNhan!: any[];
  dsChoLayHang!: any[];
  dsDangGiao!: any[];
  dsHoanThanh!: any[];
  dsDonBiHuy!: any[];
  dsTraHang!: any[];

  constructor(private donHangService: DonHangService) {}
  ngOnInit(): void {
    this.loadDsShipper();
  }

  loadDsShipper() {
    this.donHangService.dsDonHang$.subscribe(
      (res) => {
        this.dsDonHang = res;
        console.log(this.dsDonHang);
        this.tongDH = this.dsDonHang.length;

        this.dsChoXacNhan = this.dsDonHang.filter(
          (data) => data.trangThai === "Cho_xac_nhan"
        );
        this.dsChoLayHang = this.dsDonHang.filter(
          (data) => data.trangThai === "Cho_lay_hang"
        );
        this.dsDangGiao = this.dsDonHang.filter(
          (data) => data.trangThai === "Dang_giao"
        );
        this.dsHoanThanh = this.dsDonHang.filter(
          (data) => data.trangThai === "Hoan_thanh"
        );
        this.dsDonBiHuy = this.dsDonHang.filter(
          (data) => data.trangThai === "Don_bi_huy"
        );
        this.dsTraHang = this.dsDonHang.filter(
          (data) => data.trangThai === "Tra_hang"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }
}
