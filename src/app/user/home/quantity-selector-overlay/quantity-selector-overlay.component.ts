import { OrderService } from './../../../services/order.service';
import { ImageService } from 'src/app/services/image.service';
import { SafeUrl } from '@angular/platform-browser';
import { ProductDTO } from './../../../services/ProductDTO';
import { Component, HostBinding, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-selector-overlay',
  templateUrl: './quantity-selector-overlay.component.html',
  styleUrls: ['./quantity-selector-overlay.component.css']
})
export class QuantitySelectorOverlayComponent implements OnInit {
  
  private _product?:ProductDTO;
  quantity:number=1;
  image:SafeUrl="";
  @HostBinding("style.--hidden")
  hidden:string="hidden";
  @Output()
  closed=new EventEmitter();
  
  constructor(private imageService:ImageService, private orderService:OrderService) { }
  
  public get product():ProductDTO|undefined{
    return this._product;
  }

  @Input()
  public set product(prod:ProductDTO|undefined){
    this._product=prod;
    if(this.product!=undefined){
      this.imageService.getImage(this._product!.img).subscribe({
        next:(value)=>{
          this.image=value;
        },
        error:(err)=>{
          this.hidden="hidden";
        }
      });
      this.hidden="visible";
    }else{
      this.hidden="hidden";
      this.image="";
      this.quantity=1;
    }
  }

  ngOnInit(): void {
  }

  check(){
    this.quantity=this.clamp(1,this.quantity,99);
  }

  clamp(min:number,value:number,max:number):number{
    return Math.min(Math.max(value,min),max);
  }

  add(){
    if(this.quantity<99)
    this.quantity++;
  }

  sub(){
    if(this.quantity>1)
    this.quantity--;
  }

  close(){
    this.closed.emit();
  }

  order(){
    if(this.product!==undefined){
      this.orderService.addToCart(this.product,this.quantity).subscribe({
        next:(value)=>{
          this.close();
        },
        error:()=>{
          //TODO do something else
          alert("error");
        }
      })
    }
  }

}
