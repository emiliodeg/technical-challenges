import { createAction, props } from '@ngrx/store';
import { User } from '../services/api.service';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{users: User[]}>()
);

export const searchUsers = createAction(
  '[Users] Search',
  props<{ query: string }>()
);

export const sortUsers = createAction(
  '[Users] Sort',
  props<{ column: string }>()
);
