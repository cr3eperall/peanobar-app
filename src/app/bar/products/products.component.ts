import { ProductDTO, ProductType } from './../../services/ProductDTO';
import { ProductService } from './../../services/product.service';
import { SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectedProduct:ProductDTO|undefined;
  products:ProductDTO[]=[];
  mode:"Add"|"Edit"='Edit';

  constructor(private productService:ProductService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((value)=>{
      this.products=value;
    })
  }

  close(){
    this.selectedProduct=undefined;
  }

  onAdd(){
    this.mode='Add';
    this.selectedProduct={
      id:0,
      cost:0,
      img:0,
      name:"",
      type:ProductType.PANINO
    };
  }

  onEdit(product:ProductDTO){
    this.mode='Edit';
    this.selectedProduct=product;
  }

  deletePr(product:ProductDTO){
    this.productService.deleteProduct(product).subscribe((value)=>{
      if (value>=0) {
        this.productService.getAllProducts().subscribe((value)=>{
          this.products=value;
          this.close();
        })
      }else{
        throw new Error("this product doesnt exist")
      }
    })
  }

  update(event:{product:ProductDTO,mode?:"Add"|"Edit"}){
    if (event.mode==undefined|| event.mode=='Edit') {
      this.productService.updateProduct(event.product).subscribe((value)=>{
        for (let i=0;i<this.products.length;i++) {
          if (this.products[i].id==value.id) {
            this.products[i]=value;
          }
        }
      });
    }else{
      this.productService.addProduct(event.product).subscribe((value)=>{
        this.products.push(value);
      });
    }
    this.close()
  }

}
