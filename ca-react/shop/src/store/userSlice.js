import { createSlice } from "@reduxjs/toolkit";

// useState용도, state하나를 slice라고 부름
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  // 1. reducers - state 수정
  reducers: {
    // state 변경함수를 action으로 부름
    changeName(state) {
      // state parameter - 기존 state 뜻함
      state.name = "park";
    },
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});
// 2. export할 함수
export let { changeName, increaseAge } = user.actions;

export default user;
