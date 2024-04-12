import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environtments/environtment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urlApi: string = environment.apiHost;

  constructor(
    private _http: HttpClient
  ) {}

  get(path: string) {
    return this._http.get(this.urlApi + path);
  }

  post(path: string, data: any = {}) {
    return this._http.post(this.urlApi + path, data);
  }

  patch(path: string, data: any = {}) {
    return this._http.patch(this.urlApi + path, data);
  }

  delete(path: string) {
    return this._http.delete(this.urlApi + path);
  }
}
