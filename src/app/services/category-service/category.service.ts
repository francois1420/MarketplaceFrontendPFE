import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { UserService } from '../user-service/user.service';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = [];
  constructor(private http: HttpClient, private userService : UserService) {
    this.refreshCategories();
  }

  getCategory() : Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiURl}/api/category`);
  }

  getAllCategory() : Category[] {
    return this.categories;
  }

  getCategoryWithId(id : string) : Observable<Category> {
    return this.http.get<Category>(`${environment.apiURl}/api/category/` + id);
  }

  private refreshCategories() {
    this.http.get<Category[]>(`${environment.apiURl}/api/category` )
    .subscribe(c => this.categories = c)
  }

  async insertCategory(category: Category): Promise<boolean> {
    try {
      const promiseInsert = await axios.post(`${environment.apiURl}/api/category`, category, {
        headers:{
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });

      if (promiseInsert.status !== 201) return false;

      this.refreshCategories();
      return true;
    } catch (e) {
      return false;
    }
  }
}


