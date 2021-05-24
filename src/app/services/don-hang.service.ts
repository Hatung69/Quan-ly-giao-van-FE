import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";

const API_URL = "http://localhost:8080/api/don-hang";

@Injectable({
  providedIn: "root",
})
export class DonHangService {
  dsDonHang$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadDSDonHang();
  }

  loadDSDonHang() {
    this.layDSDonHang().subscribe((data) => {
      this.dsDonHang$.next(data);
    });
  }

  loadDsDonHangTimKiem(keyWord: string) {
    this.timKiemNhanh(keyWord).subscribe((data) => {
      if (!data) this.dsDonHang$.next([]);
      else this.dsDonHang$.next(data);
    });
  }

  timKiemNhanh(keyWord: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${API_URL}/tim-kiem-nhanh/?keySearch=${keyWord}`
    );
  }

  // Thêm trạm cho đơn hàng
  themTram(idDonHang: string, idTram: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/them-tram/${idDonHang}/${idTram}`);
  }
  // Thêm trạm cho ds đơn hàng
  themTramChoDSDonHang(dsDonHang: any[], idTram: string): Observable<any[]> {
    return this.http.post<any[]>(`${API_URL}/them-tram/${idTram}`, dsDonHang);
  }

  // Điều phối đơn
  dieuPhoi(idDonHang: string, idShipper: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/dieu-phoi/${idDonHang}/${idShipper}`);
  }
  // Thay đổi shipper
  thayDoiShipper(
    idDonHang: string,
    idShipperMoi: string,
    idShipperCu: string
  ): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/thay-doi-shipper/${idDonHang}/${idShipperMoi}/${idShipperCu}`
    );
  }
  // Điều phối ds đơn
  dieuPhoiDsDon(dsDonHang: any[], idShipper: string): Observable<any[]> {
    return this.http.post<any[]>(
      `${API_URL}/dieu-phoi/${idShipper}`,
      dsDonHang
    );
  }

  //Xác nhận nhiều đơn hàng
  xacNhanNhieuDonHang(dsDonHang: any[]): Observable<any> {
    return this.http.post(`${API_URL}/xac-nhan`, dsDonHang);
  }

  // Lấy danh sách đơn hàng
  layDSDonHang(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  // Lấy đơn hàng theo ID
  layDonHangTheoID(idDonHang: string): Observable<any> {
    return this.http.get(`${API_URL}/${idDonHang}`);
  }
  // Lấy đơn hàng theo Mã đơn hàng
  layDonHangTheoMaDon(maDonHang: string): Observable<any> {
    return this.http.get(`${API_URL}/ma-don/${maDonHang}`);
  }

  // Tạo mới đơn hàng
  taoMoiDonHang(bodyData: FormData): Observable<any> {
    return this.http.post(API_URL, bodyData);
  }

  // Cập nhật đơn hàng
  capNhatDonHang(idDonHang: string, bodyData: FormData): Observable<any> {
    return this.http.put(`${API_URL}/${idDonHang}`, bodyData);
  }

  //Xoá đơn hàng
  xoaDonHang(idDonHang: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idDonHang}`);
  }
  //Xoá nhiều đơn hàng
  xoaNhieuDonHang(dsDonHang: any[]): Observable<any> {
    return this.http.post(`${API_URL}/xoa-tat-ca`, dsDonHang);
  }

  // Tổng thống kê
  tongThongKe(): Observable<any> {
    return this.http.get<any>(`${API_URL}/thong-ke`);
  }
  // thống kê theo thời gian
  thongKetTheoThoiGian(batDau: Date, ketThuc: Date): Observable<any> {
    return this.http.get<any>(`${API_URL}/thong-ke/${batDau}/${ketThuc}`);
  }
}
