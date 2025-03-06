export const selectContacts = (state) => state.contactNameSlice.contacts.items;
export const selectLoading = (state) => state.contactNameSlice.contacts.loading;
export const selectError = (state) => state.contactNameSlice.contacts.error;
