import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// 3. import
import { increaseAge } from "../store/userSlice";
import { increaseCnt } from "../store";

function Cart() {
  // useSelector() - redux store 가져와줌 (등록된 state들)
  let state = useSelector((state) => state);
  // 4. store.js로 요청보내주는 함수
  let dispatch = useDispatch();
  return (
    <div>
      <h4>
        {state.user.name} {state.user.age}의 장바구니
      </h4>
      <button
        onClick={() => {
          dispatch(increaseAge(100));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      // changeName을 실행시켜달라고 store.js에 부탁
                      dispatch(increaseCnt(i));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
