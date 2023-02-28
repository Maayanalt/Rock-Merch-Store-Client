import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, Form, Row, Spinner } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavbarComp from "./components/Navbar/NavbarComp";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import MyAccount from "./components/MyAccount/MyAccount";
import Overview from "./components/MyAccount/Overview";
import Orders from "./components/MyAccount/Orders/Orders";
import OrderDetails from "./components/MyAccount/Orders/OrderDetails";
import Checkout from "./components/Checkout/Checkout";
import AccountDetails from "./components/MyAccount/Details/AccountDetails";
import MyAddress from "./components/MyAccount/MyAddress";
import EditPage from "./components/MyAccount/Details/EditPage";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/forgotPassword";
import ResetPassword from "./components/ForgotPassword/resetPassword";
import About from "./components/About/About";
import Search from "./components/Search/Search";
import ModalContextProvider from "./components/ContextProviders/ModalContextProvider";
import { getCategories } from "./DAL/api";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const inputElement = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      setCategories(await getCategories());
    }

    getData();
  }, []);

  return (
    <div>
      {categories ? (
        <div className="d-flex flex-column" id="container">
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <header className="d-flex justify-content-between align-items-center px-4">
            <img src="/logo.png" id="logo" alt="logo" />
            <InputGroup id="search">
              <Form.Control
                ref={inputElement}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-search"
              />
              <Button
                variant="outline-secondary"
                className="shadow-none"
                id="button-search"
                onClick={() => {
                  navigate(`/search?q=${inputElement.current.value}`);
                }}
              >
                Search
              </Button>
            </InputGroup>
          </header>
          <NavbarComp></NavbarComp>
          <main>
            <Routes>
              <Route path="/" element={<HomePage categories={categories} />} />
              <Route
                path="/:type/:id"
                element={<HomePage categories={categories} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/wishlist"
                element={
                  <ModalContextProvider>
                    <Wishlist></Wishlist>
                  </ModalContextProvider>
                }
              />
              <Route path="/item/:id" element={<ProductDetails />} />
              <Route path="/my-account/*" element={<MyAccount />}>
                <Route index element={<Overview />}></Route>
                <Route path="orders" element={<Orders />}></Route>
                <Route path="order-details" element={<OrderDetails />}></Route>
                <Route
                  path="account-details"
                  element={<AccountDetails />}
                ></Route>
                <Route path="edit-page" element={<EditPage />}></Route>
                <Route path="my-address" element={<MyAddress />}></Route>
              </Route>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="mt-auto">
            <p>©2022 Built by Maayan Altarac</p>
          </footer>
        </div>
      ) : (
        <Row className="m-5 p-5 justify-content-center">
          <Spinner animation="border" className="spinner" />
        </Row>
      )}
    </div>
  );
}

export default App;
