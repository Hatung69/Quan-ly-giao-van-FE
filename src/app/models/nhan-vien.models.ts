import { TramTrungChuyen } from "./tram-trung-chuyen.model";
export interface NhanVien {
  id: string;
  hoTen: string;
  sdt: string;
  gioiTinh: string;
  ngaySinh: Date;
  diaChi: string;
  trangThai: string;
  lanCuoiDangNhap: Date;
  idTram: string;
}
