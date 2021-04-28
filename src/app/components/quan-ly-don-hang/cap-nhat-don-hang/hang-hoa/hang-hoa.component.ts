import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { HangHoaService } from "src/app/services/hang-hoa.service";

@Component({
  selector: "app-hang-hoa",
  templateUrl: "./hang-hoa.component.html",
  styleUrls: ["./hang-hoa.component.scss"],
})
export class HangHoaComponent implements OnInit {
  @Input() loadDataForm: any;
  isVisible = false;
  formHangHoa!: FormGroup;
  idHangHoa: any;

  constructor(
    private hangHoaService: HangHoaService,
    private msg: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formHangHoa = this.fb.group({
      tenHang: [null],
      giaTri: [null],
      soLuong: [null],
      khoiLuong: [null],
      moTa: [null],
    });
  }

  loadFormHangHoa(hangHoa: any) {
    this.formHangHoa = this.fb.group({
      tenHang: [
        hangHoa.tenHang,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      giaTri: [
        hangHoa.giaTri,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      soLuong: [
        hangHoa.soLuong,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      khoiLuong: [
        hangHoa.khoiLuong,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      moTa: [
        hangHoa.moTa,
        Validators.compose([
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
    });
  }

  // Gửi data
  submitForm() {
    console.log(this.formHangHoa.value);
    this.hangHoaService
      .capNhatHangHoa(this.idHangHoa, this.formHangHoa.value)
      .subscribe(
        (res) => {
          this.msg.success("Cập nhật thành công!", { nzDuration: 2000 });
          this.loadDataForm();
          this.isVisible = false;
        },
        (err) => {
          console.log("HTTP Error", err);
          this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
            nzDuration: 2000,
          });
        }
      );
  }

  showModal(idHH: any): void {
    this.idHangHoa = idHH;
    this.hangHoaService.layHangHoaTheoID(this.idHangHoa).subscribe(
      (res) => {
        this.loadFormHangHoa(res);
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
}
