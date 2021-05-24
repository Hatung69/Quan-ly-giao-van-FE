import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { KhachHang } from "src/app/models/khach-hang.model";
import { KhachHangService } from "src/app/services/khach-hang.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-quan-ly-khach-hang",
  templateUrl: "./quan-ly-khach-hang.component.html",
  styleUrls: ["./quan-ly-khach-hang.component.scss"],
})
export class QuanLyKhachHangComponent implements OnInit {
  @ViewChild("filterInput", { static: true }) filterInput!: NgModel;
  searchText = "";
  tongKH = 0;
  dsKhachHang!: KhachHang[];
  dsCaNhan!: KhachHang[];
  dsCuaHang!: KhachHang[];

  getParentApi(): QuanLyKhachHangComponent {
    return this;
  }

  constructor(private khachHangService: KhachHangService) {}

  ngOnInit() {
    this.filterInput.valueChanges
      ?.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        if (term) this.khachHangService.loadDSKhachHangTimKiem(term);
        else this.khachHangService.loadDSKhachHang();
      });
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
