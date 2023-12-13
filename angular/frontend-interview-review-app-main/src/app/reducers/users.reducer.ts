import { createReducer, on } from '@ngrx/store';
import { loadUsers, searchUsers, sortUsers } from '../actions/users.actions';
import { User } from '../services/api.service';

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[];
  filteredUsers?: User[];
  sortColumn?: string;
  sortDirection: string;
}

export const initialState: UsersState = {
  users: [],
  sortDirection: localStorage.getItem('sortDirection') || 'asc',
  sortColumn: localStorage.getItem('sortColumn') || 'firstname',
};

function getSortByProperty(user: any, field: string): string {
  if (field === 'firstname') {
    return user.name.split(' ')[0];
  } else if (field === 'surname') {
    return user.name.split(' ')[1];
  } else {
    return user[field];
  }
}

function doSort(users: any[], field: string, dir: string): any[] {
  return users.sort((userA, userB) => {
    return getSortByProperty(
      dir === 'asc' ? userA : userB,
      field
    ).localeCompare(getSortByProperty(dir === 'asc' ? userB : userA, field));
  });
}

export const usersReducer = createReducer(
  initialState,

  on(loadUsers, (state, action) => {
    return {
      ...state,
      users: doSort(action.users, state.sortColumn, state.sortDirection),
    };
  }),

  on(searchUsers, (state, action) => {
    return {
      ...state,
      filteredUsers: action.query
        ? state.users.filter(({ name, username, email }) => {
            const [firstName, surname] = name.split(' ');

            return [firstName, surname, username, email].some(item =>
              item.toLowerCase().includes(action.query.toLowerCase())
            );
          })
        : undefined,
    };
  }),

  on(sortUsers, (state, action) => {
    const sortDirection =
      action.column === state.sortColumn && state.sortDirection === 'asc'
        ? 'desc'
        : 'asc';

    localStorage.setItem('sortDirection', sortDirection);
    localStorage.setItem('sortColumn', action.column);

    return {
      ...state,
      sortColumn: action.column,
      sortDirection,
      users: doSort(state.users, action.column, sortDirection),
      filteredUsers: state.filteredUsers
        ? doSort(state.filteredUsers, action.column, sortDirection)
        : undefined,
    };
  })
);
