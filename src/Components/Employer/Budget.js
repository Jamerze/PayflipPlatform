import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const EmployerBudgetPage = () => {
  let api_base_url = `${process.env.REACT_APP_API_BASE_URL}`;
  const url = api_base_url + "/budget";
  let headers = { Authorization: localStorage.getItem("accessToken") };
  let navigate = useNavigate();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    document.title = "Payflip - Budgets";
    const fetchItems = async () => {
      try {
        const response = await fetch(url, { headers: headers });
        const budgets = await response.json();
        setBudgetList(budgets.data);
      } catch (err) {}
    };

    (async () => await fetchItems())();
  }, []);

  const deleteBudget = (id) => {
    console.log(id.target.value);
    try {
      axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/budget/${id.target.value}`,
        { headers: headers }
      );
      window.location.reload();
    } catch (error) {
      console.log(`Budget with id ${id.target.value} couldn't be deleted.`);
    }
  };

  const addBudget = () => {
    navigate("/employer/budgets/add");
  };

  const editBudget = (id) => {
    navigate(`/employer/budgets/${id.target.value}`);
  };
  const [isActive, setActive] = useState("false");
  const handleSideBar = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div
        className={
          isActive
            ? "g-sidenav-pinned g-sidenav-show  bg-gray-100"
            : "g-sidenav-show  bg-gray-100"
        }
      >
        <div className="backgroundimg">
          <aside
            className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y bg-white"
            id="sidenav-main"
          >
            <div className="sidenav-header">
              <i
                className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true"
                id="iconSidenav"
              ></i>
              <a
                className="navbar-brand m-0"
                href="/employer/dashboard"
                target="_blank"
              >
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fproxy%2F0*kYj1aQljmDquuw7Z&f=1&nofb=1"
                  className="navbar-brand-img h-100"
                  alt="main_logo"
                />
              </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div
              className="collapse navbar-collapse  w-auto   "
              id="sidenav-collapse-main"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/employer/dashboard"
                    className="hoverableitem nav-link "
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-home " aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/benefits"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i
                        className="fas fa-shopping-cart"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <span className="nav-link-text ms-1">Benefits Shop</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/ourbenefits"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-trophy" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Our Benefits</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/employees"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fas fa-users" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Employees</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/budgets"
                    className="hoverableitem nav-link active"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i
                        className="fas fa-euro-sign selectedicon"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <span className="nav-link-text ms-1">Budgets</span>
                  </Link>
                </li>
                <li className="nav-item mt-3">
                  <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                    Account pages
                  </h6>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/updateProfile"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Update Profile</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/employer/updatePassword"
                    className="hoverableitem nav-link"
                  >
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Update Password</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="hoverableitem nav-link">
                    <div className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                    <span className="nav-link-text ms-1">Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <main className="main-content position-relative   ">
            {/* <!-- Navbar --> */}
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h4 className="font-weight-bolder mb-0">Budgets</h4>
                </nav>
                <div
                  className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                  id="navbar"
                >
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                  <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center">
                      <Link
                        to="/login"
                        className="nav-link text-body font-weight-bold px-0"
                      >
                        <i className="fa fa-user me-sm-1"></i>
                        <span className="d-sm-inline d-none">Sign out</span>
                      </Link>
                    </li>
                    <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                      <a
                        href="javascript:;"
                        onClick={handleSideBar}
                        class="nav-link text-body p-0"
                        id="iconNavbarSidenav"
                      >
                        <div class="sidenav-toggler-inner">
                          <i class="sidenav-toggler-line"></i>
                          <i class="sidenav-toggler-line"></i>
                          <i class="sidenav-toggler-line"></i>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* <!-- End Navbar --> */}
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0">
                      <div className="row">
                        <div class="col-12 text-end ">
                          <button
                            onClick={addBudget}
                            className="btn btn-link btn-info text-secondary text-white"
                          >
                            <a
                              className="fa fa-plus text-xs text-white"
                              data-bs-toggle="modal"
                            ></a>{" "}
                            <span class="ms-1">Add Budget</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center justify-content-center mb-0">
                          <thead>
                            <tr>
                              <th
                                className="
                            text-uppercase text-secondary text-sm text-center
                            font-weight-bolder
                            opacity-7
                          "
                              >
                                Amount
                              </th>
                              <th
                                className="
                            text-uppercase text-secondary text-sm text-center
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                              >
                                Budget Type
                              </th>
                              <th
                                className="
                            text-uppercase text-secondary text-sm text-center
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                              >
                                Employee Name
                              </th>
                              <th
                                className="
                            text-uppercase text-secondary text-sm text-center
                            font-weight-bolder
                            opacity-7
                            ps-2
                          "
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {budgetList && budgetList.length > 0 ? (
                              budgetList.map((budget) => (
                                <tr>
                                  <td>
                                    <p className="text-sm text-center font-weight-bold mb-0">
                                      {budget.amount}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-sm text-center font-weight-bold mb-0">
                                      {budget.budget_type}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-sm text-center font-weight-bold">
                                      {budget.employee_name}
                                    </p>
                                  </td>
                                  <td className="align-middle  text-center text-sm">
                                    <button
                                      onClick={editBudget}
                                      className="fas fa-edit btn btn-link text-secondary mb-0"
                                      style={{ marginRight: "10px" }}
                                      value={budget.id}
                                      title="Edit Budget"
                                    ></button>
                                    <button
                                      onClick={deleteBudget}
                                      className="fa fa-trash btn btn-link text-secondary mb-0"
                                      value={budget.id}
                                      title="Edit Budget"
                                    ></button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colspan="4" className="text-center">
                                  <div className="px-2 text-center">
                                    <div className="my-auto text-center">
                                      No Budget found
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="footer pt-3  ">
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                      <div className="copyright text-center text-sm text-muted text-lg-start">
                        ©2022, Payflip
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/team"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            About Us
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/blogs"
                            className="nav-link text-muted"
                            target="_blank"
                          >
                            Blog
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="https://en.payflip.be/partners"
                            className="nav-link pe-0 text-muted"
                            target="_blank"
                          >
                            Partners
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
