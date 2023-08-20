import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBusinessLogic = createAsyncThunk('data/BusinessLogic', async () => {
  const response = await fetch('/api/businessLogic');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const fetchSuppliers = createAsyncThunk('data/fetchSuppliers', async () => {
  const response = await fetch('/api/suppliers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const fetchIngredients = createAsyncThunk('data/fetchIngredients', async () => {
  const response = await fetch('/api/ingredients');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const fetchSalads = createAsyncThunk('data/fetchSalads', async () => {
  const response = await fetch('/api/salads');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

export const fetchSubscriptions = createAsyncThunk('data/fetchSubscriptions', async () => {
  const response = await fetch('/api/subscriptions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    businessLogic: [],
    suppliers: [],
    ingredients: [],
    salads: [],
    subscriptions: []
    // ... other initial state properties
  },
  reducers: {
    // ... other reducers
  },
  extraReducers: builder => {
    builder.addCase(fetchBusinessLogic.fulfilled, (state, action) => {
      state.businessLogic = action.payload;
    });
    builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
    builder.addCase(fetchSalads.fulfilled, (state, action) => {
      state.salads = action.payload;
    });
    builder.addCase(fetchSubscriptions.fulfilled, (state, action) => {
      state.subscriptions = action.payload;
    });
    // ... other cases
  },
});

export default dataSlice.reducer;
