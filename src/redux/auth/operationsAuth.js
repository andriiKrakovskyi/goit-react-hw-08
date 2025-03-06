import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/users/login', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const refreshUserThunk = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {

//     try {
//       const persistedToken = thunkAPI.getState().authNameSlice.token;

//       if (persistedToken === null) {
//         return thunkAPI.rejectWithValue('Token is not exist!');
//       }

//       setAuthHeader(persistedToken);
//       const { data } = await api.get('/users/current');
//       return data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistedToken = state.authNameSlice.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await api.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

//! ==========================================================================
// !1. Создание экземпляра Axios
// Здесь создаётся новый экземпляр Axios с базовым
// URL https://connections-api.goit.global/.
// Это означает, что все запросы, отправленные через api,
// будут автоматически начинаться с этого URL.
// Экспорт api позволяет использовать этот экземпляр в других файлах.

//* export const api = axios.create({
//*  baseURL: 'https://connections-api.goit.global/',
//* });

// !2. Функция установки заголовка авторизации
// Эта функция принимает token (токен авторизации).
// Устанавливает заголовок Authorization для всех последующих запросов с этим токеном.
// Bearer ${token} — это стандартный формат для токенов JWT.
// Теперь все запросы через `api` будут отправлять этот токен в заголовке Authorization.

//* const setAuthHeader = (token) => {
//*  api.defaults.headers.common.Authorization = `Bearer ${token}`;
//*};

// !3. Функция очистки заголовка авторизации
// Эта функция просто удаляет токен из заголовка Authorization,
// делая последующие запросы неавторизованными.
// Теперь запросы через `api` не будут отправлять токен.

//* const clearAuthHeader = () => {
//* api.defaults.headers.common.Authorization = ``;
//* };

// ---------------------------------------------------------------------------
// !5.1. Создание асинхронного экшена
// *createAsyncThunk создаёт асинхронный экшен с названием 'auth/login'.
// *body — это объект с данными пользователя (например, { email, password }).
// *thunkAPI — объект с методами Redux Thunk (например, для обработки ошибок через rejectWithValue).
// !5.2. Отправка запроса на сервер
// *Отправляем POST-запрос на /users/login с переданным body.
// *api — это экземпляр Axios, созданный ранее.
// *data — это ответ сервера, обычно содержащий токен авторизации и информацию о пользователе.
// !5.3. Сохранение токена
// *После успешного входа в систему вызывается setAuthHeader(data.token).
// *Это устанавливает токен авторизации во все последующие запросы через api.
// !5.4. Возвращение данных
// *Если логин прошёл успешно, data возвращается и автоматически попадает в fulfilled-редьюсер в Redux.
// !5.5. Обработка ошибки
// *Если запрос не удался (например, неверный пароль), код попадает в catch.
// *rejectWithValue(error.message) передаёт сообщение об ошибке в rejected-редьюсер.

//! export const loginThunk = createAsyncThunk(
//!   'auth/login',
//!   async (body, thunkAPI) => {
//!     try {
//!       const { data } = await api.post('/users/login', body);
//!       setAuthHeader(data.token);
//!       return data;
//!     } catch (error) {
//!       return thunkAPI.rejectWithValue(error.message);
//!     }
//!   },
//! );
