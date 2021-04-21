import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { KhachHangService } from "src/app/services/khach-hang.service";
import { Shipper } from "../../../models/shipper.model";
import { ShipperService } from "../../../services/shipper.service";

@Component({
  selector: "app-tao-moi-shipper",
  templateUrl: "./tao-moi-shipper.component.html",
  styleUrls: ["./tao-moi-shipper.component.scss"],
})
export class TaoMoiShipperComponent implements OnInit {
  formShipper!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shipperService: ShipperService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formShipper = this.fb.group({
      hoTen: [
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
      trangThai: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
  }

  submitForm() {
    this.shipperService.taoMoiShipper(this.formShipper.value).subscribe(
      (res) => {
        this.msg.success("Tạo thành công!", { nzDuration: 2000 });
        // this.formShipper.reset();
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
