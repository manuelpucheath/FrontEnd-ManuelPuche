import { Component, OnInit } from '@angular/core';
import { IUserDto } from '../../../interfaces/IUserDto';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })
  messageError: string = "";

  constructor(private _userService: UserService, private formBuilder: FormBuilder, private router: Router){

  }
  
  ngOnInit(){}

  login(){
    this.messageError = "";
    if (this.loginForm.valid) {
      let data: IUserDto = {
        username: this.loginForm.value.userName as string,
        password: this.loginForm.value.password as string
      }
  
      this._userService.login(data).subscribe({
        next:(response: any) => {
          this.router.navigateByUrl('dashboard');
        },
        error:(response: any) =>{
          this.messageError = response.error.message;
        }
      })
    }
  }

  register(){
    this.router.navigateByUrl('signup');
  }

  get userName(){
    return this.loginForm.controls.userName
  }

  get password(){
    return this.loginForm.controls.password
  }
}
