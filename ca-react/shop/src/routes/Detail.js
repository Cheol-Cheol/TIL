import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

class Detail2 extends React.Component {
  componentDidMount() {
    // mount시 코드 실행
  }
  componentDidUpdate() {
    // update시 코드 실행
  }
  componentWillUnmount() {
    // unmount시 코드 실행
  }
}

function Detail(props) {
  // 실행시점을 적절하게 사용하기 위해 사용

  let [discount, setDiscount] = useState(true);
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let 찾은상품 = props.shoes.find((item) => item.id == id);
  let [입력값, 입력값변경] = useState("");

  useEffect(() => {
    let timer = setTimeout(() => {
      setDiscount(false);
    }, 2000);
    console.log(2);

    return () => {
      console.log(1);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(입력값)) {
      alert("숫자만 입력하세요");
    }
  }, [입력값]);

  return (
    <div className="container">
      {discount ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <input onChange={(e) => 입력값변경(e.target.value)} />
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
