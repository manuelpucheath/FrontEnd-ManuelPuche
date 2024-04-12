import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IUserDto } from '../../interfaces/IUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpService: HttpService) { }

  public login(data: IUserDto){
    return this._httpService.post("User/Login", data);
  }

  public signUp(data: IUserDto){
    return this._httpService.post("User/Create", data);
  }
}
