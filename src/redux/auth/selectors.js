export const selectUser = (state) => state.authNameSlice.user;

export const selectIsRefreshing = (state) => state.authNameSlice.isRefreshing;

export const selectIsLoggedIn = (state) => state.authNameSlice.isLoggedIn;
