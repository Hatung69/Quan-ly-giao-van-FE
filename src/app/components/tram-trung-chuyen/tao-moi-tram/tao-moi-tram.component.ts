import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { TramTrungChuyenService } from "../../../services/tram-trung-chuyen.service";

@Component({
  selector: "app-tao-moi-tram",
  templateUrl: "./tao-moi-tram.component.html",
  styleUrls: ["./tao-moi-tram.component.scss"],
})
export class TaoMoiTramComponent implements OnInit {
  formTram!: FormGroup;
  isVisible = false;
  constructor(
    private fb: FormBuilder,
    private tramTrungChuyenService: TramTrungChuyenService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.formTram = this.fb.group({
      tenTram: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      diaChi: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      trangThai: ["Dang_hoat_dong", Validators.compose([Validators.required])],
      moTa: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
    });
  }

  submitForm() {
    this.tramTrungChuyenService.taoMoiTram(this.formTram.value).subscribe(
      (res) => {
        this.modal.success({
          nzTitle: "Tạo thành công!",
          nzContent: "Đã thêm mới một Trạm trung chuyển.",
        });
        this.tramTrungChuyenService.loadDSTram();
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
}
