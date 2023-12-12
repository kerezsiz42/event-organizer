import { Component, Input, WritableSignal } from "@angular/core";

@Component({
  selector: "sign-in-form",
  standalone: true,
  templateUrl: "./sign-in-form.component.html",
})
export class SignInFormComponent {
  @Input() username!: WritableSignal<string>;
  @Input() checkIsSignedIn!: () => void;

  onUsernameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username.set(input.value);
  }

  signIn() {
    const encoded = encodeURIComponent(this.username());
    document.cookie = `username=${encoded};SameSite=Strict`;
    this.checkIsSignedIn();
  }
}
