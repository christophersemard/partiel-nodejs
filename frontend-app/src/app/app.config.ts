import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import LaraLightBlue from "@primeng/themes/lara";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: LaraLightBlue,
                options: {
                    cssLayer: {
                        name: "primeng",
                        order: "tailwind-base, primeng, tailwind-utilities",
                    },
                },
            },
        }),

        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes), provideAnimationsAsync(),
    ],
};
