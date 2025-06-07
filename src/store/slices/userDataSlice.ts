import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies()

type InitialState = {
    value: UserData | null;
}

const initialState: InitialState = {
    value: cookies.get('userData') || null
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
        state.value = action.payload;
        cookies.set('userData', action.payload, {
            path: '/'
        });
    },
    clearUserData: (state) => {
        state.value = null;
        cookies.remove('userData');
    },
    initializeFromCookies: (state) => {
        const userData = cookies.get('userData');
        if (userData) {
            state.value = userData;
        }
    }
  },
});

export const { setUserData, clearUserData, initializeFromCookies } = userDataSlice.actions;

export default userDataSlice.reducer;