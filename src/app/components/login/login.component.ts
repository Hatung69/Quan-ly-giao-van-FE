import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { TokenStorageService } from "src/app/services/token-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      remember: [false],
    });
  }

  submitForm(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.message
          .success("Đăng nhập thành công. Chuyển trang hệ thống...", {
            nzDuration: 500,
          })
          .onClose.subscribe(() => {
            this.reloadPage();
          });
      },
      (err) => {
        console.log(err);
        this.message.error("Lỗi đăng nhập, vui lòng kiểm tra lại !");
      }
    );
  }

  reloadPage(): void {
    this.router.navigateByUrl("/home").then(() => {
      window.location.reload();
    });
  }
}
