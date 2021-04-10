import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import vi from "@angular/common/locales/vi";
import { vi_VN } from "ng-zorro-antd/i18n";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzAvatarModule } from "ng-zorro-antd/avatar";

import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { HomeComponent } from "./components/home/home.component";

registerLocaleData(vi);

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    IconsProviderModule,
    NzAvatarModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
