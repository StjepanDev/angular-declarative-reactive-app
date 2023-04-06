import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http
      .get<{ [id: string]: ICategory }>(
        'https://rxjs-posts-default-rtdb.firebaseio.com/categories.json'
      )
      .pipe(
        map((categories) => {
          let categoriesData: ICategory[] = [];
          for (let id in categories) {
            categoriesData.push({ ...categories[id], id });
          }
          return categoriesData;
        })
      );
  }
}
