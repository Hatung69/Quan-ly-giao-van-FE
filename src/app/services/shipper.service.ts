import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Shipper } from "../models/shipper.model";

const API_URL = "http://localhost:8080/api/shipper";

@Injectable({
  providedIn: "root",
})
export class ShipperService {
  dsShipper$ = new BehaviorSubject<Shipper[]>([]);
  constructor(private http: HttpClient) {
    this.loadDSShipper();
  }

  loadDSShipper() {
    this.layDSShipper().subscribe((data) => {
      this.dsShipper$.next(data);
    });
  }

  loadDSShipperTimKiem(keyWord: string) {
    this.timShipper(keyWord).subscribe((data) => {
      if (!data) this.dsShipper$.next([]);
      else this.dsShipper$.next(data);
    });
  }

  // Lấy danh sách shipper
  layDSShipper(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(API_URL);
  }

  timShipper(keyWord: string): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(
      `${API_URL}/tim-kiem/?keySearch=${keyWord}`
    );
  }

  // Lấy shipper
  layShipperTheoID(idShipper: string): Observable<Shipper> {
    return this.http.get<Shipper>(`${API_URL}/${idShipper}`);
  }

  // Tạo mới shipper
  taoMoiShipper(Shipper: Shipper): Observable<any> {
    return this.http.post(API_URL, Shipper);
  }

  // Cập nhật shipper
  capNhatShipper(idShipper: string, Shipper: Shipper): Observable<any> {
    return this.http.put(`${API_URL}/${idShipper}`, Shipper);
  }

  //Xoá shipper
  xoaShipper(idShipper: string): Observable<any> {
    return this.http.delete(`${API_URL}/${idShipper}`);
  }
}
