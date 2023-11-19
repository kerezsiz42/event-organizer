import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { Routes } from "@angular/router";
import {
  OptionControllerService,
  PollControllerService,
  VoteControllerService,
} from "./app/api/services";
import { provideHttpClient } from "@angular/common/http";

export const routes: Routes = [];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), {
    provide: VoteControllerService,
  }, {
    provide: OptionControllerService,
  }, {
    provide: PollControllerService,
  }],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
