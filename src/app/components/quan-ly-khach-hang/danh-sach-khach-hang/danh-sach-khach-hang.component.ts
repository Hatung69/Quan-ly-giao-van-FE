import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { KhachHang } from "../../../models/khach-hang.model";
import { KhachHangService } from "../../../services/khach-hang.service";
import { ChiTietKhachHangComponent } from "../chi-tiet-khach-hang/chi-tiet-khach-hang.component";
import { QuanLyKhachHangComponent } from "../quan-ly-khach-hang.component";

@Component({
  selector: "app-danh-sach-khach-hang",
  templateUrl: "./danh-sach-khach-hang.component.html",
  styleUrls: ["./danh-sach-khach-hang.component.scss"],
})
export class DanhSachKhachHangComponent implements OnInit {
  @Input() dsKhachHang!: KhachHang[];
  @Input() thisIsParent!: QuanLyKhachHangComponent;
  @ViewChild(ChiTietKhachHangComponent) chiTietKh!: ChiTietKhachHangComponent;

  constructor(
    public khachHangService: KhachHangService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {}

  // Xoá khách hàng
  deleteRow(id: string): void {
    this.khachHangService.xoaKhachHang(id).subscribe(
      (res) => {
        this.thisIsParent.filterInput.control.reset(null);
        this.msg.success("Xoá thành thành công!", { nzDuration: 2000 });
        this.khachHangService.loadDSKhachHang();
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
