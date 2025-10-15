import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { BookDetailComponent } from './components/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent }
];
