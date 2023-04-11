import { Component } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { DeclarativePostService } from 'src/app/services/declarativepost.service';

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
  selectedPost$ = this.postService.post$;

  onSelectPost(post: IPost, event: Event) {
    event.preventDefault();
    console.log(post);
    post.id && this.postService.selectPost(post.id);
  }
}
