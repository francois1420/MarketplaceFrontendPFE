import {Injectable, OnInit} from '@angular/core';
import axios from 'axios';
import {Login} from "../../models/Login";
import {Register} from "../../models/Register";
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../../models/Address";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken: string | null = null;
  user: User = new User();

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('token');
    if (this.userToken !== null) {
      this.getMe().subscribe(u => {
        this.user = u;
        this.setAddressIfNotExists(this.user);
      });
    }
  }

  isConnected(): boolean {
    return this.userToken !== null;
  }

  connect(token: string): void {
    localStorage.setItem('token', token);
    this.userToken = token;
    this.getMe().subscribe(u => {
      this.user = u;
      this.setAddressIfNotExists(this.user);
    });
    // this.cartService.refreshCart();
  }

  setAddressIfNotExists(user: User) {
    if (user.address == null) {
      user.address = new Address();
    }
  }

  disconnect() {
    localStorage.removeItem('token');
    this.user = new User();
    this.userToken = null;
  }

  async login(login: Login): Promise<boolean> {
    try {
      const promiseToken = await axios.post(`${environment.apiURl}/api/user/login`, {
        email: login.email,
        password: login.password
      });

      const token = promiseToken.data.token;
      this.connect(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async register(register: Register): Promise<boolean> {
    try {
      const promiseToken = await axios.post(`${environment.apiURl}/api/user/register`, {
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email,
        password: register.password
      });

      const token = promiseToken.data.token;
      this.connect(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async updateMe(user: User): Promise<boolean> {
    try {
      const promiseUpdate = await axios.put(`${environment.apiURl}/api/user/me`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }, {
        headers:{
          Authorization: `Bearer ${this.userToken}`
        }
      });

      if (promiseUpdate.status === 200) {
        this.user = promiseUpdate.data;
        this.setAddressIfNotExists(this.user);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }


  async insertMyAddress(address: Address): Promise<boolean> {
    try {
      const promiseInsert = await axios.post(`${environment.apiURl}/api/address`, {
        streetNumber: address.streetNumber,
        appartmentNumber: address.appartmentNumber,
        streetName: address.streetName,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      }, {
        headers:{
          Authorization: `Bearer ${this.userToken}`
        }
      });

      if (promiseInsert.status === 201) {
        this.user.address = promiseInsert.data;
        this.setAddressIfNotExists(this.user);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async updateMyAddress(address: Address): Promise<boolean> {
    try {
      const promiseUpdate = await axios.put(`${environment.apiURl}/api/address`, {
        streetNumber: address.streetNumber,
        appartmentNumber: address.appartmentNumber,
        streetName: address.streetName,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      }, {
        headers:{
          Authorization: `Bearer ${this.userToken}`
        }
      });

      if (promiseUpdate.status === 201) {
        this.user.address = promiseUpdate.data;
        this.setAddressIfNotExists(this.user);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  getMe() : Observable<User> {
    return this.http.get<User>(`${environment.apiURl}/api/user/me`, {
      headers:{
        Authorization: `Bearer ${this.userToken}`
      }
    });
  }
}
