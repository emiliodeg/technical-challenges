import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../reducers/users.reducer';

export const getUsersState = createFeatureSelector<UsersState>('users');

export const getUsers = createSelector(
  getUsersState,
  state => state.filteredUsers || state.users
);

export const getSortDirection = createSelector(
  getUsersState,
  state => state.sortDirection
);

export const getSortColumn = createSelector(
  getUsersState,
  state => state.sortColumn
);
