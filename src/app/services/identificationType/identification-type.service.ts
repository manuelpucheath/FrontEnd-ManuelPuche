import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

  constructor(private httpService: HttpService) { }

  getAll(){
    return this.httpService.get("IdentificationType/GetAll");
  }
}
