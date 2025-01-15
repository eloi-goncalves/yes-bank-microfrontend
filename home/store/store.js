import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

// Export the store
export default store;
