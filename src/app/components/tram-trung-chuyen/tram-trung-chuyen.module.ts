import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TramTrungChuyenComponent } from "./tram-trung-chuyen.component";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";
import { TaoMoiTramComponent } from "./tao-moi-tram/tao-moi-tram.component";

export const routes: Routes = [
  {
    path: "",
    canActivate: [CanActiveDashboard],
    component: TramTrungChuyenComponent,
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
  declarations: [TramTrungChuyenComponent, TaoMoiTramComponent],
})
export class TramTrungChuyenModule {}
