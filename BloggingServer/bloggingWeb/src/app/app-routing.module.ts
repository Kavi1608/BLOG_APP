import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/create-post/view-all/view-all.component'; // ✅ Fixed Import
import { ViewPostComponent } from './pages/create-post/view-post/view-post.component'; // ✅ Fixed Import
import { SearchByNameComponent } from './pages/create-post/search-by-name/search-by-name.component'; // ✅ Fixed Import

const routes: Routes = [
  { path: '', redirectTo: 'create-post', pathMatch: 'full' }, // ✅ Default Route
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'search-by-name', component: SearchByNameComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: '**', redirectTo: 'create-post' } // ✅ Handle unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
