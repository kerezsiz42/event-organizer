import { Component, Input, inject } from "@angular/core";
import { OptionOutput } from "../api/models";
import { StorageService } from "../storage.service";

@Component({
  selector: "option-item",
  standalone: true,
  templateUrl: "./option-item.component.html",
})
export class OptionItemComponent {
  storage = inject(StorageService);

  @Input() option!: OptionOutput;

  onSelectOption() {}

  onRemoveOption() {}
}
