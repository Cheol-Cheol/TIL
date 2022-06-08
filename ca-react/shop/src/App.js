import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data";
import bg from "./img/bg.png";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Detail from "./routes/Detail";
import Cart from "./routes/Cart";
import { useQuery } from "react-query";
// 실시간 데이터가 중요하면 리액트 쿼리 9:22
function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [btn, setBtn] = useState(true);
  let [cnt, setCnt] = useState(2);
  let [loading, setLoading] = useState(false);

  // react query
  let result = useQuery(
    "작명",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
    { staleTime: 2000 }
  );

  // result.data - 성공 시
  // result.isLoading - 요청 중 (true 반환)
  // result.error - 실패 시

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("watched"))) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {result.isLoading ? "로딩중" : result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: `url(${bg})` }}
              ></div>
              {/* grid는 오리지널 부트스트랩 코드가 더 간단명료해서 사용했음 */}
              <div className="container">
                <div className="row">
                  {shoes.map((shoe, i) => {
                    return <Card shoe={shoe} i={i} key={i} />;
                  })}
                </div>
              </div>

              {btn ? (
                <button
                  onClick={() => {
                    setLoading(true);
                    axios
                      .get(
                        `https://codingapple1.github.io/shop/data${cnt}.json`
                      )
                      .then(({ data }) => {
                        setShoes([...shoes, ...data]);
                        setLoading(false);
                        if (cnt == 3) {
                          setCnt(cnt++);
                        } else setBtn(false);
                      })
                      .catch(() => {
                        console.log("실패함");
                      });
                  }}
                >
                  더보기
                </button>
              ) : null}

              {loading == true ? <h3>로딩중입니다...</h3> : null}
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>없는 페이지에요</div>} />
      </Routes>
    </div>
  );
}
function Card(props) {
  let navigate = useNavigate();

  return (
    <div
      className="col-md-4"
      onClick={() => {
        navigate(`/detail/${props.i}`);
      }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
        width="80%"
      />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </div>
  );
}
function About() {
  return (
    <div>
      <h4>회사정보페이지</h4>
      {/* Outlet : Nested Routes 들을 보여줄 구멍역할 */}
      <Outlet></Outlet>
    </div>
  );
}
export default App;
