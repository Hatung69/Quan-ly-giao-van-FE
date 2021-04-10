import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { Routes, RouterModule } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzMessageModule } from "ng-zorro-antd/message";
import { CanLoginGuard } from "../../guards/can-login.guard";

export const routes: Routes = [
  { path: "", component: LoginComponent, canActivate: [CanLoginGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzToolTipModule,
    NzMessageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
