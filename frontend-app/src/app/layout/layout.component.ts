import { Component } from "@angular/core";
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-layout",
    imports: [HeaderComponent, RouterOutlet, RouterModule],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.scss",
})
export class LayoutComponent {}
