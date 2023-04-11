import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { combineLatest, Subject, throwError, catchError } from 'rxjs';
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
      }),
      catchError(this.handleError),
      shareReplay(1)
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
    }),
    catchError(this.handleError),
    shareReplay(1)
  );

  private selectedpostSubject = new Subject<string>();
  selectedPostAction$ = this.selectedpostSubject.asObservable();

  post$ = combineLatest([
    this.postsWithCategory$,
    this.selectedPostAction$,
  ]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find((post) => post.id === selectedPostId);
    }),
    catchError(this.handleError),
    shareReplay(1)
  );

  selectPost(postId: string) {
    this.selectedpostSubject.next(postId);
  }

  handleError(error: Error) {
    return throwError(() => {
      return 'Unknown error accured, please try again!';
    });
  }
}
