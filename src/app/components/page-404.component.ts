import { Component } from "@angular/core";

@Component({
  selector: "nz-demo-result-fof",
  template: `
    <nz-result
      nzStatus="404"
      nzTitle="404"
      nzSubTitle="Xin lỗi, Trang không tồn tại !!!"
    >
      <div nz-result-extra>
        <a
          style="background-color: #FF0062; padding: 10px; color: white"
          routerLink="/home"
          >Về trang chủ</a
        >
      </div>
    </nz-result>
  `,
})
export class Page404NotFound {}
