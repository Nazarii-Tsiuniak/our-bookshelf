import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common'; // для *ngIf

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
  imports: [FormsModule, RouterLink, CommonModule, NgIf],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    author: '',
    description: '',
    language: 'uk',
    genre: '',
    coverUrl: ''
  };

  isEditMode = false;
  imageError = false; // прапорець помилки зображення

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      const id = Number(idParam);

      const stored = localStorage.getItem('books');
      const books: Book[] = stored ? JSON.parse(stored) : [];

      const existingBook = books.find(b => b.id === id);

      if (existingBook) {
        this.book = { ...existingBook };
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.isEditMode = false;
    }
  }

  save(): void {
    const stored = localStorage.getItem('books');
    const books: Book[] = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      const index = books.findIndex(b => b.id === this.book.id);
      if (index !== -1) {
        books[index] = { ...this.book };
      }
    } else {
      this.book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      books.push(this.book);
    }

    localStorage.setItem('books', JSON.stringify(books));
    this.router.navigate(['/']);
  }

  // спрацьовує якщо картинка не завантажилась
  onImageError() {
    this.imageError = true;
  }

  // спрацьовує якщо користувач змінив URL і хочемо зняти попередню помилку
  onImageLoad() {
    this.imageError = false;
  }
}
