import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import your custom CSS file
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import DashboardBlogCard from "../Sections/DashboardBlogCard";
import Modal from "../Modal/Modal";
import "../Sections/blogCard.css";
import { MdLocalHospital } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  const [CurrentUser, SetCurrentuser] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [idarr, setIdarr] = useState([]);
  const [size, setSize] = useState(0);

  const userActivity = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        SetCurrentuser(user);
      } else {
        navigate("/");
      }
    });
  };

  function getBlogs() {
    let blog = [];
    let ids = [];
    db.collection("blogs")
      .doc(auth.currentUser?.uid)
      .collection("blog")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doci) => {
          ids.push(doci.id);
          blog.push(doci.data());
        });
      });
    setSize(blog.length);
    setBlogs(blog);
    setIdarr(ids);
  }

  useEffect(() => {

    console.log(blogs)

    userActivity();
    return () => {
      SetCurrentuser({});
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Period Pixie | ${CurrentUser?.displayName} Dashboard`}</title>
      </Helmet>

      <a
        href="https://buy.stripe.com/test_aEU8Ah9KibGmgGA146"
        className="btn w-full btn-primary text-truncate rounded-0 border-0 position-relative"
        style={{ zIndex: "1000", background: "#E52F8A", marginTop: "0px" }}
      >
        <strong>Heya Pixir : : </strong> Let's contribute to the community
        donate now →
      </a>

      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
        <nav
          className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
          id="navbarVertical"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler ms-n2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarCollapse"
              aria-controls="sidebarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="brand-container">
              <img
                width={70}
                height={70}
                className="brand-logo"
                src={
                  CurrentUser.photoURL != null
                    ? CurrentUser?.photoURL
                    : "https://storage.googleapis.com/project-hackdata/Period%20Pixie-white-text.png"
                }
                alt="User Profile"
              />
              <span className="brand-name">{CurrentUser?.displayName}</span>
            </div>

            <div className="navbar-user d-lg-none">
              <div className="dropdown">
                <a
                  href="#"
                  id="sidebarAvatar"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="avatar-parent-child">
                    <img
                      alt="User Profile"
                      src={
                        CurrentUser.photoURL != null
                          ? CurrentUser?.photoURL
                          : "https://user-images.githubusercontent.com/86917304/189530487-4f2eba29-9268-4801-9f4f-b2a9b03948a1.png"
                      }
                      className="avatar avatar- rounded-circle"
                    />
                    <span className="avatar-child avatar-badge bg-success"></span>
                  </div>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="sidebarAvatar"
                >
                  <Link to="/dashboard" className="dropdown-item">
                    Home
                  </Link>
                  <Link to="/track" className="dropdown-item">
                    Period Tracker
                  </Link>
                  {/* <Link to="/moodtracker" className="dropdown-item">
                    Mood Tracker
                  </Link> */}
                  <Link to="/blogform" className="dropdown-item">
                    Blogs
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <hr className="dropdown-divider" />
                  <a
                    href="#"
                    onClick={() => auth.signOut()}
                    className="dropdown-item"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>

            <div className="collapse navbar-collapse" id="sidebarCollapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link bg-pink-200" to={"/dashboard"}>
                    <i className="bi bi-house"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogform">
                    <i className="bi bi-chat"></i> Blogs
                    <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">
                      {size}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/track">
                    <i className="bi bi-bookmarks"></i> Period Tracker
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/nearclinic"}>
                    <i className="bi bi-cart-plus"></i> Nearest Pharmacy
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/nearhospital"}>
                    <i className="bi bi-file-medical"></i> Nearest Hospital
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/moodybot"}>
                    <i className="bi bi-emoji-smile"></i> Moody Bot
                  </Link>
                </li>
              </ul>

              <hr className="navbar-divider my-5 opacity-20" />

              <ul className="navbar-nav mb-md-4">
                <li>
                  <div
                    onClick={() => console.log(blogs)}
                    className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide"
                    href="#"
                  >
                    Gynaecologists
                    {/* <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-4">
                      13
                    </span> */}
                  </div>
                </li>
                <li>
                  <a href="#" className="nav-link d-flex align-items-center">
                    <div className="me-4">
                      <div className="position-relative d-inline-block text-white">
                        <img
                          alt="Image Placeholder"
                          src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                          className="avatar rounded-circle"
                        />
                        <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block text-sm font-semibold">
                        Dr. Marie Claire
                      </span>
                      <span className="d-block text-xs text-muted font-regular">
                        Dr. Paris, FR
                      </span>
                    </div>
                    <div className="ms-auto">
                      <i className="bi bi-chat"></i>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link d-flex align-items-center">
                    <div className="me-4">
                      <div className="position-relative d-inline-block text-white">
                        <span className="avatar bg-soft-warning text-warning rounded-circle">
                          JW
                        </span>
                        <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block text-sm font-semibold">
                        Michael Jordan
                      </span>
                      <span className="d-block text-xs text-muted font-regular">
                        Bucharest, RO
                      </span>
                    </div>
                    <div className="ms-auto">
                      <i className="bi bi-chat"></i>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link d-flex align-items-center">
                    <div className="me-4">
                      <div className="position-relative d-inline-block text-white">
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1610899922902-c471ae684eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                          className="avatar rounded-circle"
                        />
                        <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-danger rounded-circle"></span>
                      </div>
                    </div>
                    <div>
                      <span className="d-block text-sm font-semibold">
                        Dr Heather Wright
                      </span>
                      <span className="d-block text-xs text-muted font-regular">
                        London, UK
                      </span>
                    </div>
                    <div className="ms-auto">
                      <i className="bi bi-chat"></i>
                    </div>
                  </a>
                </li>
              </ul>

              <div className="mt-auto"></div>

              <ul className="navbar-nav">
                <li
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => auth.signOut()}
                >
                  <a className="nav-link" href="#">
                    <i className="bi bi-box-arrow-left"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <header className="bg-surface-primary border-bottom pt-6">
            <div className="container-fluid">
              <div className="mb-npx">
                <div className="row align-items-center">
                  <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                    <h1
                      className="h2 mb-0 ls-tight"
                      style={{ color: "#5C60F5" }}
                    >{`Hello , ${CurrentUser?.displayName?.toLowerCase()}`}</h1>
                  </div>
                  <div className="col-sm-6 col-12 text-sm-end">
                    <div className="mx-n1">
                      <button
                        onClick={() => setOpenModel(true)}
                        className="btn d-inline-flex btn-sm btn-primary mx-1"
                        style={{
                          background: "#F65AA8",
                          color: "white",
                          border: "none",
                        }}
                      >
                        <span className="pe-2">
                          <i
                            className="bi bi-plus"
                            style={{ fontSize: "15px" }}
                          ></i>
                        </span>
                        <span>Create Reminder</span>
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="nav nav-tabs mt-4 overflow-x border-0">
                  <li className="nav-item ">
                    <a href="#" className="nav-link active">
                      All Stats
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <main className="py-6 bg-surface-secondary">
            <div className="container-fluid">
              <div className="row g-6 mb-6">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0 bg-pink-100">
                    <div className="card-body" >
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Sleeping Stats
                          </span>
                          <span className="h3 font-bold mb-0">5 Days</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                            <i className="bi bi-credit-card"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>13%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span> 
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0 bg-pink-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Blog Published
                          </span>
                          <span className="h3 font-bold mb-0">{size}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                            <i className="bi bi-people"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>2
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0 bg-pink-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Yoga Stats
                          </span>
                          <span className="h3 font-bold mb-0">2 Days</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                            <i className="bi bi-clock-history"></i>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-danger text-danger me-2">
                          <i className="bi bi-arrow-down me-1"></i>-5%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card shadow border-0 bg-pink-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            Upcoming Period
                          </span>
                          <span className="h3 font-bold mb-0">25</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                            <MdLocalHospital />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 mb-0 text-sm">
                        <span className="badge badge-pill bg-soft-success text-success me-2">
                          <i className="bi bi-arrow-up me-1"></i>10%
                        </span>
                        <span className="text-nowrap text-xs text-muted">
                          Since last month
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {openModel && <Modal setOpenModel={setOpenModel} />}
              <DashboardBlogCard setsize={setSize} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
