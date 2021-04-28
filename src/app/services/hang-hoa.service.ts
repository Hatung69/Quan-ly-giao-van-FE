import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

const API_URL = "http://localhost:8080/api/hang-hoa";

@Injectable({
  providedIn: "root",
})
export class HangHoaService {
  constructor(private http: HttpClient) {}

  // // Lấy danh sách hàng hoá
  // layDSHangHoa(): Observable<any[]> {
  //   return this.http.get<any[]>(API_URL);
  // }

  // Lấy hàng hoá
  layHangHoaTheoID(idHangHoa: string): Observable<any> {
    return this.http.get(`${API_URL}/${idHangHoa}`);
  }

  // Tạo mới hàng hoá
  taoMoiHangHoa(idDonHang: string, HangHoa: any): Observable<any> {
    return this.http.post(`${API_URL}/${idDonHang}`, HangHoa);
  }

  // Cập nhật hàng hoá
  capNhatHangHoa(idHangHoa: string, HangHoa: any): Observable<any> {
    return this.http.put(`${API_URL}/${idHangHoa}`, HangHoa);
  }

  //Xoá hàng hoá
  xoaHangHoa(idHangHoa: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idHangHoa}`);
  }
}
