import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { PollControllerService } from "./api/services";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomDialogComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  #pollProvider = inject(PollControllerService);

  polls = signal<string[]>([]);
  isSignedIn = signal<boolean>(false);
  name = signal<string>("");

  onNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }

  signIn() {
    document.cookie = `username=${encodeURIComponent(
      this.name()
    )};SameSite=Strict`;
    this.checkIsSignedIn();
  }

  checkIsSignedIn() {
    const match = document.cookie.match(/username=(?<username>.*)/);
    const name = match?.groups?.["username"] ?? "";
    const isSignedIn = name !== "";
    if (isSignedIn) {
      this.name.set(decodeURIComponent(name));
    }
    this.isSignedIn.set(isSignedIn);
  }

  ngOnInit() {
    this.checkIsSignedIn();
    // this.#pollProvider
    //   .optionIndex()
    //   .subscribe((value) => this.polls.set(value));
  }
}
