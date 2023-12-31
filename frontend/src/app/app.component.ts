import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog.component";
import { PollItemComponent } from "./poll-item/poll-item.component";
import { CreatePollFormComponent } from "./create-poll-form/create-poll-form.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";
import { CreateOptionFormComponent } from "./create-option-form/create-option-form.component";
import { StorageService } from "./storage.service";

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
  storage = inject(StorageService);

  dialog = signal<DialogType>("signIn");
  username = signal<string>("");
  selectedPollId = signal<string>("");

  userVotes = computed(() =>
    this.username() !== ""
      ? this.storage.allVotes().filter((v) => v.username === this.username())
      : []
  );

  userCost = computed(() =>
    this.userVotes().reduce(
      (acc, { option }) =>
        (this.storage.allOptions().find((o) => o.optionId === option)?.price ??
          0) + acc,
      0
    )
  );

  totalCost = computed(() =>
    this.storage
      .allVotes()
      .reduce(
        (acc, { option }) =>
          (this.storage.allOptions().find((o) => o.optionId === option)
            ?.price ?? 0) + acc,
        0
      )
  );

  checkIsSignedIn = () => {
    const match = document.cookie.match(/username=(?<username>.*)/);
    const name = match?.groups?.["username"] ?? "";
    const isSignedIn = name !== "";
    if (isSignedIn) {
      this.username.set(decodeURIComponent(name));
      this.dialog.set("");
    }
  };

  ngOnInit() {
    this.checkIsSignedIn();
    this.storage.sync();
  }
}

export type DialogType = "" | "signIn" | "createOption" | "createPoll";
