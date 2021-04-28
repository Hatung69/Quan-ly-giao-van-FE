import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaoDonHangComponent } from "./tao-don-hang/tao-don-hang.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";
import { QuanLyDonHangComponent } from "./quan-ly-don-hang.component";
import { DanhSanhDonHangComponent } from "./danh-sanh-don-hang/danh-sanh-don-hang.component";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { ChiTietDonHangComponent } from "./chi-tiet-don-hang/chi-tiet-don-hang.component";
import { CapNhatDonHangComponent } from "./cap-nhat-don-hang/cap-nhat-don-hang.component";
import { HangHoaComponent } from "./cap-nhat-don-hang/hang-hoa/hang-hoa.component";
import { TraCuuDonComponent } from "./tra-cuu-don/tra-cuu-don.component";

export const routes: Routes = [
  {
    path: "tao-don-hang",
    component: TaoDonHangComponent,
    canActivate: [CanActiveDashboard],
  },
  {
    path: "danh-sach-don-hang",
    component: QuanLyDonHangComponent,
    canActivate: [CanActiveDashboard],
  },
  {
    path: "chi-tiet/:idDonHang",
    component: ChiTietDonHangComponent,
    canActivate: [CanActiveDashboard],
  },
  {
    path: "cap-nhat/:idDonHang",
    component: CapNhatDonHangComponent,
    canActivate: [CanActiveDashboard],
  },
  {
    path: "tra-cuu",
    component: TraCuuDonComponent,
    canActivate: [CanActiveDashboard],
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
    TaoDonHangComponent,
    QuanLyDonHangComponent,
    DanhSanhDonHangComponent,
    ChiTietDonHangComponent,
    CapNhatDonHangComponent,
    HangHoaComponent,
    TraCuuDonComponent,
  ],
})
export class QuanLyDonHangModule {}
