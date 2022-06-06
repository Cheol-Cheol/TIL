import { configureStore, createSlice } from "@reduxjs/toolkit";

// useState용도, state하나를 slice라고 부름
let user = createSlice({
  name: "user",
  initialState: "kim",
  // 1. reducers - state 수정
  reducers: {
    changeName(state) {
      // state parameter - 기존 state 뜻함
      return "john " + state;
    },
  },
});

// 2. export할 함수
export let { changeName } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
});

export default configureStore({
  reducer: {
    // state(slice)를 여기다 등록해야 사용할 수 있음
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
