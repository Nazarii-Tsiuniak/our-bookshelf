import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  language: 'uk' | 'en';
}

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', description: '', language: 'uk' };
  isEdit = false;

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];
      const existingBook = books.find(b => b.id === +id);
      if (existingBook) {
        this.book = { ...existingBook };
        this.isEdit = true;
      }
    }
  }

  saveBook() {
    const books = JSON.parse(localStorage.getItem('books') || '[]') as Book[];

    if (this.isEdit) {
      const index = books.findIndex(b => b.id === this.book.id);
      if (index !== -1) books[index] = { ...this.book };
    } else {
      this.book.id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
      books.push({ ...this.book });
    }

    localStorage.setItem('books', JSON.stringify(books));
    this.router.navigate(['/']); // повертаємось на головну
  }
}
