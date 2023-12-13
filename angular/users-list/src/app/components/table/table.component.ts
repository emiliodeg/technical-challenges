import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService, User } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { loadUsers, sortUsers } from '../../actions/users.actions';
import {
  getSortColumn,
  getSortDirection,
  getUsers,
} from '../../selectors/users.selectors';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  vm$ = combineLatest([
    this.api.data$.pipe(
      tap(users => this.store.dispatch(loadUsers({ users })))
    ),
    this.store.select(getUsers),
    this.store.select(getSortColumn),
    this.store.select(getSortDirection),
  ]).pipe(
    map(([_, users, sortColumn, sortDirection]) => ({
      users,
      sortColumn,
      sortDirection,
    }))
  );

  columns = new Map([
    ['firstname', 'First name'],
    ['surname', 'Last name'],
    ['username', 'username'],
    ['email', 'email'],
  ]);

  constructor(private api: ApiService, private store: Store) {}

  sortUsers(column: string): void {
    this.store.dispatch(sortUsers({ column }));
  }

  trackBy(_index: number, { id }: User): number {
    return id;
  }
}
