import { Component, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { PollControllerService } from "./api/services";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog.component";
import { PollOutput } from "./api/models";
import { PollItemComponent } from "./poll-item/poll-item.component";
import { CreatePollFormComponent } from "./create-poll-form/create-poll-form.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { CreateOptionFormComponent } from "./create-option-form/create-option-form.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CustomDialogComponent,
    PollItemComponent,
    CreatePollFormComponent,
    SignInFormComponent,
    CreateOptionFormComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  #pollProvider = inject(PollControllerService);
  polls = signal<PollOutput[]>([]);
  dialog = signal<DialogType>("signIn");
  username = signal<string>("");

  checkIsSignedIn() {
    const match = document.cookie.match(/username=(?<username>.*)/);
    const name = match?.groups?.["username"] ?? "";
    const isSignedIn = name !== "";
    if (isSignedIn) {
      this.username.set(decodeURIComponent(name));
      this.dialog.set("");
    }
  }

  ngOnInit() {
    this.checkIsSignedIn();
    this.#pollProvider.getPolls().subscribe((v) => this.polls.set(v));
  }
}

export type DialogType = "" | "signIn" | "createOption" | "createPoll";
