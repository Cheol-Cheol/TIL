import "./App.css";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import data from "./data";
import bg from "./img/bg.png";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

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
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
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
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* Nested Routes */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버 페이지</div>} />
          <Route path="location" element={<div>위치 페이지</div>} />
        </Route>
        <Route
          path="/event"
          element={
            <div>
              <h4>오늘의 이벤트</h4>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지에요</div>} />
      </Routes>
    </div>
  );
}
function Card(props) {
  return (
    <div className="col-md-4">
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
