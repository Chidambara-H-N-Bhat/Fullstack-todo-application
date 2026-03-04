import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./services/api";


export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("todos/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching todos");
    }
  }
);


export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (title, { rejectWithValue }) => {
    try {
      const response = await api.post("todos/", { title });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating todo");
    }
  }
);


export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const response = await api.put(`todos/${id}/`, { title });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating todo");
    }
  }
);


export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`todos/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting todo");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo.id !== action.payload
        );
      });
  },
});

export default todoSlice.reducer;

