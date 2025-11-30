import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', description: '', language: 'en', genre: '', coverUrl: '' };
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
      const existing = books.find(b => b.id == +id);
      if (existing) {
        this.book = { ...existing };
        this.isEdit = true;
      }
    }
  }

  save() {
    const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
    if (this.isEdit) {
      const index = books.findIndex(b => b.id === this.book.id);
      if (index !== -1) books[index] = this.book;
    } else {
      this.book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      books.push(this.book);
    }
    localStorage.setItem('books', JSON.stringify(books));
    this.router.navigate(['/']);
  }
}
