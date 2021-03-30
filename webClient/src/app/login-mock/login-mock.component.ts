import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
	selector: 'app-login-mock',
	templateUrl: './login-mock.component.html',
	styleUrls: ['./login-mock.component.css']
})
export class LoginMockComponent implements OnInit {

	constructor(private login: LoginService) { }

	ngOnInit() {
	}

}
