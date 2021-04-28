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

  // Trên trạm cho đơn hàng
  themTram(idDonHang: string, idTram: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/them-tram/${idDonHang}/${idTram}`);
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

  // //Xoá đơn hàng
  // xoaDonHang(idNhanvien: string): Observable<any> {
  //   return this.http.delete(`${API_URL}/${idNhanvien}`);
  // }
}
