import { createSlice } from '@reduxjs/toolkit';

// Початковий стан редюсера слайсу
const initialState = {
  filters: {
    name: '',
  },
};

const filterSlice = createSlice({
  name: 'filterNameSlice', // Ім'я слайсу
  initialState, // Початковий стан редюсера слайсу
  // Об'єкт case-редюсерів. Используется когда не надо делать HTTP-запрос
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { changeFilter } = filterSlice.actions;

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
//     // запит на сервер
//     const { data } = await axios.get(`/tasks`);
//     return data;
//   } catch (error) {
//    // певернення помилки
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
