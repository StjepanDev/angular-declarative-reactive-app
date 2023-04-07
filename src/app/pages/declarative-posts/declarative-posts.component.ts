import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeclarativePostService } from 'src/app/services/declarativepostservice';

@Component({
  selector: 'app-declarative-posts',
  templateUrl: './declarative-posts.component.html',
  styleUrls: ['./declarative-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeclarativePostsComponent {
  constructor(private postService: DeclarativePostService) {}

  posts$ = this.postService.postsWithCategory$;
}
