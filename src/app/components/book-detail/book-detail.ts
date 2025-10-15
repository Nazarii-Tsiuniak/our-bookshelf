import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

@Component({
  selector: 'book-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetailComponent {
  book: Book | undefined;

  constructor(private route: ActivatedRoute) {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = books.find((b: Book) => b.id === id);
  }
}
