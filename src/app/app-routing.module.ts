import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { HomeComponent } from './pages/home/home.component';
import { DeclarativePostsComponent } from './pages/declarative-posts/declarative-posts.component';
import { AlternativePostsComponent } from './pages/alternative-posts/alternative-posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'declarativeposts', component: DeclarativePostsComponent },
  { path: 'altposts', component: AlternativePostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
