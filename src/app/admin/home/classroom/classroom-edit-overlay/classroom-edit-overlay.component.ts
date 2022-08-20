import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-classroom-edit-overlay',
  templateUrl: './classroom-edit-overlay.component.html',
  styleUrls: ['./classroom-edit-overlay.component.css']
})
export class ClassroomEditOverlayComponent implements OnInit {

  private _classroom?: string | undefined | null;
  modelClassroom:string | undefined | null;
  message="";

  @Output()
  closed=new EventEmitter();
  @Output()
  updated=new EventEmitter<{old:string,new:string}>();
  @Output()
  delete=new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public get classroom(): string | undefined | null {
    return this._classroom;
  }
  @Input()
  public set classroom(value: string | undefined | null) {
    this._classroom = value;
    this.modelClassroom=this._classroom;
  }

  close(){
    this.closed.emit();
  }

  update(){
      this.updated.emit({old:this.classroom!,new:this.modelClassroom!});
  }
  isDisabled(){
    if (this.modelClassroom===this.classroom) {
      return true;
    }
    if (this.message.length>0) {
      return true;
    }
    return false;
  }

  deleteCls(){
    if (confirm($localize `Are you sure you want to delete this classroom?`)) {
      this.delete.emit(this.classroom!);
    }
  }

}
