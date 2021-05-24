import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuanLyKhachHangComponent } from "./quan-ly-khach-hang.component";
import { RouterModule, Routes } from "@angular/router";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { DanhSachKhachHangComponent } from "./danh-sach-khach-hang/danh-sach-khach-hang.component";
import { PipesCustomModule } from "../../pipes/pipe-custom.module";
import { TaoMoiKhachHangComponent } from "./tao-moi-khach-hang/tao-moi-khach-hang.component";
import { CapNhatKhachHangComponent } from "./cap-nhat-khach-hang/cap-nhat-khach-hang.component";
import { ChiTietKhachHangComponent } from "./chi-tiet-khach-hang/chi-tiet-khach-hang.component";

export const routes: Routes = [
  {
    path: "",
    canActivate: [CanActiveDashboard],
    component: QuanLyKhachHangComponent,
  },
  {
    path: "tao-moi",
    component: TaoMoiKhachHangComponent,
  },
  {
    path: "cap-nhat/:idNhanVien",
    component: CapNhatKhachHangComponent,
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
    QuanLyKhachHangComponent,
    DanhSachKhachHangComponent,
    TaoMoiKhachHangComponent,
    CapNhatKhachHangComponent,
    ChiTietKhachHangComponent,
  ],
})
export class QuanLyKhachHangModule {}
