import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import DIADANH_Json from "src/assets/data.json";
import { DonHangService } from "../../../services/don-hang.service";
import { KhachHang } from "src/app/models/khach-hang.model";
import { KhachHangService } from "src/app/services/khach-hang.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-welcome",
  templateUrl: "./tao-don-hang.component.html",
  styleUrls: ["./tao-don-hang.component.scss"],
})
export class TaoDonHangComponent implements OnInit {
  fileAnhDinhKem!: File;
  imageURL!: string;
  formDonHang!: FormGroup;
  dsKhachHang!: KhachHang[];

  diaDanh: any[] = DIADANH_Json;
  diaDanhQuanHuyen: any[] = [];
  diaDanhPhuongXa: any[] = [];
  selectedIndex = 0;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private donHangService: DonHangService,
    private khachHangService: KhachHangService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.createForm();
    this.khachHangService.dsKhachHang$.subscribe(
      (res) => {
        this.dsKhachHang = res;
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
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(fileList[0]);
      this.fileAnhDinhKem = fileList[0];
    }
  }
  //Tính tiền Ship
  tinhTienShip(value: number) {
    let tienShip = 0;
    tienShip = (1.3 * value) / 100;
    if (tienShip > 15000) this.formDonHang.controls.phiShip.setValue(tienShip);
    else this.formDonHang.controls.phiShip.setValue(15000);
  }
  // Tạo form đơn hàng
  thoiGianDuKien = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  createForm() {
    this.formDonHang = this.fb.group({
      tenNguoiNhan: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdtNguoiNhan: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      diaChi: this.fb.group({
        tinhThanh: [""],
        quanHuyen: [""],
        phuongXa: [""],
        moTaChiTiet: [
          "",
          Validators.compose([
            Validators.required,
            Validators.maxLength(300),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
      }),
      khachHang: this.fb.group({
        tenKhachHang: [
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
            Validators.maxLength(300),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
      }),
      dsHangHoa: this.fb.array([this.newHH()]),
      nguoiTraPhiShip: [
        "Người nhận trả",
        Validators.compose([Validators.required]),
      ],
      phiShip: [15000, Validators.required],
      tongTienThuHo: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      ghiChu: ["", Validators.maxLength(300)],
      thoiGianDuKien: [new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)],
    });
  }

  lamMoiForm() {
    this.createForm();
    this.formDonHang.reset(this.formDonHang.value);
  }
  // Xử lý tạo đơn hàng
  submitForm() {
    const bodyData = new FormData();

    bodyData.append("infoDonHang", JSON.stringify(this.formDonHang.value));
    bodyData.append("fileAnhDinhKem", this.fileAnhDinhKem);

    this.donHangService.taoMoiDonHang(bodyData).subscribe(
      (res) => {
        this.modal.success({
          nzTitle: "Tạo thành công!",
          nzContent: "Đã thêm mới một Đơn hàng.",
        });
        this.khachHangService.loadDSKhachHang();
        this.donHangService.loadDSDonHang();
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

  // ----- Xử lý chọn địa chỉ giao hàng -----
  chonQuanHuyen(tenTinh: string): void {
    this.diaDanhQuanHuyen = this.diaDanh
      .filter((dd) => {
        if (dd.Name === tenTinh) return dd["Districts"];
      })
      .map((dd) => dd["Districts"]);
    this.formDonHang
      .get(["diaChi", "moTaChiTiet"])
      ?.setValue(
        this.formDonHang.get(["diaChi", "tinhThanh"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "quanHuyen"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "phuongXa"])?.value
      );
  }
  chonPhuongXa(tenQuan: string): void {
    this.diaDanhPhuongXa = this.diaDanhQuanHuyen[0]
      .filter((dd: any) => {
        if (dd.Name === tenQuan) return dd["Wards"];
      })
      .map((dd: any) => dd["Wards"]);
    this.formDonHang
      .get(["diaChi", "moTaChiTiet"])
      ?.setValue(
        this.formDonHang.get(["diaChi", "tinhThanh"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "quanHuyen"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "phuongXa"])?.value
      );
  }
  eventPhuongXa() {
    this.formDonHang
      .get(["diaChi", "moTaChiTiet"])
      ?.setValue(
        this.formDonHang.get(["diaChi", "tinhThanh"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "quanHuyen"])?.value +
          " - " +
          this.formDonHang.get(["diaChi", "phuongXa"])?.value
      );
  }

  // ----- Xử lý chọn khách hàng -----
  valueKH: any;
  chonKhachHang(value: string) {
    let tenKH = value.slice(0, value.indexOf("*"));
    let sdtKH = value.slice(tenKH.length + 1, value.indexOf("^"));
    let diaChiKH = value.slice(value.indexOf("^") + 1);
    this.formDonHang.get(["khachHang", "tenKhachHang"])?.setValue(tenKH);
    this.formDonHang.get(["khachHang", "sdt"])?.setValue(sdtKH);
    this.formDonHang.get(["khachHang", "diaChi"])?.setValue(diaChiKH);
  }

  // ----- Xử lý các hàng hoá -----
  get dsHH(): FormArray {
    return this.formDonHang.get("dsHangHoa") as FormArray;
  }
  newHH(): FormGroup {
    return this.fb.group({
      tenHang: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      giaTri: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      soLuong: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      khoiLuong: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      moTa: [
        "Mô tả món hàng...",
        Validators.compose([
          Validators.maxLength(300),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
    });
  }
  xoaHH(i: any) {
    this.dsHH.removeAt(i);
  }
  themHH(): void {
    this.dsHH.push(this.newHH());
    this.selectedIndex = this.dsHH.length;
  }
}
