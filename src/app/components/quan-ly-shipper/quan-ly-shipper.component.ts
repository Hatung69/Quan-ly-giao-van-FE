import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Shipper } from "src/app/models/shipper.model";
import { ShipperService } from "../../services/shipper.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-quan-ly-shipper",
  templateUrl: "./quan-ly-shipper.component.html",
  styleUrls: ["./quan-ly-shipper.component.scss"],
})
export class QuanLyShipperComponent implements OnInit {
  @ViewChild("filterInput", { static: true }) filterInput!: NgModel;
  searchText = "";
  tongSp = 0;
  dsShipper!: Shipper[];
  dsNhanHang!: Shipper[];
  dsDangGiao!: Shipper[];
  dsTamNghi!: Shipper[];
  dsBiKhoa!: Shipper[];
  constructor(private shipperService: ShipperService) {}

  ngOnInit() {
    this.filterInput.valueChanges
      ?.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        if (term) this.shipperService.loadDSShipperTimKiem(term);
        else this.shipperService.loadDSShipper();
      });
    this.shipperService.loadDSShipper();
    this.loadDsShipper();
  }

  loadDsShipper() {
    this.shipperService.dsShipper$.subscribe(
      (res) => {
        this.dsShipper = res;
        this.tongSp = this.dsShipper.length;

        this.dsNhanHang = this.dsShipper.filter(
          (data) => data.trangThai === "Co_the_nhan_hang"
        );
        this.dsDangGiao = this.dsShipper.filter(
          (data) => data.trangThai === "Dang_giao_hang"
        );
        this.dsTamNghi = this.dsShipper.filter(
          (data) => data.trangThai === "Tam_nghi"
        );
        this.dsBiKhoa = this.dsShipper.filter(
          (data) => data.trangThai === "Bi_khoa"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }
}
