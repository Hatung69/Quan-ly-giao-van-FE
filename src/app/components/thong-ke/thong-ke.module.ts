import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThongKeComponent } from "./thong-ke.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { GoogleChartsModule } from "angular-google-charts";

export const routes: Routes = [
  {
    path: "",
    canActivate: [CanActiveDashboard],
    component: ThongKeComponent,
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
    GoogleChartsModule,
  ],
  declarations: [ThongKeComponent],
})
export class ThongKeModule {}
