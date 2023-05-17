import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

let HomeData = [
  {
    id: 1,
    title: "Home",
    path: "/home",
  },
  {
    id: 2,
    title: "About",
    path: "/about",
  },
  {
    id: 3,
    title: "Contact",
    path: "/contact",
  },
  {
    id: 4,
    title: "Login",
    path: "/auth/login",
  },
  {
    id: 5,
    title: "Logout",
    path: "/auth/logout",
  },
];

function Home() {
  const [data, setData] = useState(HomeData);
  return (
    // <>
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-12">
    //         <h1>Home</h1>
    //         <ul className="d-flex list-unstyled gap-3">
    //           {data.map((item) => (
    //             <li className="" key={item.id}>
    //               <Link className="text-decoration-none" to={item.path}>
    //                 {item.title}
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/Project">Project</Nav.Link>
            <NavDropdown title="Partners" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/partners/id?1">Partners 1</NavDropdown.Item>
              <NavDropdown.Item href="/partners/id?2">
              Partners 2
              </NavDropdown.Item>
              <NavDropdown.Item href="/partners/id?3">Partners 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/partners/id?4">
                Partners 4
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/auth/login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="/admin">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Home;
