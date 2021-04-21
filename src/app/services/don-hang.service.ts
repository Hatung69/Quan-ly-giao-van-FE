import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { NhanVien } from "../models/nhan-vien.models";

const API_URL = "http://localhost:8080/api/don-hang";

@Injectable({
  providedIn: "root",
})
export class DonHangService {
  dsNhanVien$ = new BehaviorSubject<NhanVien[]>([]);

  constructor(private http: HttpClient) {
    this.loadDSNhanVien();
  }

  loadDSNhanVien() {
    this.layDSDonHang().subscribe((data) => {
      this.dsNhanVien$.next(data);
    });
  }

  // Lấy danh sách đơn hàng
  layDSDonHang(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(API_URL);
  }

  // Lấy đơn hàng
  layDonHangTheoID(idNhanvien: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${API_URL}/${idNhanvien}`);
  }

  // Tạo mới đơn hàng
  taoMoiDonHang(bodyData: FormData): Observable<any> {
    return this.http.post(API_URL, bodyData);
  }

  // Cập nhật đơn hàng
  capNhatDonHang(idNhanvien: string, bodyData: FormData): Observable<any> {
    return this.http.put(`${API_URL}/${idNhanvien}`, bodyData);
  }

  //Xoá đơn hàng
  xoaDonHang(idNhanvien: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idNhanvien}`);
  }
}
