import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DonHangService } from "../../../services/don-hang.service";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { logoBase64 } from "./base65.logo";
import { formatDate } from "@angular/common";
import { threadId } from "node:worker_threads";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-chi-tiet-don-hang",
  templateUrl: "./chi-tiet-don-hang.component.html",
  styleUrls: ["./chi-tiet-don-hang.component.scss"],
})
export class ChiTietDonHangComponent implements OnInit {
  isVisible = false;
  donHang: any;
  idDonHang: any;
  tongKhoiLuongHang = 0;
  tongGiaTriHang = 0;
  base64Data: any;
  retrievedAvatar: any;

  constructor(
    private donHangService: DonHangService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idDonHang = this.route.snapshot.paramMap.get("idDonHang");
    this.donHangService.layDonHangTheoID(this.idDonHang).subscribe(
      (res) => {
        this.donHang = res;
        this.base64Data = this.donHang.anhDinhKem;
        this.retrievedAvatar = "data:image/jpeg;base64," + this.base64Data;
        this.donHang.dsHangHoa.forEach((dh: any) => {
          this.tongKhoiLuongHang += parseInt(dh.khoiLuong);
          this.tongGiaTriHang += parseInt(dh.giaTri);
        });
      },
      (err) => {
        console.log("HTTP error", err);
      }
    );
  }

  generatePdf() {
    var dd: any = {
      content: [
        {
          columns: [
            {
              image: "data:image/png;base64," + logoBase64,
              width: 150,
            },
            [
              {
                text: "Phiếu gửi hàng",
                color: "#333333",
                width: "*",
                fontSize: 28,
                bold: true,
                alignment: "right",
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: "Mã đơn",
                        color: "#aaaaab",
                        bold: true,
                        width: "*",
                        fontSize: 12,
                        alignment: "right",
                      },
                      {
                        text: this.donHang.maDonHang,
                        bold: true,
                        color: "red",
                        fontSize: 12,
                        alignment: "right",
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: "Ngày tạo",
                        color: "#aaaaab",
                        bold: true,
                        width: "*",
                        fontSize: 12,
                        alignment: "right",
                        margin: [0, 5, 0, 0],
                      },
                      {
                        text: formatDate(
                          this.donHang.thoiGianKhoiTao,
                          "dd/MM/YYY",
                          "vi"
                        ),
                        bold: true,
                        color: "#333333",
                        fontSize: 12,
                        alignment: "right",
                        margin: [0, 5, 0, 0],
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: "Người gửi",
              color: "#aaaaab",
              bold: true,
              fontSize: 14,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
            {
              text: "Người nhận",
              color: "#aaaaab",
              bold: true,
              fontSize: 14,
              alignment: "left",
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text:
                this.donHang.khachHang.tenKhachHang +
                "\n" +
                this.donHang.khachHang.sdt,
              bold: true,
              alignment: "left",
            },
            {
              text:
                this.donHang.tenNguoiNhan + "\n" + this.donHang.sdtNguoiNhan,
              bold: true,
              alignment: "left",
            },
          ],
        },
        {
          columns: [
            {
              text: "Địa chỉ",
              color: "#aaaaab",
              margin: [0, 7, 0, 3],
            },
            {
              text: "Địa chỉ nhận",
              color: "#aaaaab",
              bold: true,
              decoration: "underline",
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: this.donHang.khachHang.diaChi,
              margin: [0, 0, 20, 0],
            },
            {
              text: this.donHang.diaChi.moTaChiTiet.toUpperCase(),
              margin: [0, 0, 20, 0],
            },
          ],
        },
        "\n",
        {
          text: "Nội dung hàng hoá",
          bold: true,
          alignment: "left",
          margin: [0, 0, 0, 5],
          decoration: "underline",
        },
        this.donHang.dsHangHoa.map(function (item: any) {
          return {
            ul: [
              {
                text:
                  item.tenHang +
                  "\n" +
                  "\tSố lượng: " +
                  item.soLuong +
                  "\n" +
                  "\t\t\tKhối lượng: " +
                  item.khoiLuong +
                  " (gam)" +
                  "\n" +
                  "\tMô tả: " +
                  item.moTa +
                  "\n",
                bold: false,
                color: "darkBlue",
                margin: [0, 0, 0, 5],
              },
            ],
          };
        }),
        "\n",
        {
          columns: [
            {
              text: "Ghi chú: " + this.donHang.ghiChu,
              alignment: "left",
              color: "#ed0909",
            },
          ],
        },
        "\n",
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto"],
            body: [
              [
                {
                  text: "Tiền thu hộ",
                  bold: true,
                  fontSize: 20,
                  alignment: "left",
                  border: [false, true, false, true],
                  margin: [0, 10, 0, 10],
                },
                {
                  text: this.format(this.donHang.tongTienThuHo, " VNĐ"),
                  bold: true,
                  fontSize: 20,
                  color: "green",
                  alignment: "right",
                  border: [false, true, false, true],
                  margin: [0, 10, 0, 10],
                },
              ],
            ],
          },
        },
        "\n",
        {
          columns: [
            { qr: this.donHang.maDonHang },
            {
              text: "Chữ ký người nhận",
              alignment: "right",
              margin: [0, 0, 30, 0],
              color: "#0083ff",
            },
          ],
        },
      ],
    };
    pdfMake.createPdf(dd).open();
  }

  format(n: any, currency: any) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + currency;
  }
}
