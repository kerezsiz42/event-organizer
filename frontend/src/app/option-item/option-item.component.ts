import { Component, Input } from "@angular/core";
import { OptionOutput } from "../api/models";

@Component({
  selector: "option-item",
  standalone: true,
  templateUrl: "./option-item.component.html",
})
export class OptionItemComponent {
  @Input() option!: OptionOutput;

  onSelectOption() {}

  onRemoveOption() {}
}
