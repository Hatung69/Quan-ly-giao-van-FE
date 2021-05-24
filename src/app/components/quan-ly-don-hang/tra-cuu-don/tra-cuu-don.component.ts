import { Component, OnInit } from "@angular/core";
import { DonHangService } from "../../../services/don-hang.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-tra-cuu-don",
  templateUrl: "./tra-cuu-don.component.html",
  styleUrls: ["./tra-cuu-don.component.scss"],
})
export class TraCuuDonComponent implements OnInit {
  donHang: any;
  keyWord: string = "";

  constructor(
    private donHangSerice: DonHangService,
    private modal: NzModalService
  ) {}

  ngOnInit() {}

  timKiem() {
    this.keyWord.trim();
    if (this.keyWord) {
      this.donHangSerice.layDonHangTheoMaDon(this.keyWord).subscribe(
        (res) => {
          this.donHang = res;
          this.donHang.dsDonHangTram.sort(function (a: any, b: any) {
            var c = new Date(a.thoiGianKhoiTao).valueOf();
            var d = new Date(b.thoiGianKhoiTao).valueOf();
            return c - d;
          });
        },
        (err) => {
          this.modal.error({
            nzTitle: "Không tìm thấy đơn hàng!",
            nzContent: "Vui lòng nhập đúng Mã đơn hàng để kiểm tra.",
          });
        }
      );
    }
  }
}
