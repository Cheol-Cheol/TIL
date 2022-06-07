import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseCnt(state, action) {
      let item = state.find((item) => item.id == action.payload);
      item.count++;
    },
    addCart(state, action) {
      state.push({ id: state.length, name: action.payload, count: 1 });
    },
  },
});
export let { increaseCnt, addCart } = cart.actions;

export default configureStore({
  reducer: {
    // state(slice)를 여기다 등록해야 사용할 수 있음
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
