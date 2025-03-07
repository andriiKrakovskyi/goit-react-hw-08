import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../test_name/selectors';

export const selectNameFilter = (state) => state.filterNameSlice.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name &&
        contact.name.toLowerCase().includes(filter ? filter.toLowerCase() : ''),
    );
  },
);
