import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './products.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number=2;
    showImage: boolean=false;
    errorMessage : string;
    
    _listFilter: string;
    get listFilter(): string{
      return this._listFilter;
    }

    set listFilter(value:string){
      this._listFilter = value;
      this.filteredProducts= this._listFilter ? this.performFilter(this._listFilter): this.products;
    }

    filteredProducts: IProduct[];
    products : IProduct[] = [];

      
      constructor(private productService : ProductService) {   
       
      }

      onRatingClicked(message : string): void{
        this.pageTitle = 'Product List : '+message;
      }

      performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      toggleImage() : void{
        this.showImage = !this.showImage;
      }

      ngOnInit():void{
       this.productService.getProducts().subscribe({
         //this.products refers to the class variable and not the local variable if used in below fashion
        next : products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error : err =>this.errorMessage = err
       });
      
      }
}