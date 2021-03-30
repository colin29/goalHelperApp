import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';




/* A mock login service */
@Injectable()
export class LoginService {
	private loggedIn = new BehaviorSubject<boolean>(false);

	get isLoggedIn$() {
		return this.loggedIn.asObservable();
	}

	constructor(private router: Router) {
	}

	login(username: string, password: string) {
		if (username !== '' && password !== '') {
			this.loggedIn.next(true);
			this.router.navigate(['/']);
		}
	}

	logout() {
		this.loggedIn.next(false);
		this.router.navigate(['/']);
	}
}