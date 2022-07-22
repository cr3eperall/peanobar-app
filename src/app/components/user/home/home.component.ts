import { ProductService } from './../../../services/product.service';
import { ProductDTO, ProductType } from './../../../services/ProductDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:ProductDTO[]=[];
  selectedProduct?:ProductDTO;
  
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((value)=>{
      this.products=value;
    });
  }

  openBuy(product:ProductDTO){
    this.selectedProduct=product;
  }

  closeBuy(){
    this.selectedProduct=undefined;
  }
}
