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

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await api.get('/contacts');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

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

export const editContact = createAsyncThunk(
  'contact/editContact',
  async (body, thunkAPI) => {
    try {
      const { id, ...changeData } = body;
      const { data } = await api.patch(`/contacts/${id}`, changeData);

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
