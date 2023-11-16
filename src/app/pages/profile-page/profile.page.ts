import { Component } from '@angular/core';
import {UserService} from "../../services/user-service/user.service";
import {User} from "../../models/User";


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  constructor(private userService : UserService) {}

  getActualUser(): User {
    return this.userService.user;
  }

  isAdmin(): boolean {
    return this.userService.user.role === 'admin';
  }

  isConnected(): boolean {
    return this.userService.isConnected();
  }

  disconnect(): void {
    this.userService.disconnect();
  }
}
