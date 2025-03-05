import { createSlice } from '@reduxjs/toolkit';
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  refreshUserThunk,
} from './operationsAuth';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'authNameSlice', //имя slice
  initialState,
  extraReducers: (builder) => {
    //! registerThunk
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      //! loginThunk
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      //! logoutThunk
      // Когда logoutThunk успешно выполняется, глобальное состояние Redux для этого
      // slice сбрасывается в изначальное состояние (initialState),
      //  очищая данные, например, пользователя, токены и т. д.
      // .addCase(logoutThunk.fulfilled, () => initialState)

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })

      //! refreshUserThunk
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;

//! ==========================================================================
//!🔥 Три состояния async thunk
//* Когда createAsyncThunk выполняется, он проходит через три состояния:
//* pending - запрос отправлен, но ответ ещё не получен.
//* fulfilled - запрос успешно выполнен, данные получены.
//* rejected - запрос завершился с ошибкой.

//!  1. pending - ожидание ответа
// 🔹 Когда срабатывает?
// 👉 Как только dispatch(loginThunk(credentials)) вызывается,
//    Redux переходит в состояние pending.

//🔹  Что обычно делают в pending?
//✅  Включают индикатор загрузки.
//    state.loading = true;
//✅  Очищают прошлые ошибки.
//    state.error = null;

//!  2. fulfilled - успех
// 🔹 Когда срабатывает?
// 👉 Если запрос выполнен успешно и сервер вернул
//    ответ (например, данные о пользователе).

// 🔹 Что делают в fulfilled?
// ✅ Записывают полученные данные (например, токен, данные пользователя).
//    state.user = action.payload.user;
//    state.token = action.payload.token;
// ✅ Выключают индикатор загрузки.
//    state.loading = false;

//!  3. rejected - ошибка
// 🔹 Когда срабатывает?
// 👉 Если сервер вернул ошибку (например, неверный пароль, сбой на сервере).

// 🔹 Что делают в rejected?
// ✅ Записывают текст ошибки.
//    state.error = action.payload;
// ✅ Выключают индикатор загрузки.
//    state.loading = false;
