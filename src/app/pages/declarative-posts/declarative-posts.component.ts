import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { DeclarativeCategoryService } from 'src/app/services/declarativecategory.service';
import { DeclarativePostService } from 'src/app/services/declarativepostservice';

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

  filteredPosts$ = this.posts$.pipe(
    map((posts) => {
      return posts.filter((post) =>
        // zapamti ovaj filter
        this.selectedCategoryId
          ? post.categoryId === this.selectedCategoryId
          : true
      );
    })
  );

  onCategoryChange(event: Event) {
    let selectedCategoryId = (event.target as HTMLSelectElement).value;
    console.log(selectedCategoryId);
    this.selectedCategoryId = selectedCategoryId;
  }
}
