import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { searchUsers } from '../../actions/users.actions';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() debounceTime = 500;

  private unsubscribeSubject = new Subject<void>();

  private querySubject = new Subject<string>();
  readonly query$ = this.querySubject
    .asObservable()
    .pipe(debounceTime(this.debounceTime), distinctUntilChanged());

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.query$
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(query => this.store.dispatch(searchUsers({ query })));
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  applySearchText(query: string): void {
    this.querySubject.next(query);
  }
}
