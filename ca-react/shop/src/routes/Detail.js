import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addCart } from "../store";
import { useDispatch } from "react-redux";

function Detail(props) {
  let { id } = useParams();
  let 찾은상품 = props.shoes.find((item) => item.id == id);
  let [탭, 탭변경] = useState(0);
  let [fade2, setFade2] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    setFade2("end");
    return () => {
      setFade2("");
    };
  }, []);

  useEffect(() => {
    let 꺼낸거 = JSON.parse(localStorage.getItem("watched"));
    꺼낸거.push(찾은상품.id);
    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);
    localStorage.setItem("watched", JSON.stringify(꺼낸거));
  }, []);

  return (
    <div className={`container ${fade2}`}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(addCart(찾은상품.title))}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => 탭변경(0)}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => 탭변경(1)}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => 탭변경(2)}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TapContent 탭={탭} />
    </div>
  );
}

// if문을 사용하기위한 컴포넌트 생성
function TapContent({ 탭 }) {
  // if (탭 == 0) return <div>내용0</div>;
  // else if (탭 == 1) return <div>내용1</div>;
  // else if (탭 == 2) return <div>내용2</div>;
  let [fade, setFade] = useState("");

  useEffect(() => {
    // React18 - automatic batching
    let a = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [탭]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
