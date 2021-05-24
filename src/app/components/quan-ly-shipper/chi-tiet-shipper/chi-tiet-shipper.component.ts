import { Component, OnInit } from "@angular/core";
import { ShipperService } from "../../../services/shipper.service";

@Component({
  selector: "app-chi-tiet-shipper",
  templateUrl: "./chi-tiet-shipper.component.html",
  styleUrls: ["./chi-tiet-shipper.component.scss"],
})
export class ChiTietShipperComponent implements OnInit {
  isVisible = false;
  shipper: any;

  constructor(private shipperService: ShipperService) {}

  ngOnInit() {}

  showModal(idShipper: any): void {
    this.shipperService.layShipperTheoID(idShipper).subscribe(
      (res) => {
        this.shipper = res;
        console.log(this.shipper);
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
