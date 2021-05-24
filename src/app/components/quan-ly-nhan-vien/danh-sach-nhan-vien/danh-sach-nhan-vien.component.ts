import { Component, OnInit, ViewChild } from "@angular/core";
import { TaoNhanVienComponent } from "../tao-nhan-vien/tao-nhan-vien.component";
import { NhanVien } from "../../../models/nhan-vien.models";
import { NhanVienService } from "../../../services/nhan-vien.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { ChiTietNhanVienComponent } from "../chi-tiet-nhan-vien/chi-tiet-nhan-vien.component";
import { AuthService } from "../../../services/auth.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-danh-sach-nhan-vien",
  templateUrl: "./danh-sach-nhan-vien.component.html",
  styleUrls: ["./danh-sach-nhan-vien.component.scss"],
})
export class DanhSachNhanVienComponent implements OnInit {
  @ViewChild("taoNhanVienTempl") taoNhanVien!: TaoNhanVienComponent;
  @ViewChild(ChiTietNhanVienComponent) chiTietNV!: ChiTietNhanVienComponent;
  searchText!: string;
  dsNhanVien: NhanVien[] = [];

  constructor(
    private nhanVienService: NhanVienService,
    private msg: NzMessageService,
    private modal: NzModalService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.nhanVienService.dsNhanVien$.subscribe((data) => {
      this.dsNhanVien = data;
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

  showConfirm(username: string): void {
    this.modal.confirm({
      nzTitle: "<i>Xác nhận lấy lại <b>Mật khẩu</b>?</i>",
      nzContent:
        "<b>Sau khi lấy lại mật khẩu, vui lòng đăng nhập để thay đổi!</b>",
      nzOnOk: () => this.xacNhanLayLaiMatKhau(username),
    });
  }

  xacNhanLayLaiMatKhau(username: string) {
    this.auth.xacNhanLayLaiMatKhau(username).subscribe(
      (res) => {
        this.modal.success({
          nzTitle: "Lấy lại mật khẩu thành công!",
          nzContent: `Đây là mật khẩu mới: <b>${res}</b>`,
        });
      },
      (err) => {
        console.log("Lỗi", err);
        this.modal.error({
          nzTitle: "Xảy ra lỗi!",
          nzContent: `Vui lòng kiểm tra lại...`,
        });
      }
    );
  }
}
