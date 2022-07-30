import { ImageService } from 'src/app/services/image.service';
import { SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-img-selector',
  templateUrl: './img-selector.component.html',
  styleUrls: ['./img-selector.component.css']
})
export class ImgSelectorComponent implements OnInit {

  imgFiles:FileList|null=null;
  @Input()
  selectedImg:number|undefined;
  checkedImg:number|undefined;
  images:{url:SafeUrl,id:number}[]=[]
  message="";
  open=false;
  @Output()
  onSelected=new EventEmitter<number>();
  constructor(private imageService:ImageService) { }

  ngOnInit(): void {
    this.imageService.getAllImages().subscribe((value)=>{
      this.images=value;
    })
  }

  getImg(id:number){
    for (const img of this.images) {
      if (img.id==id) {
        return img;
      }
    }
    return undefined;
  }

  isDisabled():boolean{
    return this.selectedImg==undefined;
  }

  selected(id:number){
    this.checkedImg=id;
  }

  select(){
    this.onSelected.emit(this.checkedImg!);
    this.selectedImg=this.checkedImg;
    this.close();
  }

  add(e:Event){
    for (let i = 0; i < (e.target as HTMLInputElement).files!.length; i++) {
      const file = (e.target as HTMLInputElement).files?.item(i);
      this.imageService.uploadImage(file!).subscribe((value)=>{
        this.images.push(value);
      });
    }
  }

  close(){
    this.open=false;
  }

}
