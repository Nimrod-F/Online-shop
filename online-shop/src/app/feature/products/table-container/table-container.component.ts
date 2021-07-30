import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductsData } from '../model/products.data';
import { MatSnackBar } from '@angular/material/snack-bar';
import ProductDetailData from '../model/product-detail.data';
import { ProductModalDialogComponent } from '../product-modal-dialog/product-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../../users/model/user.data';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.scss'],
})
export class TableContainerComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  products: ProductsData[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
        this._snackBar.open('Successfully deleted');
      },
      (error) => this._snackBar.open('Operation failed!')
    );
  }

  updateProduct(product: ProductDetailData) {
    this.productService.updateProduct(product).subscribe(
      () => {
        this.loadProducts();
        this._snackBar.open('Product successfully updated!');
      },
      (error) => this._snackBar.open('Operation failed!')
    );
  }

  openModalDialog() {
    const dialogRef = this.dialog.open(ProductModalDialogComponent, {
      width: '50%',
      height: '35%',
      data: { primaryButton: 'Add', admin: this.isAdmin() },
    });

    dialogRef.afterClosed().subscribe((data: ProductDetailData) => {
      if (data)
        this.productService.addProduct(data).subscribe(
          (data) => {
            this.loadProducts();
            this._snackBar.open('Product added successfully!');
          },
          (error) => this._snackBar.open('Operation failed!')
        );
    });
  }

  isAdmin(): boolean {
    const obj = localStorage.getItem('user');
    if (obj) {
      const user = JSON.parse(obj);
      return user.roles.includes(Roles.ADMIN);
    }

    return false;
  }
}
