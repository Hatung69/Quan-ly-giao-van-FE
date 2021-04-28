import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { KhachHangService } from "src/app/services/khach-hang.service";
import { DonHangService } from "../../../services/don-hang.service";
import DIADANH_Json from "src/assets/data.json";
import { HangHoaService } from "../../../services/hang-hoa.service";
import { HangHoaComponent } from "./hang-hoa/hang-hoa.component";

@Component({
  selector: "app-cap-nhat-don-hang",
  templateUrl: "./cap-nhat-don-hang.component.html",
  styleUrls: ["./cap-nhat-don-hang.component.scss"],
})
export class CapNhatDonHangComponent implements OnInit {
  @ViewChild(HangHoaComponent) hhComponent!: HangHoaComponent;
  fileAnhDinhKem!: File;
  base64Data: any;
  retrievedAvatar: any;
  donHang: any;
  formDonHang!: FormGroup;
  formHangHoa!: FormGroup;
  idDonHang: any;

  diaDanh: any[] = DIADANH_Json;
  diaDanhQuanHuyen: any[] = [];
  diaDanhPhuongXa: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private donHangService: DonHangService,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private khachHangService: KhachHangService,
    private hangHoaService: HangHoaService
  ) {}

  ngOnInit() {
    this.nullForm();
    this.loadFormHangHoa();
    this.loadDataForm();
  }

  // Load cái dữ liệu cho form
  loadDataForm = () => {
    this.idDonHang = this.route.snapshot.paramMap.get("idDonHang");
    this.donHangService.layDonHangTheoID(this.idDonHang).subscribe(
      (res) => {
        this.donHang = res;
        console.log(this.donHang);
        this.createForm(this.donHang);
        this.base64Data = this.donHang.anhDinhKem;
        this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );
  };
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
      this.fileAnhDinhKem = fileList[0];
    }
  }
  //Tính tiền Ship
  tinhTienShip(value: number) {
    let tienShip = 0;
    tienShip = (1 * value) / 100;
    if (tienShip > 15000) this.formDonHang.controls.phiShip.setValue(tienShip);
    else this.formDonHang.controls.phiShip.setValue(15000);
  }

  //Tạo form rỗng
  nullForm() {
    this.formDonHang = this.fb.group({
      tenNguoiNhan: [null],
      sdtNguoiNhan: [null],
      diaChi: this.fb.group({
        tinhThanh: [null],
        quanHuyen: [null],
        phuongXa: [null],
        moTaChiTiet: [null],
      }),
      khachHang: this.fb.group({
        tenKhachHang: [null],
        sdt: [null],
        diaChi: [null],
      }),
      nguoiTraPhiShip: ["Người nhận trả"],
      phiShip: [50000, Validators.required],
      tongTienThuHo: [null],
      trangThai: [null],
      ghiChu: [null],
      thoiGianDuKien: [new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)],
    });
  }
  // Tạo form đơn hàng
  createForm(donHang: any) {
    this.formDonHang = this.fb.group({
      tenNguoiNhan: [
        donHang.tenNguoiNhan,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      sdtNguoiNhan: [
        donHang.sdtNguoiNhan,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[0-9]*$/),
        ]),
      ],
      diaChi: this.fb.group({
        tinhThanh: [donHang.diaChi.tinhThanh],
        quanHuyen: [donHang.diaChi.quanHuyen],
        phuongXa: [donHang.diaChi.phuongXa],
        moTaChiTiet: [
          donHang.diaChi.moTaChiTiet,
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
      }),
      khachHang: this.fb.group({
        tenKhachHang: [
          donHang.khachHang.tenKhachHang,
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        sdt: [
          donHang.khachHang.sdt,
          Validators.compose([
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern(/^[0-9]*$/),
          ]),
        ],
        diaChi: [
          donHang.khachHang.diaChi,
          Validators.compose([
            Validators.required,
            Validators.maxLength(300),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
      }),
      nguoiTraPhiShip: [
        donHang.nguoiTraPhiShip,
        Validators.compose([Validators.required]),
      ],
      phiShip: [donHang.phiShip, Validators.required],
      tongTienThuHo: [
        donHang.tongTienThuHo,
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/^[]?\d+$/),
        ]),
      ],
      trangThai: [donHang.trangThai],
      ghiChu: [donHang.ghiChu, Validators.maxLength(300)],
      thoiGianDuKien: [donHang.thoiGianDuKien],
    });
  }
  // Xử lý tạo đơn hàng ---------
  submitForm() {
    const bodyData = new FormData();
    bodyData.append("infoDonHang", JSON.stringify(this.formDonHang.value));
    if (this.fileAnhDinhKem) {
      bodyData.append("fileAnhDinhKem", this.fileAnhDinhKem);
    }

    this.donHangService.capNhatDonHang(this.idDonHang, bodyData).subscribe(
      (res) => {
        this.msg.success("Cập nhật thành công!", { nzDuration: 2000 });
        this.khachHangService.loadDSKhachHang();
        this.donHangService.loadDSDonHang();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
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
  }
  chonPhuongXa(tenQuan: string): void {
    this.diaDanhPhuongXa = this.diaDanhQuanHuyen[0]
      .filter((dd: any) => {
        if (dd.Name === tenQuan) return dd["Wards"];
      })
      .map((dd: any) => dd["Wards"]);
  }

  // ---------- Xử lý hàng hoá ------------------
  loadFormHangHoa() {
    this.formHangHoa = this.fb.group({
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
  xoaHangHoa(idHH: any) {
    this.hangHoaService.xoaHangHoa(idHH).subscribe(
      (res) => {
        this.msg.success("Xoá thành thành công!", { nzDuration: 2000 });
        this.loadDataForm();
        this.donHangService.loadDSDonHang();
      },
      (err) => {
        console.log("HTTP Error", err);
        this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
          nzDuration: 2000,
        });
      }
    );
  }

  isVisibleFormHH = false;

  showModal(): void {
    this.isVisibleFormHH = true;
  }

  handleOk(): void {
    this.hangHoaService
      .taoMoiHangHoa(this.donHang.id, this.formHangHoa.value)
      .subscribe(
        (res) => {
          this.loadDataForm();
          this.donHangService.loadDSDonHang();
          this.formHangHoa.reset();
          this.msg.success("Tạo thành công!", { nzDuration: 2000 });
        },
        (err) => {
          console.log("HTTP Error", err);
          this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
            nzDuration: 2000,
          });
        }
      );
    this.isVisibleFormHH = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisibleFormHH = false;
  }
}
