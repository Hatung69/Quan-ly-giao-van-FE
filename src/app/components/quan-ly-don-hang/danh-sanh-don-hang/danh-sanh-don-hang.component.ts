import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DonHangService } from "src/app/services/don-hang.service";
import { ChiTietDonHangComponent } from "../chi-tiet-don-hang/chi-tiet-don-hang.component";
import { TokenStorageService } from "../../../services/token-storage.service";
import { NhanVienService } from "../../../services/nhan-vien.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { Shipper } from "../../../models/shipper.model";
import { ShipperService } from "../../../services/shipper.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-danh-sanh-don-hang",
  templateUrl: "./danh-sanh-don-hang.component.html",
  styleUrls: ["./danh-sanh-don-hang.component.scss"],
})
export class DanhSanhDonHangComponent implements OnInit {
  idDonHang!: string;
  tramID!: string;
  tenTramTTC: string = "";
  @ViewChild(ChiTietDonHangComponent) chiTietDH!: ChiTietDonHangComponent;
  @Input() dsDonHang: any[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private nhanVienService: NhanVienService,
    private shipperSevice: ShipperService,
    private donHangService: DonHangService,
    private modal: NzModalService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.nhanVienService
      .layNhanVienTheoIDAcc(this.tokenService.getUser().id)
      .subscribe((tramHienTai: any) => {
        this.tramID = tramHienTai.id;
        this.tenTramTTC = tramHienTai.tenTram;
      });
    this.shipperSevice.dsShipper$.subscribe(
      (res) => {
        this.dsShipper = res?.filter(
          (data) =>
            data.trangThai !== "Bi_khoa" && data.trangThai !== "Tam_nghi"
        );
      },
      (err) => {
        console.log("HTTP Error", err);
      }
    );
  }

  // Xử lý tiếp nhận đơn hàng
  isVisibleTiepNhan = false;
  showModalTiepNhanDon(idDH: string): void {
    this.idDonHang = idDH;
    this.isVisibleTiepNhan = true;
  }

  handleOkTiepNhanDon(): void {
    this.donHangService.themTram(this.idDonHang, this.tramID).subscribe(
      (res) => {
        this.modal.success({
          nzTitle: "Tiếp nhận thành công đơn hàng!",
          nzContent: "Đã tiếp nhận thành công đơn hàng ở Trạm hiện tại.",
        });
      },
      (err) => {
        console.log("Lỗi", err); //400 thì báo đã tồn tại
        if (err.status === 400) {
          this.modal.warning({
            nzTitle: "Đã thực hiện tiếp nhận đơn hàng trước đó!",
            nzContent: `Đơn hàng đã đã được tiếp nhận`,
          });
        }
      }
    );
    this.isVisibleTiepNhan = false;
  }

  handleCancelTiepNhanDon(): void {
    this.isVisibleTiepNhan = false;
  }

  // Xử lý điều phối đơn hàng
  isVisibleDieuPhoi = false;
  valueShipper!: Shipper;
  dsShipper!: Shipper[];
  showModalDieuPhoi(idDH: string): void {
    this.idDonHang = idDH;
    this.isVisibleDieuPhoi = true;
  }

  handleOkDieuPhoi(): void {
    if (this.valueShipper) {
      if (this.idDonHang === "Dieu_phoi_nhieu_don") this.dieuPhoiNhieuDonHang();
      else {
        this.donHangService
          .dieuPhoi(this.idDonHang, this.valueShipper.id)
          .subscribe(
            (res) => {
              this.donHangService.loadDSDonHang();
              this.shipperSevice.loadDSShipper();
              this.modal.success({
                nzTitle: "Điều phối thành công!",
                nzContent: `Đã điều phối đơn hàng cho Shipper.`,
              });
            },
            (err) => {
              console.log("Lỗi", err); //400 thì báo đã tồn tại
              if (err.status === 400) {
                this.modal.warning({
                  nzTitle: "Đã điều phối cho Shipper trước đó!",
                  nzContent: `Đơn hàng đã được giao cho Shipper.`,
                });
              }
            }
          );
      }
    }
    this.isVisibleDieuPhoi = false;
  }

  handleCancelDieuPhoi(): void {
    this.isVisibleDieuPhoi = false;
  }

  // --- Xoá đơn hàng -----
  showXoaDonHang(idDonHang: string): void {
    this.modal.confirm({
      nzTitle: "Xoá đơn hàng!",
      nzContent: '<b style="color: red;">Xoá nhận việc xoá đơn hàng này.</b>',
      nzOkText: "Xác nhận",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () =>
        this.donHangService.xoaDonHang(idDonHang).subscribe(
          (res) => {
            this.msg.success("Xoá thành công!", { nzDuration: 2000 });
            this.donHangService.loadDSDonHang();
          },
          (err) => {
            console.log("HTTP Error", err);
            this.msg.error("Xảy ra lỗi.Vui lòng kiểm tra lại!", {
              nzDuration: 2000,
            });
          }
        ),
      nzCancelText: "Huỷ",
    });
  }
  // --- Xác nhận nhiều đơn hàng -----
  showXacNhanDonHang(): void {
    this.modal.confirm({
      nzTitle: "Xác nhận đơn hàng!",
      nzContent:
        '<b style="color: red;">Xác nhận các đơn hàng được chọn</b> </br> <small>Chỉ xác nhận những đơn đang Chờ xác nhận<small/>',
      nzOkText: "Xác nhận",
      nzOkType: "primary",
      nzOkDanger: false,
      nzOnOk: () => this.xacNhanNhieuDon(),
      nzCancelText: "Huỷ",
    });
  }
  // --- Xoá tất cả đơn hàng -----
  showXoaTatCaDonHang(): void {
    this.modal.confirm({
      nzTitle: "Xoá các đơn hàng!",
      nzContent:
        '<b style="color: red;">Xác nhận việc xoá đơn hàng được chọn</b>',
      nzOkText: "Xác nhận",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.xoaNhieuDonHang(),
      nzCancelText: "Huỷ",
    });
  }
  // --- Tiếp nhận nhiều đơn hàng -----
  showTiepNhanNhieuDon(): void {
    this.modal.confirm({
      nzTitle: "Tiếp nhận các đơn hàng!",
      nzContent:
        '<br style="color: red;"> <b>Tiếp nhận các đơn hàng tại</b> ' +
        this.tenTramTTC +
        "</br> <small>Không tiếp nhận các đơn hàng đang Chờ xác nhận</small>",
      nzOkText: "Xác nhận",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.tiepNhanNhieuDonHang(),
      nzCancelText: "Huỷ",
    });
  }

  // ---- Check nhiều item
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<any> = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<any>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  // Tiep nhận nhiều đơn
  tiepNhanNhieuDonHang(): void {
    const requestData = this.dsDonHang.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    this.donHangService
      .themTramChoDSDonHang(requestData, this.tramID)
      .subscribe(
        (res) => {
          this.modal.success({
            nzTitle: "Tiếp nhận thành công các đơn hàng!",
            nzContent: `Đã tiếp nhận thành công các đơn hàng.`,
          });
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

  // Điều phối nhiều đơn
  dieuPhoiNhieuDonHang(): void {
    const requestData = this.dsDonHang.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    this.donHangService
      .dieuPhoiDsDon(requestData, this.valueShipper.id)
      .subscribe(
        (res) => {
          this.donHangService.loadDSDonHang();
          this.shipperSevice.loadDSShipper();
          this.modal.success({
            nzTitle: "Điều phối thành công các đơn hàng!",
            nzContent: `Đã điều phối thành công các đơn hàng cho Shipper.`,
          });
          this.setOfCheckedId.clear();
        },
        (err) => {
          console.log("Lỗi", err);
          this.modal.error({
            nzTitle: "Xảy ra lỗi!",
            nzContent: `Vui lòng kiểm tra lại...`,
          });
          this.setOfCheckedId.clear();
        }
      );
  }
  // Xác nhận nhiều đơn
  xacNhanNhieuDon(): void {
    const requestData = this.dsDonHang.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    this.donHangService.xacNhanNhieuDonHang(requestData).subscribe(
      (res) => {
        this.donHangService.loadDSDonHang();
        this.modal.success({
          nzTitle: "Xác nhận thành công!",
          nzContent: `Xác nhận thành công các đơn hàng đã chọn.`,
        });
        this.setOfCheckedId.clear();
      },
      (err) => {
        console.log("Lỗi", err);
        this.modal.error({
          nzTitle: "Xảy ra lỗi!",
          nzContent: `Vui lòng kiểm tra lại...`,
        });
        this.setOfCheckedId.clear();
      }
    );
  }
  // Xoá nhiều đơn
  xoaNhieuDonHang(): void {
    const requestData = this.dsDonHang.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    this.donHangService.xoaNhieuDonHang(requestData).subscribe(
      (res) => {
        this.donHangService.loadDSDonHang();
        this.modal.success({
          nzTitle: "Xoá thành công!",
          nzContent: `Xoá thành công các đơn hàng đã chọn.`,
        });
        this.setOfCheckedId.clear();
      },
      (err) => {
        console.log("Lỗi", err);
        this.modal.error({
          nzTitle: "Xảy ra lỗi!",
          nzContent: `Vui lòng kiểm tra lại...`,
        });
        this.setOfCheckedId.clear();
      }
    );
  }
}
