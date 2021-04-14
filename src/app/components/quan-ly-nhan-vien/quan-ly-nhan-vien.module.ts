import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { DanhSachNhanVienComponent } from "./danh-sach-nhan-vien/danh-sach-nhan-vien.component";
import { TaoNhanVienComponent } from "./tao-nhan-vien/tao-nhan-vien.component";
import { CanActiveDashboard } from "../../guards/can-active-dashboard .guard";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ChiTietNhanVienComponent } from "./chi-tiet-nhan-vien/chi-tiet-nhan-vien.component";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { CapNhatNhanVienComponent } from "./cap-nhat-nhan-vien/cap-nhat-nhan-vien.component";
import { FormatDistancePipe } from "../../pipes/format-distance.pipe";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/quan-ly-nhan-vien/danh-sach" },
  {
    path: "danh-sach",
    canActivate: [CanActiveDashboard],
    component: DanhSachNhanVienComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzPopconfirmModule,
    NzTagModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzUploadModule,
    NzRadioModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NzMessageModule,
    NzImageModule,
    NzBadgeModule,
    NzModalModule,
    NzDescriptionsModule,
  ],
  declarations: [
    DanhSachNhanVienComponent,
    TaoNhanVienComponent,
    ChiTietNhanVienComponent,
    CapNhatNhanVienComponent,
    FormatDistancePipe,
  ],
  exports: [
    DanhSachNhanVienComponent,
    TaoNhanVienComponent,
    ChiTietNhanVienComponent,
    CapNhatNhanVienComponent,
    FormatDistancePipe,
  ],
})
export class QuanLyNhanVienModule {}
