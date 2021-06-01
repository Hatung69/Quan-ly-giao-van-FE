import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThongKeComponent } from "./thong-ke.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgZorroModule } from "src/app/ng-zorro.module";
import { PipesCustomModule } from "src/app/pipes/pipe-custom.module";
import { CanActiveDashboard } from "src/app/guards/can-active-dashboard .guard";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxChartsModule } from "@swimlane/ngx-charts";

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
    NgxChartsModule,
  ],
  declarations: [ThongKeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ThongKeModule {}
