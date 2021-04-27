import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NgZone } from '@angular/core';
import { ApplicationRef } from '@angular/core';




/* A mock login service */
@Injectable()
export class LoginService {

	authInstance: gapi.auth2.GoogleAuth;
	gapiSetup: boolean;

	/** currentUser.value being non-null --> logged in, and vice versa**/
	private currentUser = new BehaviorSubject<gapi.auth2.GoogleUser>(null);

	constructor(private router: Router, private ngZone: NgZone, private application: ApplicationRef) {
	}



	async initGoogleAuth(): Promise<void> {
		//  Create a new Promise where the resolve
		// function is the callback passed to gapi.load
		const gapiLoaded = new Promise((resolve) => {
			gapi.load('auth2', resolve);
		});

		// When the first promise resolves, it means we have gapi
		// loaded and that we can call gapi.init
		return gapiLoaded.then(async () => {
			await gapi.auth2
				.init({ client_id: '151216529726-ln270mf9qr867bf5ptao8l3r2i5q0iuf.apps.googleusercontent.com' })
				.then(auth => {
					this.gapiSetup = true;
					this.authInstance = auth;
				}, reason => console.log("auth2 init failed", reason));
		});
	}


	async authenticate() {
		// Initialize gapi if not done yet
		if (!this.gapiSetup) {
			await this.initGoogleAuth();
		}


		return this.authInstance.signIn().then(
			(user) => {
				this.updateLoggedIn(user);
				return user;
			}
			,
			(error) => console.log("Error: " + JSON.stringify(error)));
	}



	get currentUser$() {
		return this.currentUser.asObservable();
	}


	async login() {
		return this.authenticate();
	}

	async logout() {
		console.log("current user", this.currentUser);
		console.log("Trying to log out");
		if (this.currentUser.value) {
			this.authInstance.signOut()
				.then(() => this.updateLoggedOut())
				.catch(err => console.log("Error while signing out: " + err))
		} else {
			console.log("Tried calling logout but not logged in")
		}
	}
	private updateLoggedIn(user) {
		this.currentUser.next(user);
		this.ngZone.run(() => this.router.navigate(['/']));
		this.application.tick();
		console.log("Successfully logged in");
	}
	private updateLoggedOut() {
		this.currentUser.next(null);
		this.ngZone.run(() => this.router.navigate(['/']));
		this.application.tick();
		console.log("Successfully logged out");
	}

	//Throws an error if not logged in
	getUserId(): string {
		const user = this.currentUser.value; // atomic access
		if (user != null) {
			return user.getBasicProfile().getId();
		} else {
			throw new Error("Not logged in");
		}
	}
}