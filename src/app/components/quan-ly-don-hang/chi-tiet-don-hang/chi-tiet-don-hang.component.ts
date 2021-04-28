import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DonHangService } from "../../../services/don-hang.service";

@Component({
  selector: "app-chi-tiet-don-hang",
  templateUrl: "./chi-tiet-don-hang.component.html",
  styleUrls: ["./chi-tiet-don-hang.component.scss"],
})
export class ChiTietDonHangComponent implements OnInit {
  isVisible = false;
  donHang: any;
  idDonHang: any;
  tongKhoiLuongHang = 0;
  tongGiaTriHang = 0;
  base64Data: any;
  retrievedAvatar: any;

  constructor(
    private donHangService: DonHangService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idDonHang = this.route.snapshot.paramMap.get("idDonHang");
    this.donHangService.layDonHangTheoID(this.idDonHang).subscribe(
      (res) => {
        this.donHang = res;
        this.base64Data = this.donHang.anhDinhKem;
        this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
        this.donHang.dsHangHoa.forEach((dh: any) => {
          this.tongKhoiLuongHang += parseInt(dh.khoiLuong);
          this.tongGiaTriHang += parseInt(dh.giaTri);
        });
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );
  }
}
