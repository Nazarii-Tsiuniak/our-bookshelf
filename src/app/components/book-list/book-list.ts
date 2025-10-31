import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  language: 'uk' | 'en';
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
  languageFilter: 'all' | 'uk' | 'en' = 'all';

  ngOnInit() {
    // Завантажуємо книги з localStorage або встановлюємо початковий список
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
    } else {
     this.books = [
      { id:1, title:'Мистецтво війни', author:'Сунь-Цзи', description:'Класичний трактат про стратегію та тактику війни.', language:'en' },
      { id:2, title:'Гаррі Поттер і філософський камінь', author:'Дж. К. Ролінг', description:'Початок пригод Гаррі Поттера у школі магії Хогвартс.', language:'en' },
      { id:3, title:'Маленький принц', author:'Антуан де Сент-Екзюпері', description:'Філософська казка про дружбу, любов та сенс життя.', language:'en' },
      { id:4, title:'Три товариші', author:'Еріх Марія Ремарк', description:'Історія дружби та життя у післявоєнній Європі.', language:'en' },
      { id:5, title:'Фауст', author:'Йоганн В. Ґете', description:'Драматична поема про угоду з дияволом і пошук сенсу життя.', language:'en' },
      { id:6, title:'Гамлет', author:'Вільям Шекспір', description:'Трагедія про принца Данії та його пошук справедливості.', language:'en' },
      { id:7, title:'Аліса в Країні чудес', author:'Льюїс Керролл', description:'Фантастична історія дівчинки Аліси у дивовижному світі.', language:'en' },
      { id:8, title:'Воно', author:'Стівен Кінг', description:'Жахлива історія про містичне зло в маленькому містечку.', language:'en' },
      { id:9, title:'Пітер Пен', author:'Джеймс Баррі', description:'Пригоди хлопчика, який не хоче дорослішати.', language:'en' },
      { id:10, title:'Пригоди Шерлока Холмса', author:'Артур Конан Дойл', description:'Детективні історії про легендарного сищика.', language:'en' },
      { id:11, title:'Старий і море', author:'Ернест Гемінґвей', description:'Розповідь про боротьбу людини та природи.', language:'en' },
      { id:12, title:'Ґаррі Поттер і таємна кімната', author:'Дж. К. Ролінг', description:'Продовження пригод Гаррі у школі магії, нові таємниці.', language:'en' },
      { id:13, title:'Крихітка Дорріт', author:'Чарльз Діккенс', description:'Соціальна сатира про бідність і багатство у Вікторіанській Англії.', language:'en' },
      { id:14, title:'Ромео і Джульєтта', author:'Вільям Шекспір', description:'Трагічна історія кохання двох молодих закоханих.', language:'en' },
      { id:15, title:'Моби Дік', author:'Герман Мелвілл', description:'Епічна історія про полювання на величезного білого кита.', language:'en' },
      { id:16, title:'Джейн Ейр', author:'Шарлотта Бронте', description:'Історія сильної духом дівчини, що долає життєві труднощі.', language:'en' },
      { id:17, title:'Одіссея', author:'Гомер', description:'Давньогрецька епічна поема про пригоди Одіссея.', language:'en' },
      { id:18, title:'Іліада', author:'Гомер', description:'Епічна історія Троянської війни та героїчних подвигів.', language:'en' },
      { id:19, title:'Пригоди Тома Сойєра', author:'Марк Твен', description:'Веселі пригоди хлопчика на Міссісіпі.', language:'en' },
      { id:20, title:'Острів скарбів', author:'Роберт Луїс Стівенсон', description:'Пригодницька історія про пошуки скарбів і піратів.', language:'en' },
      { id:21, title:'Лісова пісня', author:'Леся Українка', description:'Поетична драма про природу та духовні пошуки.', language:'uk' },
      { id:22, title:'Кайдашева сім’я', author:'Іван Нечуй-Левицький', description:'Сатирична повість про українське село.', language:'uk' },
      { id:23, title:'Мартин Боруля', author:'Іван Карпенко-Карий', description:'Комедія про українську інтелігенцію та амбіції.', language:'uk' },
      { id:24, title:'Хіба ревуть воли, як ясла повні?', author:'Панас Мирний', description:'Соціально-психологічний роман про життя селян.', language:'uk' },
      { id:25, title:'Тіні забутих предків', author:'Михайло Коцюбинський', description:'Історія кохання та життя гуцулів.', language:'uk' },
      { id:26, title:'Вітер у вербах', author:'Кеннет Грем', description:'Дитяча класика про пригоди тварин у природі.', language:'en' },
      { id:27, title:'Великий Гетсбі', author:'Френсіс Скотт Фіцджеральд', description:'Американська класика про багатство, любов і трагедію.', language:'en' },
      { id:28, title:'Гобіт', author:'Дж. Р. Р. Толкін', description:'Фантастична історія про подорож Більбо Беґгінса.', language:'en' },
      { id:29, title:'Собор Паризької Богоматері', author:'Віктор Гюго', description:'Історична драма та пригоди у середньовічному Парижі.', language:'en' },
      { id:30, title:'Шерлок Холмс: Собака Баскервілів', author:'Артур Конан Дойл', description:'Одна з найвідоміших детективних історій про Холмса.', language:'en' }
    ];
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  get filteredBooks(): Book[] {
    return this.books
      .filter(b =>
        (b.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         b.author.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.languageFilter === 'all' || b.language === this.languageFilter)
      )
      .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
  }

  get totalBooks(): number {
    return this.books.length;
  }

  deleteBook(id: number) {
    if (confirm('Ви впевнені, що хочете видалити цю книгу?')) {
      this.books = this.books.filter(b => b.id !== id);
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }
}
