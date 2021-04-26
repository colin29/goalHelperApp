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

	constructor(public login: LoginService) { }

	ngOnInit() {

	}


}
