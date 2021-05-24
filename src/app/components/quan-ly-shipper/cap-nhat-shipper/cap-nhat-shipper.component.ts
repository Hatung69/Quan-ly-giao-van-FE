import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { ShipperService } from "../../../services/shipper.service";
import { Shipper } from "../../../models/shipper.model";

@Component({
  selector: "app-cap-nhat-shipper",
  templateUrl: "./cap-nhat-shipper.component.html",
  styleUrls: ["./cap-nhat-shipper.component.scss"],
})
export class CapNhatShipperComponent implements OnInit {
  formShipper!: FormGroup;
  idShipper: any;
  shipper!: Shipper;

  constructor(
    private route: ActivatedRoute,
    private shipperService: ShipperService,
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.idShipper = this.route.snapshot.paramMap.get("idShipper");
    this.shipperService.layShipperTheoID(this.idShipper).subscribe(
      (res) => {
        console.log(res);
        this.createForm(res);
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  createForm(shipper: Shipper) {
    this.formShipper = this.fb.group({
      hoTen: [
        shipper.hoTen,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdt: [
        shipper.sdt,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      diaChi: [
        shipper.diaChi,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      email: [
        shipper.email,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern(/^\S*$/),
        ]),
      ],
      cmnd: [
        shipper.cmnd,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      trangThai: [
        shipper.trangThai,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
    });
  }

  submitForm() {
    this.shipperService
      .capNhatShipper(this.idShipper, this.formShipper.value)
      .subscribe(
        (res) => {
          this.msg.success("Cập nhật thành công!", { nzDuration: 2000 });
          this.shipperService.loadDSShipper();
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
