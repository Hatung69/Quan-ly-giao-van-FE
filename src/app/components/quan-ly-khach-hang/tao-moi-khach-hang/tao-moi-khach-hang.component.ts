import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { KhachHangService } from "../../../services/khach-hang.service";
import { NzModalService } from "ng-zorro-antd/modal";

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
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formKhachHang = this.fb.group({
      tenKhachHang: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
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
        this.modal.success({
          nzTitle: "Tạo thành công!",
          nzContent: "Đã thêm mới một Khách hàng.",
        });
      },
      (err) => {
        console.log("HTTP Error", err);
        this.modal.error({
          nzTitle: "Xảy ra lỗi!",
          nzContent: "Vui lòng kiểm tra lại...",
        });
      }
    );
  }

  lamMoiForm() {
    this.createForm();
    this.formKhachHang.reset(this.formKhachHang.value);
  }
}
