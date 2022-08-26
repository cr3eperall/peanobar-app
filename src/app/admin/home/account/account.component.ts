import { UserDTO } from './../../../services/UserDTO';
import { Component, Input, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
	@Input()
	user!: UserDTO;
	@Input()
	inClassroom:boolean=false;
	@Output()
	edit = new EventEmitter<UserDTO>();
	@HostBinding("style.--custom-shadow-color")
	shadowColor:string="28deg 69% 52%";

	constructor() {}

	ngOnInit(): void {
		if (this.inClassroom) {
			this.shadowColor="0deg 0% 42%";
		}
	}

	onEdit() {
		this.edit.emit(this.user!);
	}

	getRole(): string {
		switch (this.user.role.id) {
			case 1:
        return $localize `User`;
			case 2:
				return "Bar";
			case 3:
				return "Admin";
			default:
				return "";
		}
	}
}
