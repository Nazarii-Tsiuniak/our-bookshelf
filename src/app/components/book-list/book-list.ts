import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm = '';
  sortBy: 'title' | 'author' = 'title';

  ngOnInit() {
    const savedBooks = localStorage.getItem('books');
    if(savedBooks) {
      this.books = JSON.parse(savedBooks);
    } else {
      this.books = [
        { id:1, title:'Мистецтво війни', author:'Сунь-Цзи', description:'Класичний трактат про стратегію та тактику війни.' },
        { id:2, title:'Гаррі Поттер і філософський камінь', author:'Дж. К. Ролінг', description:'Початок пригод Гаррі Поттера у школі магії Хогвартс.' },
        { id:3, title:'Маленький принц', author:'Антуан де Сент-Екзюпері', description:'Філософська казка про дружбу, любов та сенс життя.' },
        { id:4, title:'Три товариші', author:'Еріх Марія Ремарк', description:'Історія дружби та життя у післявоєнній Європі.' },
        { id:5, title:'Фауст', author:'Йоганн В. Ґете', description:'Драматична поема про угоду з дияволом і пошук сенсу життя.' },
        { id:6, title:'Війна і мир', author:'Лев Толстой', description:'Епічний роман про життя російського суспільства під час наполеонівських війн.' },
        { id:7, title:'Гамлет', author:'Вільям Шекспір', description:'Трагедія про принца Данії та його пошук справедливості.' },
        { id:8, title:'Аліса в Країні чудес', author:'Льюїс Керролл', description:'Фантастична історія дівчинки Аліси у дивовижному світі.' },
        { id:9, title:'Воно', author:'Стівен Кінг', description:'Жахлива історія про містичне зло в маленькому містечку.' },
        { id:10, title:'Пітер Пен', author:'Джеймс Баррі', description:'Пригоди хлопчика, який не хоче дорослішати.' },
        { id:11, title:'Пригоди Шерлока Холмса', author:'Артур Конан Дойл', description:'Детективні історії про легендарного сищика.' },
        { id:12, title:'Старий і море', author:'Ернест Гемінґвей', description:'Розповідь про боротьбу людини та природи.' },
        { id:13, title:'Ґаррі Поттер і таємна кімната', author:'Дж. К. Ролінг', description:'Продовження пригод Гаррі у школі магії, нові таємниці.' },
        { id:14, title:'Крихітка Дорріт', author:'Чарльз Діккенс', description:'Соціальна сатира про бідність і багатство у Вікторіанській Англії.' },
        { id:15, title:'Ромео і Джульєтта', author:'Вільям Шекспір', description:'Трагічна історія кохання двох молодих закоханих.' },
        { id:16, title:'Моби Дік', author:'Герман Мелвілл', description:'Епічна історія про полювання на величезного білого кита.' },
        { id:17, title:'Джейн Ейр', author:'Шарлотта Бронте', description:'Історія сильного духом дівчини, що долає життєві труднощі.' },
        { id:18, title:'Одіссея', author:'Гомер', description:'Давньогрецька епічна поема про пригоди Одіссея.' },
        { id:19, title:'Анна Кареніна', author:'Лев Толстой', description:'Роман про кохання та мораль у вищому суспільстві.' },
        { id:20, title:'Іліада', author:'Гомер', description:'Епічна історія Троянської війни та героїчних подвигів.' },
        { id:21, title:'Пригоди Тома Сойєра', author:'Марк Твен', description:'Веселі пригоди хлопчика на Міссісіпі.' },
        { id:22, title:'Острів скарбів', author:'Роберт Луїс Стівенсон', description:'Пригодницька історія про пошуки скарбів і піратів.' },
        { id:23, title:'Віднесені вітром', author:'Маргарет Мітчелл', description:'Історія кохання та війни на тлі американської громадянської війни.' },
        { id:24, title:'Злочин і кара', author:'Федір Достоєвський', description:'Психологічний роман про мораль і провину.' },
        { id:25, title:'Титан', author:'Теодор Драйзер', description:'Соціальний роман про боротьбу амбіцій та багатства.' }
      ];
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  get filteredBooks() {
    return this.books
      .filter(b =>
        b.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
  }

  get totalBooks() {
    return this.books.length;
  }
}
