import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaoDonHangComponent } from "./tao-don-hang/tao-don-hang.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";

export const routes: Routes = [{ path: "", component: TaoDonHangComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroModule,
    ReactiveFormsModule,
    FormsModule,
    PipesCustomModule,
  ],
  declarations: [TaoDonHangComponent],
})
export class QuanLyDonHangModule {}
