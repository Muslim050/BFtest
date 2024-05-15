
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from '../utils/url'
import Cookies from 'js-cookie';

export const login = createAsyncThunk('auth/login', async ({ data }: {data:any}) => {
  try {
    const response = await axios.post(
      `${backendURL}/user/token`,
      {
        username: data.login,
        password: data.password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.status === 200) {
  return response.data
    } else {
      throw new Error('Ошибка при загрузке: некорректный статус ответа')
    }
  } catch (error:any) {
    console.log(error)
  }
})

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data) => {
    const token = localStorage.getItem('token')

    try {
      const response = await axios.put(
        `${backendURL}/user/change-password/${data.id}/`,
        {
          old_password: data.data.oldPassword,
          password: data.data.newPassword,
          password2: data.data.confirmPassword,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 200) {
return response.data
      }
    } catch (error) {
      console.log(error)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
    idPublisher: null,
    role: '',
  },
  reducers: {
    logout() {
      Cookies.remove('channelId');
      Cookies.remove('token');
      Cookies.remove('role');
      Cookies.remove('username');
      Cookies.remove('advertiser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.access
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
        Cookies.set('role', action.payload.data.role);
        Cookies.set('channelId', action.payload.data.id);
        Cookies.set('token', action.payload.data.access);
        Cookies.set('username', action.payload.data.username);
        Cookies.set('advertiser', action.payload.data.advertiser);

        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
          ? action.payload.message
          : 'Unknown error occurred.'
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      })
    // .addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.token = action.payload.token;
    //   localStorage.setItem("token", action.payload.data.access);
    // });
  },
})

export default authSlice.reducer
export const { logout } = authSlice.actions
