import { ProductService } from './../../services/product.service';
import { ProductDTO, ProductType } from './../../services/ProductDTO';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:ProductDTO[]=[];
  selectedProduct?:ProductDTO;
  searchModel?:string;
  displayProducts:ProductDTO[]=[]
  
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((value)=>{
      this.products=value;
      this.displayProducts=this.products;
    });
  }

  openBuy(product:ProductDTO){
    this.selectedProduct=product;
  }

  closeBuy(){
    this.selectedProduct=undefined;
  }

  reset(){
    this.searchModel="";
    this.displayProducts=this.products;
    (document.getElementById('PANINO') as HTMLInputElement).checked = false;
    (document.getElementById('BIBITA') as HTMLInputElement).checked = false;
    (document.getElementById('DOLCE') as HTMLInputElement).checked = false;
  }

  onChange(selected:"PANINO"|"BIBITA"|"DOLCE"){
    this.search();
    (document.getElementById(selected) as HTMLInputElement).checked = true;
    let arr:ProductDTO[]=[];
    for (let i = 0; i < this.displayProducts.length; i++) {
      if (this.displayProducts[i].type==selected) {
        arr.push(this.displayProducts[i]);
      }
    }
    this.displayProducts=arr;
  }

  search(){
    if (this.searchModel==undefined||this.searchModel==="") {
      this.reset();
      return;
    }
    this.displayProducts=[];
    for (const product of this.products) {
      if (product.name.toLowerCase().includes(this.searchModel!)) {
        this.displayProducts.push(product);
      }
    }
  }


}
