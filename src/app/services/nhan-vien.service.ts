import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { NhanVien } from "../models/nhan-vien.models";

const API_URL = "http://localhost:8080/api/nhan-vien";

@Injectable({
  providedIn: "root",
})
export class NhanVienService {
  dsNhanVien$ = new BehaviorSubject<NhanVien[]>([]);

  constructor(private http: HttpClient) {
    this.loadDSNhanVien();
  }

  loadDSNhanVien() {
    this.layDSNhanVien().subscribe((data) => {
      this.dsNhanVien$.next(data);
    });
  }

  // Lấy danh sách nhân viên
  layDSNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(API_URL);
  }

  // Lấy nhân viên
  layNhanVienTheoID(idNhanvien: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${API_URL}/${idNhanvien}`);
  }

  // Lấy nhân viên theo tài khoản ID
  layNhanVienTheoIDAcc(idAcc: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${API_URL}/tai-khoan/${idAcc}`);
  }

  // Tạo mới nhân viên
  taoMoiNhanVien(bodyData: FormData): Observable<any> {
    return this.http.post(API_URL, bodyData);
  }

  // Cập nhật nhân viên
  capNhatNhanVien(idNhanvien: string, bodyData: FormData): Observable<any> {
    return this.http.put(`${API_URL}/${idNhanvien}`, bodyData);
  }

  //Xoá nhân viên
  xoaNhanVien(idNhanvien: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idNhanvien}`);
  }
}
