import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { DonHangService } from "../../services/don-hang.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-quan-ly-don-hang",
  templateUrl: "./quan-ly-don-hang.component.html",
  styleUrls: ["./quan-ly-don-hang.component.scss"],
})
export class QuanLyDonHangComponent implements OnInit {
  @ViewChild("filterInput", { static: true }) filterInput!: NgModel;
  tongDH = 0;
  dsDonHang: any[] = [];
  dsChoXacNhan!: any[];
  dsChoLayHang!: any[];
  dsDangGiao!: any[];
  dsHoanThanh!: any[];
  dsDonBiHuy!: any[];
  searchText = "";

  constructor(private donHangService: DonHangService) {}
  ngOnInit(): void {
    this.loadDsShipper();
    this.filterInput.valueChanges
      ?.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((term) => {
        if (term) this.donHangService.loadDsDonHangTimKiem(term);
        else this.donHangService.loadDSDonHang();
      });
  }

  loadDsShipper() {
    this.donHangService.dsDonHang$.subscribe(
      (res) => {
        this.dsDonHang = res;
        this.tongDH = this.dsDonHang.length;

        this.dsChoXacNhan = this.dsDonHang.filter(
          (data) => data.trangThai === "Cho_xac_nhan"
        );
        this.dsChoLayHang = this.dsDonHang.filter(
          (data) => data.trangThai === "Cho_giao_hang"
        );
        this.dsDangGiao = this.dsDonHang.filter(
          (data) => data.trangThai === "Dang_giao"
        );
        this.dsHoanThanh = this.dsDonHang.filter(
          (data) => data.trangThai === "Hoan_thanh"
        );
        this.dsDonBiHuy = this.dsDonHang.filter(
          (data) => data.trangThai === "Don_bi_huy"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }
}
