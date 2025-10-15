import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent {
  title = '';
  author = '';
  description = '';

  submit() {
    const savedBooks = localStorage.getItem('books');
    const books: Book[] = savedBooks ? JSON.parse(savedBooks) : [];

    const newBook: Book = {
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: this.title,
      author: this.author,
      description: this.description
    };

    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    alert(`Додано книгу: "${this.title}" автор: ${this.author}`);
    this.title = '';
    this.author = '';
    this.description = '';
  }
}
