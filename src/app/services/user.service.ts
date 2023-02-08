import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/user";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = "http://localhost:4000/api"

  constructor(private _http: HttpClient) {
  }

  login(credentials: any) {
    return this._http.post<any>(`${this._url}/user/login`, credentials, {withCredentials: true})
  }

  isLogged() {
    return this._http.get<any>(`${this._url}/user/verify`, {withCredentials: true})
  }

  getAllUsers() {
    return this._http.get<any>(`${this._url}/user`, {withCredentials: true})
  }

  addUser(user: User) {
    user.id = uuidv4()
    const {confirmPassword, ...userModel} = user
    return this._http.post(`${this._url}/user`, userModel)
  }
}
