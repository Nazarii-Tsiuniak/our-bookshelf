import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'book-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
})
export class BookDetailComponent implements OnInit {
  bookId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
