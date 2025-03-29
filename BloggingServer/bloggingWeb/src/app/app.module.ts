import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ✅ Import Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';  // ✅ Added missing module

// ✅ Import Routing & Main Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ✅ Import Custom Components
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/create-post/view-all/view-all.component';
import { ViewPostComponent } from './pages/create-post/view-post/view-post.component';
import { SearchByNameComponent } from './pages/create-post/search-by-name/search-by-name.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    SearchByNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // ✅ Angular Material Modules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSnackBarModule,
    MatGridListModule  // ✅ Added missing import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
