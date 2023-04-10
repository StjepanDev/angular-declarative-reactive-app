import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, map } from 'rxjs';
import { DeclarativeCategoryService } from 'src/app/services/declarativecategory.service';
import { DeclarativePostService } from 'src/app/services/declarativepost.service';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent {
  constructor(
    private postService: DeclarativePostService,
    private categoryService: DeclarativeCategoryService
  ) {}

  posts$ = this.postService.postsWithCategory$;
  categories$ = this.categoryService.categories$;

  selectedCategoryId = '';
  selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  filteredPosts$ = combineLatest([
    this.posts$,
    this.selectedCategoryAction$,
  ]).pipe(
    map(([posts, selectedCategoryId]) => {
      return posts.filter(
        (post) =>
          selectedCategoryId ? post.categoryId === selectedCategoryId : true
        // zapamti ovaj filter
      );
    })
  );

  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    console.log(selectedCategoryId);
    this.selectedCategorySubject.next(selectedCategoryId);
  }
}
