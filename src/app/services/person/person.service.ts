import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IPersonDto } from '../../interfaces/IPersonDto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _httpService: HttpService) { }

  create(data: IPersonDto){
    return this._httpService.post("Person/Create", data);
  }

  getAll(){
    return this._httpService.get("Person/GetAll");
  }

  Delete(personId: number){
    return this._httpService.delete("Person/Delete/"+personId);
  }
}
