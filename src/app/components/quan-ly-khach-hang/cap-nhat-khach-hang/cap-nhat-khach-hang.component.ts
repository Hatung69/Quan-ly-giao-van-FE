import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { KhachHang } from "../../../models/khach-hang.model";
import { KhachHangService } from "../../../services/khach-hang.service";

@Component({
  selector: "app-cap-nhat-khach-hang",
  templateUrl: "./cap-nhat-khach-hang.component.html",
  styleUrls: ["./cap-nhat-khach-hang.component.scss"],
})
export class CapNhatKhachHangComponent implements OnInit {
  formKhachHang!: FormGroup;
  idKhachHang: any;
  khachHang!: KhachHang;

  constructor(
    private route: ActivatedRoute,
    private khachHangService: KhachHangService,
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.idKhachHang = this.route.snapshot.paramMap.get("idNhanVien");
    this.khachHangService.layKhachHangTheoID(this.idKhachHang).subscribe(
      (res) => {
        console.log(res);
        this.createForm(res);
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  createForm(khachHang: KhachHang) {
    this.formKhachHang = this.fb.group({
      tenKhachHang: [
        khachHang.tenKhachHang,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdt: [
        khachHang.sdt,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      diaChi: [
        khachHang.diaChi,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      email: [
        khachHang.email,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern(/^\S*$/),
        ]),
      ],
      cmnd: [
        khachHang.cmnd,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      loaiKhachHang: [
        khachHang.loaiKhachHang,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      soTaiKhoan: [
        khachHang.soTaiKhoan,
        Validators.compose([
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
    });
  }

  submitForm() {
    this.khachHangService
      .capNhatKhachHang(this.idKhachHang, this.formKhachHang.value)
      .subscribe(
        (res) => {
          this.msg.success("Cập nhật thành công!", { nzDuration: 2000 });
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
