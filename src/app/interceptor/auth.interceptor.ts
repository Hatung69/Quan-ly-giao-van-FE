import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const rawToken = this.token.getToken();

    if (rawToken != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${rawToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
