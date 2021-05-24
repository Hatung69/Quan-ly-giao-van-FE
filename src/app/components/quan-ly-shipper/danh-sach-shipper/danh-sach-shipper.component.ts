import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { Shipper } from "src/app/models/shipper.model";
import { ShipperService } from "src/app/services/shipper.service";
import { ChiTietShipperComponent } from "../chi-tiet-shipper/chi-tiet-shipper.component";

@Component({
  selector: "app-danh-sach-shipper",
  templateUrl: "./danh-sach-shipper.component.html",
  styleUrls: ["./danh-sach-shipper.component.scss"],
})
export class DanhSachShipperComponent implements OnInit {
  @Input() dsShipper!: Shipper[];
  @ViewChild(ChiTietShipperComponent) chiTietSP!: ChiTietShipperComponent;
  constructor(
    private shipperService: ShipperService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {}

  // Xoá khách hàng
  deleteRow(id: string): void {
    this.shipperService.xoaShipper(id).subscribe(
      (res) => {
        this.msg.success("Xoá thành thành công!", { nzDuration: 2000 });
        this.shipperService.loadDSShipper();
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
