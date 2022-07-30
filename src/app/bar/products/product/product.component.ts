import { ImageService } from 'src/app/services/image.service';
import { SafeUrl } from '@angular/platform-browser';
import { ProductDTO } from './../../../services/ProductDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input()
  product:ProductDTO|undefined;
  image:SafeUrl="";
  @Output()
  edit=new EventEmitter();
  constructor(private imageService:ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage(this.product!.img).subscribe((value)=>{
      this.image=value;
    })
  }

  edited(){
    this.edit.emit();
  }

}
