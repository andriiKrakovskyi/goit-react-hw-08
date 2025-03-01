import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../Contacts/selectorsContacts';

export const selectNameFilter = (state) => state.filterNameSlice.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  },
);
