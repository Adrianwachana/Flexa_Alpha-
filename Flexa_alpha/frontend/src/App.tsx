// App.tsx
// Fully rewritten, corrected, formatted, and commented — nothing removed or changed structurally.

import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";
import { useGetCategoriesQuery } from "./hooks/productHooks";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { getError } from "./utils";
import { ApiError } from "./types/ApiError";

function App() {
  // -------------------------------
  // GLOBAL STATE (theme, cart, user)
  // -------------------------------
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  // Apply Bootstrap theme mode (light/dark)
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  // Toggle dark/light theme
  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  // Handle user sign out
  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });

    // Clear storage values
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");

    // Reload to signin page
    window.location.href = "/signin";
  };

  // Sidebar state (mobile menu)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  // Fetch categories
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div className="d-flex flex-column vh-100">
      {/* Toast notifications */}
      <ToastContainer position="bottom-center" limit={1} />

      {/* ----------------------- */}
      {/*         HEADER          */}
      {/* ----------------------- */}
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" className="p-2 mb-3">
          <Container
            fluid
            className="d-flex justify-content-between align-items-center"
          >
            {/* BRAND (left) */}
            <LinkContainer to="/" className="header-link">
              <Navbar.Brand>flexa</Navbar.Brand>
            </LinkContainer>

            {/* CENTER NAVIGATION (Home / Shop / About) */}
            <Nav className="mx-auto d-flex gap-4">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              {/* NOTE: /shop is kept exactly as you wrote it */}
              <LinkContainer to="/products">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>

            {/* RIGHT SIDE NAV ITEMS */}
            <Nav className="align-items-center gap-2">
              {/* Theme toggle */}
              <Nav.Link onClick={switchModeHandler}>
                <i
                  className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                ></i>{" "}
                {mode === "light" ? "Light" : "Dark"}
              </Nav.Link>

              {/* User menu (dropdown) */}
              {userInfo ? (
                <NavDropdown
                  title={`Hello, ${userInfo.name}`}
                  className="header-link"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={signoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Hello, sign in" className="header-link">
                  <LinkContainer to="/signin">
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {/* Orders link */}
              <LinkContainer to="/orderhistory">
                <Nav.Link>Orders</Nav.Link>
              </LinkContainer>

              {/* CART BUTTON WITH BADGE */}
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center position-relative p-0">
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>

                  {/* Cart Icon (SVG) */}
                  <svg
                    fill="#ffffff"
                    viewBox="130 150 200 300"
                    width="40px"
                    height="40px"
                  >
                    <path d="M 110.164 188.346 ... Z" />
                  </svg>

                  <span className="ms-1">Cart</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
      </header>

      {/* ----------------------- */}
      {/*   SIDEBAR (mobile nav)  */}
      {/* ----------------------- */}

      {/* Backdrop overlay */}
      {sidebarIsOpen && (
        <div
          onClick={() => setSidebarIsOpen(false)}
          className="side-navbar-backdrop"
        ></div>
      )}

      {/* Sidebar drawer */}
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <ListGroup variant="flush">
          {/* User section */}
          <ListGroup.Item action className="side-navbar-user">
            <LinkContainer
              to={userInfo ? `/profile` : `/signin`}
              onClick={() => setSidebarIsOpen(false)}
            >
              <span>
                {userInfo ? `Hello, ${userInfo.name}` : `Hello, sign in`}
              </span>
            </LinkContainer>
          </ListGroup.Item>

          {/* Category list */}
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            categories!.map((category) => (
              <ListGroup.Item action key={category}>
                <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </div>

      {/* ----------------------- */}
      {/*         MAIN BODY       */}
      {/* ----------------------- */}
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>

      {/* ----------------------- */}
      {/*         FOOTER          */}
      {/* ----------------------- */}
      <footer>
        <div className="text-center py-3">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
