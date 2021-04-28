import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TramTrungChuyen } from "../models/tram-trung-chuyen.model";

const API_URL = "http://localhost:8080/api/tram-trung-chuyen";

@Injectable({
  providedIn: "root",
})
export class TramTrungChuyenService {
  dsTram$ = new BehaviorSubject<TramTrungChuyen[]>([]);
  constructor(private http: HttpClient) {
    this.loadDSTram();
  }

  loadDSTram() {
    this.layDSTram().subscribe((data) => {
      this.dsTram$.next(data);
    });
  }

  // Lấy danh sách trạm trung chuyển
  layDSTram(): Observable<TramTrungChuyen[]> {
    return this.http.get<TramTrungChuyen[]>(API_URL);
  }

  // Lấy trạm trung chuyển
  layTramTheoID(idTram: string): Observable<TramTrungChuyen> {
    return this.http.get<TramTrungChuyen>(`${API_URL}/${idTram}`);
  }

  // Tạo mới trạm trung chuyển
  taoMoiTram(tramTrungChuyen: TramTrungChuyen): Observable<any> {
    return this.http.post(API_URL, tramTrungChuyen);
  }

  // Cập nhật trạm trung chuyển
  capNhatTram(
    idTram: string,
    tramTrungChuyen: TramTrungChuyen
  ): Observable<any> {
    return this.http.put(`${API_URL}/${idTram}`, tramTrungChuyen);
  }

  //Xoá trạm trung chuyển
  xoaTramTheoID(idTram: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idTram}`);
  }
}
