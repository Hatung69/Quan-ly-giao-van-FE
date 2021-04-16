import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { TaoNhanVienComponent } from "./tao-nhan-vien/tao-nhan-vien.component";
import { CanActiveDashboard } from "../../guards/can-active-dashboard .guard";

import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ChiTietNhanVienComponent } from "./chi-tiet-nhan-vien/chi-tiet-nhan-vien.component";
import { CapNhatNhanVienComponent } from "./cap-nhat-nhan-vien/cap-nhat-nhan-vien.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "../../pipes/pipe-custom.module";

export const routes: Routes = [
  {
    path: "",
    canActivate: [CanActiveDashboard],
    component: DanhSachNhanVienComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    NgZorroModule,
    PipesCustomModule,
  ],
  declarations: [
    DanhSachNhanVienComponent,
    TaoNhanVienComponent,
    ChiTietNhanVienComponent,
    CapNhatNhanVienComponent,
  ],
})
export class QuanLyNhanVienModule {}
