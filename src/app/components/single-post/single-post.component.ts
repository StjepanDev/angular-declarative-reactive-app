import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DeclarativePostService } from 'src/app/services/declarativepost.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent {
  constructor(private postService: DeclarativePostService) {}
  post$ = this.postService.post$;
}
