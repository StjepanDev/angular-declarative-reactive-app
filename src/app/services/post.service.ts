import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http
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
  }
}
