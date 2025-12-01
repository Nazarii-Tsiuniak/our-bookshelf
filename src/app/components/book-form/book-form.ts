import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  language: 'uk' | 'en';
  genre: string;
  coverUrl?: string;
}

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
    language: 'uk',
    genre: '',
    coverUrl: ''
  };

  constructor(private router: Router) {}

  save() {
    const stored = localStorage.getItem('books');
    const books: Book[] = stored ? JSON.parse(stored) : [];

    // новий id
    this.book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;

    books.push(this.book);
    localStorage.setItem('books', JSON.stringify(books));

   
    this.router.navigate(['/']);
  }
}
