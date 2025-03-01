import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../auth/operationsAuth';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async ({ signal }, thunkAPI) => {
    try {
      const { data } = await api.get(`/contacts`, { signal });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post('/contacts', body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/contacts/${id}`);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get('/contacts');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

export const editContact = createAsyncThunk(
  'contact/editTodo',
  async (body, thunkAPI) => {
    try {
      console.log('Current API headers:', api.defaults.headers.common);
      const { id, ...changeData } = body;

      // Проверяем отправляемые данные

      const { data } = await api.patch(`/contacts/${id}`, changeData);

      // console.log('Sending edit request:', body); // Проверяем, что передаем в API

      console.log('Edit response:', data);

      return data;
    } catch (error) {
      console.error('Edit error:', error.response?.data || error.message);
      console.error('Edit error:', error);

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
