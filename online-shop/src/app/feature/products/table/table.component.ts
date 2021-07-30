import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsData } from '../model/products.data';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalDialogComponent } from '../product-modal-dialog/product-modal-dialog.component';
import { ProductsService } from '../products.service';
import ProductDetailData from '../model/product-detail.data';
import { Roles } from '../../users/model/user.data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() isAdmin: boolean = true;
  @Input() data: ProductsData[] = [];
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<ProductDetailData> =
    new EventEmitter<ProductDetailData>();
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'delete'];

  constructor(public dialog: MatDialog) {}

  deleteProduct(id: number): void {
    this.delete.emit(id);
  }

  openModalDialog(id: number) {
    const dialogRef = this.dialog.open(ProductModalDialogComponent, {
      width: '50%',
      height: '85%',
      data: { id, primaryButton: 'Update', admin: this.isAdmin },
    });

    dialogRef.afterClosed().subscribe((data: ProductDetailData) => {
      if (data) this.update.emit(data);
    });
  }
}
