import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 25 books initially', () => {
    expect(component.books.length).toBe(25);
  });

  it('should filter books by search term', () => {
    component.searchTerm = 'гаррі';
    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].title).toContain('Гаррі Поттер');
  });
});
