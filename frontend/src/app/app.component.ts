import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { OptionControllerService } from "./api/services";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  #optionProvider = inject(OptionControllerService);

  option = signal<string>("no data yet");

  ngOnInit() {
    this.#optionProvider.optionIndex().subscribe((value) =>
      this.option.set(value)
    );
  }
}
