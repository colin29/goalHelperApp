/// <reference path="../../../node_modules/@types/gapi/index.d.ts" /> 
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" /> 

import { Component, OnInit } from '@angular/core';
import { ApplicationRef } from '@angular/core';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private application: ApplicationRef) { }

	ngOnInit() {

	}

	user: gapi.auth2.GoogleUser;
	authInstance: gapi.auth2.GoogleAuth;
	gapiSetup: boolean;

	async initGoogleAuth(): Promise<void> {
		//  Create a new Promise where the resolve 
		// function is the callback passed to gapi.load
		const pload = new Promise((resolve) => {
			gapi.load('auth2', resolve);
		});

		// When the first promise resolves, it means we have gapi
		// loaded and that we can call gapi.init
		return pload.then(async () => {
			await gapi.auth2
				.init({ client_id: '151216529726-ln270mf9qr867bf5ptao8l3r2i5q0iuf.apps.googleusercontent.com' })
				.then(auth => {
					this.gapiSetup = true;
					this.authInstance = auth;
				});
		});
	}


	async authenticate() {
		// Initialize gapi if not done yet
		if (!this.gapiSetup) {
			await this.initGoogleAuth();
		}

		// Resolve or reject signin Promise
		new Promise(async () => {
			await this.authInstance.signIn().then(
				user => this.loggedIn(user),
				(error) => console.log("Error: " + JSON.stringify(error)));
		});
	}

	loggedIn(user: gapi.auth2.GoogleUser) {
		this.user = user;
		console.log("Successfully logged in with: " + JSON.stringify(user));
	}
	logout() {
		console.log("Trying to log out");
		if (this.user) {
			this.authInstance.signOut()
				.then(() => this.loggedOut())
				.catch(err => console.log("Error while signing out: " + err))
		} else {
			console.log("Tried calling logout but not logged in")
		}
	}
	loggedOut() {
		this.user = null;
		this.application.tick();
		console.log("Logged out succesfully");
	}
}
