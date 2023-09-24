import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    })
  }

  login(): void {
    this.authService.clearUserName()
    const userName = this.loginForm.value.userName;

    if (this.loginForm.value.password !== '' && userName !== '') {
      this.authService.setUserName(userName);

      this.router.navigate(['/main']);
    } else {
      this.loginForm.patchValue({
        userName: '',
        password: ''
      });
      this.router.navigate(['/login']);
    }
  }



}
