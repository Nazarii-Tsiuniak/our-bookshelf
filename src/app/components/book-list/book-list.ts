import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookListComponent {
  books = [
    { id: 1, title: 'Мистецтво війни', author: 'Сунь-Цзи' },
    { id: 2, title: 'Гаррі Поттер', author: 'Дж. К. Ролінг' },
    { id: 3, title: '1984', author: 'Джордж Орвелл' }
  ];
}
