import React, { useState } from "react";
import styled from "styled-components";
// import { Link } from "react-scroll";
import { Link as Anc } from "react-router-dom";
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import "./Navbar.css";

export default function TopNavbar() {
  const [sidebarOpen, toggleSidebar] = useState(false);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="header">
        <NavInner className="container flexSpaceCenter">
          <Anc className="pointer flexNullCenter" smooth={true} to={"/"}>
            <LogoIcon />
          </Anc>
          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter ">
            <li className="semiBold font1	 pointer hover nav-item ">
              <Anc style={{ padding: "10px 15px", color: "white" }} to="/">
                Home
              </Anc>
            </li>

            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                style={{ padding: "10px 15px", color: "white" }}
                to="/about"
                spy={true}
                smooth={true}
                offset={-80}
              >
                About
              </Anc>
            </li>
            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                style={{ padding: "10px 15px", color: "white" }}
                to="/track" // changing this to projects or health services
              >
                Trackers
              </Anc>
            </li>

            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                style={{ padding: "10px 15px", color: "white" }}
                to="/blog" // changing this to projects or health services
              >
                Blogs
              </Anc>
            </li>
            <li className="semiBold font15 pointer hover nav-item">
              <a
                style={{ padding: "10px 15px", color: "white" }}
                target="_blank"
                rel="noreferrer"
                href="https://buy.stripe.com/test_aEU8Ah9KibGmgGA146"
              >
                Donate
              </a>
            </li>

            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                activeclassName="active"
                style={{ padding: "10px 15px", color: "white" }}
                to="/contact"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Contact
              </Anc>
            </li>
            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                activeclassName="active"
                style={{ padding: "10px 15px", color: "white" }}
                to="/appointment"
                spy={true}
                smooth={true}
                offset={-80}
              >
                Appointments
              </Anc>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                to="/login"
                style={{
                  padding: "10px 20px 10px 0",
                }}
              >
                Log in
              </Anc>
            </li>
            <li className="semiBold font15 pointer hover nav-item">
              <Anc
                to="/signup"
                style={{
                  padding: "10px 20px 10px 0",
                }}
              >
                Sign Up
              </Anc>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
