import { Component, Input } from "@angular/core";

@Component({
  selector: "custom-dialog",
  standalone: true,
  templateUrl: "./custom-dialog.component.html",
})
export class CustomDialogComponent {
  @Input() open = false;
}
