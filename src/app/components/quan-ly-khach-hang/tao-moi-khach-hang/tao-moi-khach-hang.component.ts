import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { KhachHangService } from "../../../services/khach-hang.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-tao-moi-khach-hang",
  templateUrl: "./tao-moi-khach-hang.component.html",
  styleUrls: ["./tao-moi-khach-hang.component.scss"],
})
export class TaoMoiKhachHangComponent implements OnInit {
  formKhachHang!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private khachHangService: KhachHangService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formKhachHang = this.fb.group({
      tenKhach: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      tenCuaHang: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdt: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      diaChi: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern(/^\S*$/),
        ]),
      ],
      cmnd: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      loaiKhachHang: [
        "Cá nhân",
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      soTaiKhoan: [
        "",
        Validators.compose([
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
    });
  }

  submitForm() {
    this.khachHangService.taoMoiKhachHang(this.formKhachHang.value).subscribe(
      (res) => {
        this.msg.success("Tạo thành công!", { nzDuration: 2000 });
        // this.formKhachHang.reset();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }
}
