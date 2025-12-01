import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

  isEditMode = false; // ← режим: додавання чи редагування

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // 🔧 Режим редагування
      this.isEditMode = true;
      const id = Number(idParam);

      const stored = localStorage.getItem('books');
      const books: Book[] = stored ? JSON.parse(stored) : [];

      const existingBook = books.find(b => b.id === id);

      if (existingBook) {
        // створюємо копію, щоб не міняти об'єкт напряму
        this.book = { ...existingBook };
      } else {
        // якщо книги з таким id немає — повертаємо на список
        this.router.navigate(['/']);
      }
    } else {
      // 🆕 Режим додавання
      this.isEditMode = false;
      // залишаємо book з дефолтними значеннями
    }
  }

  save(): void {
    const stored = localStorage.getItem('books');
    const books: Book[] = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      // 🔧 Оновлення існуючої книги
      const index = books.findIndex(b => b.id === this.book.id);

      if (index !== -1) {
        books[index] = { ...this.book };
      }
    } else {
      // 🆕 Додавання нової книги
      this.book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      books.push(this.book);
    }

    localStorage.setItem('books', JSON.stringify(books));
    this.router.navigate(['/']);
  }
}
