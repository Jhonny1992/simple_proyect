import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    })
  }

  login(): void{

    if(this.loginForm.value.password != '' && this.loginForm.value.userName != ''){
      this.router.navigate(['/main'])
    }else{
      this.loginForm.patchValue({
        userName: [''],
        password: ['']
      })
      this.router.navigate(['/login'])
    }

    console.log("save", this.loginForm.value);

}



}
