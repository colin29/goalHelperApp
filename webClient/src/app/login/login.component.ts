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

	userProfile: gapi.auth2.BasicProfile;

	constructor(public loginService: LoginService) { }

	ngOnInit() {

	}

	async login() {
		this.loginService.login().then((user) => {
			console.log("Got user", user)
			this.userProfile = this.loginService.getUserProfile()
		},
			(reason) => console.log("Failed", reason));
	}
	async logout() {
		await this.loginService.logout()
	}


}
