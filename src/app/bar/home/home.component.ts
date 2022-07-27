import { UserService } from './../../services/bar/user.service';
import { ProductDTO } from './../../services/ProductDTO';
import { OrderService } from './../../services/bar/order.service';
import { OrderDTO, OrderItem, OrderStatus } from './../../services/OrderDTO';
import { Component, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders:OrderDTO[]=[];
  products:OrderItem[]=[];
  classrooms:OrderDTO[]=[];
  private _sorting="byproduct";
  constructor(private orderService:OrderService, private userService:UserService) { }
  //TODO add media query;
  ngOnInit(): void {
    this.orderService.toProcess().subscribe((value)=>{
      this.orders=value;
      this.products=this.getProducts(this.getProductsMap(this.orders));
      this.generateClassroomMap(this.orders,(map)=>{
        this.classrooms=this.getClassrooms(this.getClassroomMap(this.orders,map));
      });
    });
  }

  getProductsMap(orders:OrderDTO[]):Map<string,number>{
    const products=new Map<string,number>;
    for (const order of orders) {
      for (const item of order.contents) {
        const itemStr=JSON.stringify(item.product);
        if (products.has(itemStr)) {
          products.set(itemStr,products.get(itemStr)!+item.quantity);
        }else{
          products.set(itemStr,item.quantity);
        }
      }
    }
    return products;
  }

  getProducts(map:Map<string,number>):OrderItem[]{
    let products=Array.apply(null,Array(map.size)) as (OrderItem|undefined)[];
    for (const product of map.entries()) {
      let i:OrderItem={
        product:JSON.parse(product[0]) as ProductDTO,
        quantity:product[1],
        id:0
      }
      products[products.indexOf(undefined)]=i;
    }
    return products as OrderItem[];
  }

  generateClassroomMap(orders:OrderDTO[],then?:(map:Map<string,number>)=>void){
    const classroomMap=new Map<string,number>;
    let count=0;
    for (const order of orders) {
      if (!classroomMap.has(order.owner)) {
        this.userService.getUser(order.owner).subscribe((value)=>{
          classroomMap.set(order.owner,value.classroom);
          count++
          if (count==orders.length) {
            if (then) {
              then(classroomMap);
            }
          }
        });
      }else{
        count++;
      }
    }
  }

  getClassroomMap(orders:OrderDTO[],classroomMap:Map<string,number>):Map<number,OrderDTO>{
    const map=new Map<number,OrderDTO>;
    const orderMap=new Map<number,OrderDTO[]>;
    for (const order of orders) {
      const classroom=classroomMap.get(order.owner)!;
      if(orderMap.has(classroom)){
        orderMap.set(classroom,orderMap.get(classroom)!.concat([order]));
      }else{
        orderMap.set(classroom,[order]);
      }
    }
    for (const classroomOrders of orderMap.entries()) {
      let ord=this.getProducts(this.getProductsMap(classroomOrders[1]));
      const order:OrderDTO={
        id:0,
        madeAt:"",
        contents:ord,
        status:OrderStatus.IN_PROGRESS,
        total:0,
        owner:classroomOrders[1][0].owner
      }
      map.set(classroomOrders[0],order);
    }
    return map;
  }

  getClassrooms(map:Map<number,OrderDTO>):OrderDTO[]{
    let classrooms=Array.apply(null,Array(map.size)) as (OrderDTO|undefined)[];
    for (const classroom of map.entries()) {
      let i:OrderDTO=classroom[1];
      classrooms[classrooms.indexOf(undefined)]=i;
    }
    return classrooms as OrderDTO[];
  }
  
  public get sorting() : string {
    return this._sorting;
  }
  
  
  public set sorting(v : string) {
    this._sorting = v;
    this.changeSorting(v);
  }
  
  changeSorting(v: string) {
    
  }

  onChange(event:Event){
    const e=event.target as HTMLInputElement;
    if (e.checked) {
      this._sorting=e.value;
    }
  }
}