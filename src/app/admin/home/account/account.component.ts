import { UserDTO } from './../../../services/UserDTO';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
	@Input()
	user!: UserDTO;
	@Output()
	edit = new EventEmitter<UserDTO>();

	constructor() {}

	ngOnInit(): void {}

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
