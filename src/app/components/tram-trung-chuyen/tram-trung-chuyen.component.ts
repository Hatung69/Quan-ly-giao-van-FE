import { Component, OnInit, ViewChild } from "@angular/core";
import { TaoMoiTramComponent } from "./tao-moi-tram/tao-moi-tram.component";
import { TramTrungChuyen } from "../../models/tram-trung-chuyen.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzModalService } from "ng-zorro-antd/modal";
import { TramTrungChuyenService } from "src/app/services/tram-trung-chuyen.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-tram-trung-chuyen",
  templateUrl: "./tram-trung-chuyen.component.html",
  styleUrls: ["./tram-trung-chuyen.component.scss"],
})
export class TramTrungChuyenComponent implements OnInit {
  @ViewChild(TaoMoiTramComponent) taoMoi!: TaoMoiTramComponent;
  isVisible = false;
  searchText!: string;
  dsTram: TramTrungChuyen[] = [];
  formTram!: FormGroup;
  idTramTT!: string;
  tongTram: number = 0;
  constructor(
    private fb: FormBuilder,
    private tramTrungChuyenService: TramTrungChuyenService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.tramTrungChuyenService.dsTram$.subscribe((data) => {
      this.dsTram = data;
      this.tongTram = this.dsTram.length;
    });

    this.formTram = this.fb.group({
      tenTram: [null],
      diaChi: [null],
      trangThai: [null],
      moTa: [null],
    });
  }

  // Xoá nhân viên
  deleteRow(id: string): void {
    this.tramTrungChuyenService.xoaTramTheoID(id).subscribe(
      (res) => {
        this.msg.success("Xoá thành thành công!", { nzDuration: 2000 });
        this.tramTrungChuyenService.loadDSTram();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }

  // ---- Sừa thông tin Trạm trung chuyển ----
  showModal(idTram: string): void {
    this.idTramTT = idTram;
    this.tramTrungChuyenService.layTramTheoID(idTram).subscribe(
      (res) => {
        console.log(res);
        this.loadThognTinTram(res);
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
    this.isVisible = true;
  }

  handleOk(): void {
    this.submitForm();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loadThognTinTram(tram: TramTrungChuyen) {
    this.formTram = this.fb.group({
      tenTram: [
        tram.tenTram,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      diaChi: [
        tram.diaChi,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      trangThai: [tram.trangThai, Validators.compose([Validators.required])],
      moTa: [
        tram.moTa,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
    });
  }

  submitForm() {
    this.tramTrungChuyenService
      .capNhatTram(this.idTramTT, this.formTram.value)
      .subscribe(
        (res) => {
          this.msg.success("Cập nhật thành thành công!", { nzDuration: 2000 });
          this.tramTrungChuyenService.loadDSTram();
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
