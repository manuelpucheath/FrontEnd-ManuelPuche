import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDto } from '../../../interfaces/IUserDto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private _userService: UserService, private formBuilder: FormBuilder, private router: Router){

  }

  login(){
    this.router.navigateByUrl('login');
  }

  register(){
    if (this.signupForm.valid) {
      let data: IUserDto = {
        username: this.signupForm.value.userName as string,
        password: this.signupForm.value.password as string
      }
  
      this._userService.signUp(data).subscribe({
        next:(response: any) => {
          this.router.navigateByUrl('login');
        },
      })
    }
  }

  get userName(){
    return this.signupForm.controls.userName
  }

  get password(){
    return this.signupForm.controls.password
  }
}
