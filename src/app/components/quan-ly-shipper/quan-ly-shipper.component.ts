import { Component, OnInit } from "@angular/core";
import { Shipper } from "src/app/models/shipper.model";
import { ShipperService } from "../../services/shipper.service";

@Component({
  selector: "app-quan-ly-shipper",
  templateUrl: "./quan-ly-shipper.component.html",
  styleUrls: ["./quan-ly-shipper.component.scss"],
})
export class QuanLyShipperComponent implements OnInit {
  tongSp = 0;
  dsShipper!: Shipper[];
  dsNhanHang!: Shipper[];
  dsDangGiao!: Shipper[];
  dsTamNghi!: Shipper[];
  dsBiKhoa!: Shipper[];
  constructor(private shipperService: ShipperService) {}

  ngOnInit() {
    this.loadDsShipper();
  }

  loadDsShipper() {
    this.shipperService.dsShipper$.subscribe(
      (res) => {
        this.dsShipper = res;
        console.log(this.dsShipper);
        this.tongSp = this.dsShipper.length;

        this.dsNhanHang = this.dsShipper.filter(
          (data) => data.trangThai === "Có thể nhận hàng"
        );
        this.dsDangGiao = this.dsShipper.filter(
          (data) => data.trangThai === "Đang giao hàng"
        );
        this.dsTamNghi = this.dsShipper.filter(
          (data) => data.trangThai === "Tạm nghỉ"
        );
        this.dsBiKhoa = this.dsShipper.filter(
          (data) => data.trangThai === "Bị khoá"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  chuyenTabNhanHang() {}
  chuyenTabDangGiao() {}
  chuyenTabTamNghi() {}
  chuyenTabBiKhoa() {}
}
