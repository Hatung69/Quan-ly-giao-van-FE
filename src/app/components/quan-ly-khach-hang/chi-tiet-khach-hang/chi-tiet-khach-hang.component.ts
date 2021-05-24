import { Component, OnInit } from "@angular/core";
import { KhachHangService } from "../../../services/khach-hang.service";

@Component({
  selector: "app-chi-tiet-khach-hang",
  templateUrl: "./chi-tiet-khach-hang.component.html",
  styleUrls: ["./chi-tiet-khach-hang.component.scss"],
})
export class ChiTietKhachHangComponent implements OnInit {
  isVisible = false;
  khachHang: any;

  constructor(private khachHangService: KhachHangService) {}

  ngOnInit() {}

  showModal(idNhanVien: any): void {
    this.khachHangService.layKhachHangTheoID(idNhanVien).subscribe(
      (res) => {
        this.khachHang = res;
        console.log(this.khachHang);
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );

    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
