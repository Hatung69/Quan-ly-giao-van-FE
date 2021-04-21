import { Component, OnInit } from "@angular/core";
import { KhachHang } from "src/app/models/khach-hang.model";
import { KhachHangService } from "src/app/services/khach-hang.service";

@Component({
  selector: "app-quan-ly-khach-hang",
  templateUrl: "./quan-ly-khach-hang.component.html",
  styleUrls: ["./quan-ly-khach-hang.component.scss"],
})
export class QuanLyKhachHangComponent implements OnInit {
  searchText = "";
  tongKH = 0;
  dsKhachHang!: KhachHang[];
  dsCaNhan!: KhachHang[];
  dsCuaHang!: KhachHang[];

  constructor(private khachHangService: KhachHangService) {}

  ngOnInit() {
    this.khachHangService.loadDSKhachHang();
    this.loadDsKhachHang();
  }

  loadDsKhachHang() {
    this.khachHangService.dsKhachHang$.subscribe(
      (res) => {
        this.dsKhachHang = res;
        this.tongKH = this.dsKhachHang.length;
        this.dsCaNhan = this.dsKhachHang.filter(
          (data) => data.loaiKhachHang === "Cá nhân"
        );
        this.dsCuaHang = this.dsKhachHang.filter(
          (data) => data.loaiKhachHang === "Cửa hàng"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  chuyenTabCaNhan() {}

  chuyenTabCuaHang() {}
}
