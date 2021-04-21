import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuanLyShipperComponent } from "./quan-ly-shipper.component";
import { CapNhatShipperComponent } from "./cap-nhat-shipper/cap-nhat-shipper.component";
import { TaoMoiShipperComponent } from "./tao-moi-shipper/tao-moi-shipper.component";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { DanhSachShipperComponent } from "./danh-sach-shipper/danh-sach-shipper.component";
import { DataTablesModule } from "angular-datatables";

export const routes: Routes = [
  {
    path: "",
    canActivate: [CanActiveDashboard],
    component: QuanLyShipperComponent,
  },
  {
    path: "tao-moi",
    component: TaoMoiShipperComponent,
  },
  {
    path: "cap-nhat/:idShipper",
    component: CapNhatShipperComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    PipesCustomModule,
  ],
  declarations: [
    QuanLyShipperComponent,
    TaoMoiShipperComponent,
    CapNhatShipperComponent,
    DanhSachShipperComponent,
  ],
})
export class QuanLyShipperModule {}
