import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { OrderService } from './../../services/order.service';
import { OrderDTO, OrderStatus, OrderItem } from './../../services/OrderDTO';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	orders: OrderDTO = {
		id: 0,
		total: 0,
		owner: '',
		madeAt: '',
		status: OrderStatus.IN_CART,
		contents: [],
	};
	lastOrder?: OrderDTO;
	openOrder = 'hidden';

	timeout = window.setTimeout(() => {
		this.updateCart();
	}, 200);

	constructor(
		private orderService: OrderService,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.loginService.getUser().subscribe((value) => {
			this.orders = value.cartOrder;
			this.lastOrder = structuredClone(this.orders);
		});
	}

	onChangeQ(quantity: number, item: OrderItem) {
		for (const iterator of this.orders.contents) {
			if (iterator.id == item.id) {
				if (quantity == 0) {
					this.orderService
						.addToCart(iterator.product, quantity)
						.subscribe((value) => {
							this.orders = value;
						});
				} else {
					iterator.quantity = quantity;
					window.clearTimeout(this.timeout);
					this.timeout = window.setTimeout(() => {
						this.updateCart();
					}, 200);
				}
				return;
			}
		}
	}

	updateCart(): Observable<OrderDTO> {
		this.orders.total = this.total();
		const obs = new Observable<OrderDTO>((subscriber) => {
			if (
				JSON.stringify(this.orders) === JSON.stringify(this.lastOrder)
			) {
				subscriber.next(this.orders);
			} else {
				let ct = 0;
				for (const iterator of this.orders.contents) {
					this.orderService
						.addToCart(iterator.product, iterator.quantity)
						.subscribe(() => {
							ct++;
							if (ct == this.orders.contents.length) {
								this.loginService
									.getUser()
									.subscribe((value) => {
										if (
											JSON.stringify(
												this.orders.contents
											) !==
											JSON.stringify(
												value.cartOrder.contents
											)
										) {
											subscriber.next(this.orders);
										} else {
											this.orders = value.cartOrder;
											this.lastOrder = structuredClone(
												this.orders
											);
											subscriber.next(value.cartOrder);
										}
									});
							}
						});
				}
			}
		});
		return obs;
	}

	total(): number {
		let total = 0;
		for (const iterator of this.orders.contents) {
			total += iterator.product.cost * iterator.quantity;
		}
		return total;
	}

	order() {
		this.openOrder = 'visible';
	}

	close() {
		this.openOrder = 'hidden';
		this.loginService.getUser().subscribe((value) => {
			this.orders = value.cartOrder;
			this.lastOrder = structuredClone(this.orders);
		});
	}
}
