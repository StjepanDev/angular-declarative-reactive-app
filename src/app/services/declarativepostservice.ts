import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { IPost } from '../models/IPost';
import { DeclarativeCategoryService } from './declarativecategory.service';

@Injectable({
  providedIn: 'root',
})
export class DeclarativePostService {
  constructor(
    private http: HttpClient,
    private categoryService: DeclarativeCategoryService
  ) {}

  posts$ = this.http
    .get<{ [id: string]: IPost }>(
      `https://rxjs-posts-default-rtdb.firebaseio.com/posts.json`
    )
    .pipe(
      map((posts) => {
        let postsData: IPost[] = [];

        for (let id in posts) {
          postsData.push({ ...posts[id], id });
        }
        return postsData;
      })
    );

  postsWithCategory$ = combineLatest([
    //moze  i forkJoin() operator
    this.posts$,
    this.categoryService.categories$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find((cat) => cat.id === post.categoryId)
            ?.title,
        } as IPost;
      });
    })
  );
}
