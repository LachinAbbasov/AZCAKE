import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4756/api/users/register', {
        name,
        email,
        password,
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4756/api/users/login', {
        email,
        password,
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null, 
    token: null,
    status: 'idle', 
    error: null, 
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload; 
        state.token = action.payload.token; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to register';
      })
     
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload.user; 
        state.token = action.payload.token; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to login';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
