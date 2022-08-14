import { SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { ProductDTO, ProductType } from './../../../services/ProductDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-overlay',
  templateUrl: './edit-overlay.component.html',
  styleUrls: ['./edit-overlay.component.css']
})
export class EditOverlayComponent implements OnInit {

  private _product:ProductDTO|undefined;
  modelProduct:{
    name: string;
    cost: string;
    img: number;
    type: ProductType;
  }|undefined;
  @Input()
  mode:"Add"|"Edit"="Edit";
  message="";
  @Output()
  closed=new EventEmitter();
  @Output()
  updated=new EventEmitter<{product:ProductDTO,mode?:"Add"|"Edit"}>();

  constructor() { }

  ngOnInit(): void {
  }

  localize(mode :"Add"|"Edit"):string{
    if (mode=='Add') {
      return ($localize `Add`)
    }else{
      return ($localize `Edit`)
    }
  }
  
  public get product() : ProductDTO|undefined {
    return this._product;
  }

  @Input()
  public set product(v : ProductDTO|undefined) {
    this._product = v;
    if (v==undefined) {
      this.modelProduct=undefined;
    }else{
      this.modelProduct={
        cost:(v.cost/100).toFixed(2),
        img:v.img,
        name:v.name,
        type:v.type
      }
    }
  }
  
  select(id:number){
    this.modelProduct!.img=id;
  }

  close(){
    this.closed.emit();
  }

  check():boolean{
    if (this.modelProduct?.cost!=null) {
      const cost:number=Math.floor(Number.parseFloat(this.modelProduct!.cost)*100)
      if (cost<1) {
        this.message=$localize `the cost must be greater then 0.01€`;
        return false;
      }else{
        this.message="";
        return true;
      }
    }
    return false;
  }

  isDisabled(){
    if (this.mode=="Edit") {
      const editedProduct=this.getEditedProduct();
      if(JSON.stringify(editedProduct)===JSON.stringify(this.product)){
        return true;
      }
      if (this.message.length>0) {
        return true;
      }
    }else{
      if (this.modelProduct?.img==0) {
        return true;
      }
      if (!this.check()) {
        return true;
      }
      if (this.modelProduct?.name==null||this.modelProduct?.name=="") {
        return true;
      }
    }
    return false;
  }

  getEditedProduct():ProductDTO{
    const editedProduct:ProductDTO={
      id:this.product!.id,
      name:this.modelProduct!.name,
      cost:Math.floor(Number.parseFloat(this.modelProduct!.cost)*100),
      img:this.modelProduct!.img,
      type:this.modelProduct!.type
    }
    return editedProduct;
  }

  update(){
    const editedProduct=this.getEditedProduct();
    if (editedProduct.cost<1) {
      this.message=$localize `the cost must be greater then 0.01€`;
      return;
    }
    this.message="";
    this.updated.emit({product:editedProduct,mode:this.mode});
  }

}
