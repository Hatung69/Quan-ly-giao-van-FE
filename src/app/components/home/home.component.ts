import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
