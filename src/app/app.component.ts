import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";
import { NhanVienService } from "./services/nhan-vien.service";
import { AuthService } from "./services/auth.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string = "";
  isVisible = false;
  nhanVien: any;
  base64Data: any;
  retrievedAvatar: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private nhanVienService: NhanVienService,
    private auth: AuthService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.username = user.username;
    }

    this.nhanVienService
      .layNhanVienTheoTKid(this.tokenStorageService.getUser().id)
      .subscribe(
        (res) => {
          this.nhanVien = res;
          this.base64Data = this.nhanVien.avatar;
          this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
        },
        (err) => {
          console.log("Lỗi,", err);
        }
      );

    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // Thay đổi mật khẩu
  validateForm!: FormGroup;
  handleCancel(): void {
    this.isVisible = false;
  }

  isVisibleFormHH = false;

  handleCancelForm(): void {
    this.isVisibleFormHH = false;
  }

  showModal(): void {
    this.isVisibleFormHH = true;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleChangPass() {
    console.log(this.nhanVien.taiKhoan.username);
    console.log(this.validateForm.get("password")?.value);
    this.auth
      .thayDoiMatKhau(
        this.nhanVien.taiKhoan.username,
        this.validateForm.get("password")?.value
      )
      .subscribe(
        (res) => {
          this.modal.success({
            nzTitle: "Thay đổi mật khẩu thành công!",
            nzContent: `Đã hoàn tất thay đổi mật khẩu`,
          });
          this.isVisibleFormHH = false;
        },
        (err) => {
          console.log("Lỗi", err);
          this.modal.error({
            nzTitle: "Xảy ra lỗi!",
            nzContent: `Vui lòng kiểm tra lại...`,
          });
        }
      );
  }
}
