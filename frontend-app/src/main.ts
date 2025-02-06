import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...appConfig.providers, // Récupère tous les providers définis dans app.config.ts
    ],
});
