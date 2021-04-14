import { Pipe, PipeTransform } from "@angular/core";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";

@Pipe({
  name: "formatDistance",
})
export class FormatDistancePipe implements PipeTransform {
  transform(value: Date): string {
    return (
      formatDistance(new Date(value), new Date(), {
        addSuffix: true,
        locale: vi,
      }) + "..."
    );
  }
}
