/// <reference path="../../../node_modules/@types/gapi/index.d.ts" /> 
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" /> 

import { Component, OnInit } from '@angular/core';

import { LoginService } from './../login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	user: gapi.auth2.GoogleUser;
	profile: gapi.auth2.BasicProfile;

	constructor(public loginService: LoginService) { }

	ngOnInit() {

	}

	async login() {
		this.loginService.login().then((user) => {
			console.log("Got user", user)
			this.user = user as gapi.auth2.GoogleUser;
			this.profile = this.user.getBasicProfile();
		},
			(reason) => console.log("Failed", reason));
	}
	async logout() {
		await this.loginService.logout()
		this.user = null;
	}


}
