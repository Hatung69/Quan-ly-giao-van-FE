import { Component, Input, OnInit } from "@angular/core";
import { NhanVienService } from "../../../services/nhan-vien.service";

@Component({
  selector: "app-chi-tiet-nhan-vien",
  templateUrl: "./chi-tiet-nhan-vien.component.html",
  styleUrls: ["./chi-tiet-nhan-vien.component.scss"],
})
export class ChiTietNhanVienComponent implements OnInit {
  @Input() idNhanVien!: string;
  isVisible = false;
  nhanVien: any;
  base64Data: any;
  retrievedAvatar: any;

  constructor(private nhanVienService: NhanVienService) {}

  ngOnInit() {}

  showModal(): void {
    this.nhanVienService.layNhanVienTheoID(this.idNhanVien).subscribe(
      (res) => {
        this.nhanVien = res;
        this.base64Data = this.nhanVien.avatar;
        this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
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
