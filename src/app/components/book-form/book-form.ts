import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css'],
})
export class BookFormComponent {
  title = '';
  author = '';

  submit() {
    alert(`Нова книга: ${this.title} — ${this.author}`);
  }
}
