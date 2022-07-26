import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {
  @Input()
  quantity=1;
  @Output()
  qChanged=new EventEmitter<number>();
  @Input()
  min:number=1;
  @Input()
  max:number=99;
  constructor() { }

  ngOnInit(): void {
  }

  check(){
    this.quantity=this.clamp(this.min,this.quantity,this.max);
    this.qChanged.emit(this.quantity);
  }

  clamp(min:number,value:number,max:number):number{
    return Math.min(Math.max(value,min),max);
  }

  add(){
    if(this.quantity<this.max){
      this.quantity++;
      this.qChanged.emit(this.quantity);
    }
  }

  sub(){
    if(this.quantity>this.min){
      this.quantity--;
      this.qChanged.emit(this.quantity);
    }
  }
}
