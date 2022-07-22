import { OrderService } from './../../services/order.service';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { ProductDTO, ProductType } from './../../services/ProductDTO';
import { Component, Input, OnInit, enableProdMode, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product!:ProductDTO;
  image:SafeUrl="";
  @Input()
  quantity=1;
  @Output()
  addToCart=new EventEmitter<ProductDTO>();
  @Output()
  qChanged=new EventEmitter<number>();
  constructor(private imageService:ImageService,public router:Router,private orderService:OrderService) { }
  math=Math;
  ngOnInit(): void {
    this.imageService.getImage(this.product.img).subscribe((value)=>{
      this.image=value;
    });
  }

  onClick(){
    this.addToCart.emit(this.product);
  }

  onChangeQ(quantity:number){
    this.quantity=quantity;
    this.qChanged.emit(quantity);
  }

  close(){
    this.qChanged.emit(0);
  }


}
