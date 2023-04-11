import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { DeclarativePostService } from 'src/app/services/declarativepost.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostComponent {
  constructor(private postService: DeclarativePostService) {}
  //radi templejta radimo novi stream error,ne moze onPush raditi
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();
  errorMessage = '';
  post$ = this.postService.post$.pipe(
    catchError((error: string) => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );
}
