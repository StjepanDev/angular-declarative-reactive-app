import { Component } from '@angular/core';
import { DeclarativePostService } from 'src/app/services/declarativepostservice';

@Component({
  selector: 'app-alternative-posts',
  templateUrl: './alternative-posts.component.html',
  styleUrls: ['./alternative-posts.component.scss'],
})
export class AlternativePostsComponent {
  constructor(private postService: DeclarativePostService) {}
  posts$ = this.postService.postsWithCategory$;
  // .subscribe((res) =>
  //   console.log(res)
  // );
}
