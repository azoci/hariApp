import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {LoginServiceService} from '../shared/services/common-service/login-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    constructor(private _fb: FormBuilder,
                public router: Router,
                public service: LoginServiceService) {
        this.loginForm = this._fb.group({
            username: ['', [<any>Validators.required]],
            password: ['', <any>Validators.required],
        });
    }

    ngOnInit() {}

    onLoggedin(data: any) {
        this.service.postLogin(data).subscribe(res => {
            if (res.token) {
                localStorage.setItem('Token', res.token);
                localStorage.setItem('isLoggedin', 'true');

                this.router.navigate(['/dashboard']);
            } else {
                localStorage.clear();
            }
        });
    }
}
