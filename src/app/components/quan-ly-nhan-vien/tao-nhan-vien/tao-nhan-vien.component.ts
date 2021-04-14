import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NhanVienService } from "../../../services/nhan-vien.service";

@Component({
  selector: "app-tao-nhan-vien",
  templateUrl: "./tao-nhan-vien.component.html",
  styleUrls: ["./tao-nhan-vien.component.scss"],
})
export class TaoNhanVienComponent implements OnInit {
  formNhanVien!: FormGroup;
  avatarFile!: File;
  imageURL!: string;
  visible = false;

  constructor(
    private msg: NzMessageService,
    private fb: FormBuilder,
    private nhanVienService: NhanVienService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  // Xử lý file Avatar
  public handleFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(fileList[0]);
      this.avatarFile = fileList[0];
    }
  }

  createForm() {
    this.formNhanVien = this.fb.group({
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
      gioiTinh: ["Không rõ", Validators.compose([Validators.required])],
      ngaySinh: [null, Validators.compose([Validators.required])],
      diaChi: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      trangThai: [null, Validators.compose([Validators.required])],
      taiKhoan: this.fb.group({
        username: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^\S*$/),
          ]),
        ],
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.pattern(/^\S*$/),
          ]),
        ],
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      }),
    });
  }

  // Gửi data
  submitForm() {
    const bodyData = new FormData();

    bodyData.append("infoNhanVien", JSON.stringify(this.formNhanVien.value));
    bodyData.append("avatarFile", this.avatarFile);

    this.nhanVienService.taoMoiNhanVien(bodyData).subscribe(
      (res) => {
        this.msg.success("Tạo thành công!", { nzDuration: 2000 });
        this.nhanVienService.loadDSNhanVien();
        this.formNhanVien.reset();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }

  // Mở đóng cái Drawer
  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
}
