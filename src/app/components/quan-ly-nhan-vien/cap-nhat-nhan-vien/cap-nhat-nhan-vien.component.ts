import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { TramTrungChuyen } from "src/app/models/tram-trung-chuyen.model";
import { NhanVienService } from "src/app/services/nhan-vien.service";
import { TramTrungChuyenService } from "src/app/services/tram-trung-chuyen.service";
import { NhanVien } from "../../../models/nhan-vien.models";

@Component({
  selector: "app-chinh-sua-nhan-vien",
  templateUrl: "./cap-nhat-nhan-vien.component.html",
  styleUrls: ["./cap-nhat-nhan-vien.component.scss"],
})
export class CapNhatNhanVienComponent implements OnInit {
  visible = false;
  formNhanVien!: FormGroup;
  dsTram!: TramTrungChuyen[];
  nhanVien: any;
  idNhanvien!: string;
  avatarFile!: File;
  base64Data: any;
  retrievedAvatar: any;

  constructor(
    private msg: NzMessageService,
    private fb: FormBuilder,
    private nhanVienService: NhanVienService,
    private tramService: TramTrungChuyenService
  ) {}

  ngOnInit() {
    this.formNhanVien = this.fb.group({
      id: [null],
      hoTen: [null],
      sdt: [null],
      gioiTinh: ["Không rõ"],
      ngaySinh: [null],
      diaChi: [null],
      trangThai: [null],
      quyenHan: [null],
    });

    this.tramService.dsTram$.subscribe(
      (res) => {
        this.dsTram = res;
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  // Xử lý file Avatar
  public handleFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.retrievedAvatar = event.target.result;
      };
      reader.readAsDataURL(fileList[0]);
      this.avatarFile = fileList[0];
    }
  }

  createForm(nhanVienData: any) {
    this.formNhanVien = this.fb.group({
      id: [nhanVienData.id],
      hoTen: [
        nhanVienData.hoTen,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdt: [
        nhanVienData.sdt,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      gioiTinh: [
        nhanVienData.gioiTinh,
        Validators.compose([Validators.required]),
      ],
      ngaySinh: [
        nhanVienData.ngaySinh,
        Validators.compose([Validators.required]),
      ],
      diaChi: [
        nhanVienData.diaChi,
        Validators.compose([
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      trangThai: [
        nhanVienData.trangThai,
        Validators.compose([Validators.required]),
      ],
      quyenHan: [
        nhanVienData.taiKhoan.quyenHan.length > 1
          ? "ROLE_ADMIN"
          : "ROLE_EMPLOYEE",
        Validators.compose([Validators.required]),
      ],
    });
  }

  // Gửi data
  submitForm() {
    const bodyData = new FormData();
    bodyData.append("infoNhanVien", JSON.stringify(this.formNhanVien.value));
    if (this.avatarFile) {
      bodyData.append("avatarFile", this.avatarFile);
    }

    this.nhanVienService.capNhatNhanVien(this.idNhanvien, bodyData).subscribe(
      (res) => {
        this.msg.success("Cập nhật thành công!", { nzDuration: 2000 });
        this.close();
        this.nhanVienService.loadDSNhanVien();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }

  open(_idNhanVien: string): void {
    this.idNhanvien = _idNhanVien;
    this.nhanVienService.layNhanVienTheoID(this.idNhanvien).subscribe(
      (res) => {
        this.nhanVien = res;
        console.log(res);
        this.createForm(this.nhanVien);
        this.base64Data = this.nhanVien.avatar;
        this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
