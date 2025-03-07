import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
import { logoutThunk } from '../auth/operations';

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const contactSlice = createSlice({
  name: 'contactNameSlice',
  initialState,
  // extraReducers Используется когда надо делать HTTP-запрос
  extraReducers: (builder) => {
    //! fetchContacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      //! addContact
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.contacts.loading = false;
      })

      //! logoutThunk
      // Когда logoutThunk успешно выполняется, глобальное состояние Redux для этого
      // slice сбрасывается в изначальное состояние (initialState),
      //  очищая данные, например, пользователя, токены и т. д.
      // .addCase(logoutThunk.fulfilled, () => initialState)

      .addCase(logoutThunk.fulfilled, (state) => {
        state.contacts.items = [];
        state.contacts.loading = false;
        state.contacts.error = null;
      })

      .addCase(addContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })

      //! deleteContact
      .addCase(deleteContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (item) => item.id !== action.payload,
        );
        state.contacts.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })

      //! editContact
      .addCase(editContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })

      .addCase(editContact.fulfilled, (state, action) => {
        const itemIndex = state.contacts.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (itemIndex !== -1) {
          state.contacts.items[itemIndex] = action.payload;
        }
        state.contacts.loading = false;
      })

      //.addCase(editContact.fulfilled, (state, action) => {
      //   state.contacts.items = state.contacts.items.map((item) =>
      //     item.id === action.payload.id ? action.payload : item,
      //   );
      //   state.contacts.loading = false;
      // })

      .addCase(editContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      });
  },
});

export const contactReducer = contactSlice.reducer;

//!=======================================================================

// 1. Створити початковий стан
// 2. Створити слайс
// 3. Дати йому імʼя
// 4. Передати йому стан
// 5. Прописати reducers: {}
// 6. Експортувати counterReducer = slice.reducer
// 7. Підключити в сторі новий слайс замість редьюсера старого
// 8. Додати функції у редюсерс
// 9. Експортувати екшени (наші маленькі фукнції з reducers) з slice.actions
// 10. Використати нові функції в компонентах вже імпортуючи їх з слайсу

//!=======================================================================

// Як переїхати на createAsyncThunk
// Створити файл todosOps
// Записати в нього налаштування аксіос
// axios.defaults.baseURL = 'https://67b37562392f4aa94fa74786.mockapi.io';
// Створити першу санку
// export const fetchData = createAsyncThunk('todos/fetchData', async (аргумент_1, аргумент_2) => {
//   try {
//      запит на сервер
//     const { data } = await axios.get(`/tasks`);
//     return data;
//   } catch (error) {
//     певернення помилки
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// аргумент_1 - body або інформація від компонента (новий контакт, айді для видалення або оновлюючі дані)
// аргумент_2 - набір інструментів (повернення помилок)
// В слайсі додати екстра редьюсери
// extraReducers: builder => {
//     builder
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(fetchData.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.payload;
//       })
//       .addCase(deleteTodo.fulfilled, (state, action) => {
//         state.items = state.items.filter(item => item.id !== action.payload);
//       })
//       .addCase(addTodo.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//       })
//       .addCase(editTodo.fulfilled, (state, action) => {
//         const item = state.items.find(item => item.id === action.payload.id);
//         item.todo = action.payload.todo;
//       });
//   },

// це допоможе нам синхронізувати дані між сервером і локальним клієнтом
// перехоплення будьяких інших екшенів з стороніх файлів
// В компоненті маємо викликати екшен через діспатч
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);
// це для нас ініціалізує запит на сервер - данні запишуться в стейт
// Повторити з наступними санками
