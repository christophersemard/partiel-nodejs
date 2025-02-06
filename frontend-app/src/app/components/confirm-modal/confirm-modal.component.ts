import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-confirm-modal",
    standalone: true,
    templateUrl: "./confirm-modal.component.html",
    styleUrls: ["./confirm-modal.component.css"],
    imports: [CommonModule],
})
export class ConfirmModalComponent {
    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm(): void {
        this.confirm.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
