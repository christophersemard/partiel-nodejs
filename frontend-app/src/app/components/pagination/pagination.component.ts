import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-pagination",
    standalone: true,
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.css"],
    imports: [CommonModule],
})
export class PaginationComponent {
    @Input() totalItems: number = 0;
    @Input() itemsPerPage: number = 10;
    @Input() currentPage: number = 1;
    @Output() pageChanged = new EventEmitter<number>();

    get totalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    changePage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChanged.emit(page);
        }
    }
}
