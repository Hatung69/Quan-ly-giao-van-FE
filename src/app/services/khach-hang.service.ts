import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { KhachHang } from "../models/khach-hang.model";

const API_URL = "http://localhost:8080/api/khach-hang";

@Injectable({
  providedIn: "root",
})
export class KhachHangService {
  dsKhachHang$ = new BehaviorSubject<KhachHang[]>([]);
  constructor(private http: HttpClient) {
    this.loadDSKhachHang();
  }

  loadDSKhachHang() {
    this.layDSKhachHang().subscribe((data) => {
      this.dsKhachHang$.next(data);
    });
  }
  loadDSKhachHangTimKiem(keyWord: string) {
    this.timKhachHang(keyWord).subscribe((data) => {
      if (!data) this.dsKhachHang$.next([]);
      else this.dsKhachHang$.next(data);
    });
  }

  // Lấy danh sách khách hàng
  layDSKhachHang(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(API_URL);
  }

  // Tìm khách hàng
  timKhachHang(keyWord: string): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(
      `${API_URL}/tim-kiem/?keySearch=${keyWord}`
    );
  }

  // Lấy khách hàng
  layKhachHangTheoID(idKhachHang: string): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${API_URL}/${idKhachHang}`);
  }

  // Tạo mới khách hàng
  taoMoiKhachHang(khachHang: KhachHang): Observable<any> {
    return this.http.post(API_URL, khachHang);
  }

  // Cập nhật khách hàng
  capNhatKhachHang(idKhachHang: string, khachHang: KhachHang): Observable<any> {
    return this.http.put(`${API_URL}/${idKhachHang}`, khachHang);
  }

  //Xoá khách hàng
  xoaKhachHang(idKhachHang: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idKhachHang}`);
  }
}
