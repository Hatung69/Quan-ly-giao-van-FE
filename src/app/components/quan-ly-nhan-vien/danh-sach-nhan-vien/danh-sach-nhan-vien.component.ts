import { Component, OnInit, ViewChild } from "@angular/core";
import { TaoNhanVienComponent } from "../tao-nhan-vien/tao-nhan-vien.component";
import { NhanVien } from "../../../models/nhan-vien.models";
import { NhanVienService } from "../../../services/nhan-vien.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { ChiTietNhanVienComponent } from "../chi-tiet-nhan-vien/chi-tiet-nhan-vien.component";
import { CapNhatNhanVienComponent } from "../cap-nhat-nhan-vien/cap-nhat-nhan-vien.component";

@Component({
  selector: "app-danh-sach-nhan-vien",
  templateUrl: "./danh-sach-nhan-vien.component.html",
  styleUrls: ["./danh-sach-nhan-vien.component.scss"],
})
export class DanhSachNhanVienComponent implements OnInit {
  @ViewChild("taoNhanVienTempl") taoNhanVien!: TaoNhanVienComponent;
  @ViewChild("chiTietNhanVienTempl")
  chiTietNhanVienTempl!: ChiTietNhanVienComponent;
  searchText!: string;
  dsNhanVien: NhanVien[] = [];
  tongNV = 0;

  constructor(
    private nhanVienService: NhanVienService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.nhanVienService.dsNhanVien$.subscribe((data) => {
      this.dsNhanVien = data;
      this.tongNV = this.dsNhanVien.length;
      console.log(this.dsNhanVien);
    });
  }

  // Xoá nhân viên
  deleteRow(id: string): void {
    this.nhanVienService.xoaNhanVien(id).subscribe(
      (res) => {
        this.msg.success("Xoá thành thành công!", { nzDuration: 2000 });
        this.nhanVienService.loadDSNhanVien();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }
}
