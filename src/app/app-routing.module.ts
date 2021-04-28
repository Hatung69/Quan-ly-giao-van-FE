import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CanActiveDashboard } from "./guards/can-active-dashboard .guard";
import { Page404NotFound } from "./components/page-404.component";

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [CanActiveDashboard] },
  {
    path: "login",
    loadChildren: () =>
      import("./components/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "don-hang",
    loadChildren: () =>
      import("./components/quan-ly-don-hang/quan-ly-don-hang.module").then(
        (m) => m.QuanLyDonHangModule
      ),
  },
  {
    path: "quan-ly-shipper",
    loadChildren: () =>
      import("./components/quan-ly-shipper/quan-ly-shipper.module").then(
        (m) => m.QuanLyShipperModule
      ),
  },
  {
    path: "quan-ly-khach-hang",
    loadChildren: () =>
      import("./components/quan-ly-khach-hang/quan-ly-khach-hang.module").then(
        (m) => m.QuanLyKhachHangModule
      ),
  },
  {
    path: "quan-ly-nhan-vien",
    loadChildren: () =>
      import("./components/quan-ly-nhan-vien/quan-ly-nhan-vien.module").then(
        (m) => m.QuanLyNhanVienModule
      ),
  },
  {
    path: "tram-trung-chuyen",
    loadChildren: () =>
      import("./components/tram-trung-chuyen/tram-trung-chuyen.module").then(
        (m) => m.TramTrungChuyenModule
      ),
  },
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "**", component: Page404NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
