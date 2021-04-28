import { NgModule } from "@angular/core";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzBadgeModule } from "ng-zorro-antd/badge";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzListModule } from "ng-zorro-antd/list";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzTypographyModule } from "ng-zorro-antd/typography";

const AntComponents = [
  NzMessageModule,
  NzImageModule,
  NzBadgeModule,
  NzModalModule,
  NzDescriptionsModule,
  NzTableModule,
  NzDividerModule,
  NzButtonModule,
  NzInputModule,
  NzIconModule,
  NzPopconfirmModule,
  NzTagModule,
  NzDrawerModule,
  NzFormModule,
  NzSelectModule,
  NzUploadModule,
  NzRadioModule,
  NzDatePickerModule,
  NzTabsModule,
  NzPageHeaderModule,
  NzListModule,
  NzCardModule,
  NzInputNumberModule,
  NzAvatarModule,
  NzTypographyModule,
];

@NgModule({
  imports: [AntComponents],
  exports: [AntComponents],
})
export class NgZorroModule {}
