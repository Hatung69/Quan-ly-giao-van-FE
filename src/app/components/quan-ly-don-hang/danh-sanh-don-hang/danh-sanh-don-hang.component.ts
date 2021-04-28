import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DonHangService } from "src/app/services/don-hang.service";
import { ChiTietDonHangComponent } from "../chi-tiet-don-hang/chi-tiet-don-hang.component";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { NhanVienService } from "../../../services/nhan-vien.service";

@Component({
  selector: "app-danh-sanh-don-hang",
  templateUrl: "./danh-sanh-don-hang.component.html",
  styleUrls: ["./danh-sanh-don-hang.component.scss"],
})
export class DanhSanhDonHangComponent implements OnInit {
  isVisible = false;
  idDonHang!: string;
  @ViewChild(ChiTietDonHangComponent) chiTietDH!: ChiTietDonHangComponent;
  @Input() dsDonHang!: any[];

  constructor(
    private tokenService: TokenStorageService,
    private nhanVienService: NhanVienService,
    private donHangService: DonHangService
  ) {}
  ngOnInit() {}

  showModal(idDH: string): void {
    this.idDonHang = idDH;
    this.isVisible = true;
  }

  handleOk(): void {
    this.nhanVienService
      .layNhanVienTheoIDAcc(this.tokenService.getUser().id)
      .subscribe((tramID: any) => {
        this.donHangService.themTram(this.idDonHang, tramID).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err.status); //400 thì báo đã tồn tại
          }
        );
      });
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
}
