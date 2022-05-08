import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export const AdminEditEmployerPage = () => {
    let headers = { "Authorization": localStorage.getItem("accessToken") }
    const { id } = useParams()

    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [companyMail, setCompanyMail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('Belgium');
    let navigate = useNavigate()
    const submitHandling = (data) => {
        data.preventDefault();
        axios.put(`http://localhost:7000/employer/${id}`, {
            contact_name: contactName[0].toUpperCase() + contactName.substring(1).toLowerCase(),
            name: companyName[0].toUpperCase() + companyName.substring(1).toLowerCase(),
            email: companyMail.toLowerCase(),
            address: companyAddress,
            password: password,
            country: country,
            role: "employer"
        }, { headers: headers }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/admin/companies")
            }
        }).catch((err) => {
            document.getElementById("existerror").hidden = false;
        })
    }

    useEffect(() => {
        document.title = "Payflip - Employers";
        const fetchItems = async () => {
            try {
                const url = `http://localhost:7000/employer/${id}`
                const response = await fetch(url, { headers: headers })
                const employer = await response.json()
                console.log(employer.data.name)
                setCompanyName(employer.data.name)
                setContactName(employer.data.user.name)
                setCompanyMail(employer.data.user.email)
                setCompanyAddress(employer.data.address)
                setCountry(employer.data.country)
            } catch (err) {

            }
        }

        (async () => await fetchItems())();
        (async () => await roleAuthentication())()
    }, [])

    const roleAuthentication = async () => {
        let roleUrl = "http://localhost:7000/auth/role";
        const roleResponse = await fetch(roleUrl, { headers: { "Authorization": localStorage.getItem("accessToken") } })
        const roleJson = await roleResponse.json();
        let newRole = roleJson.data;
        if (newRole != "admin") {
            signout();
        }
    }

    const signout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <>
            <div className="g-sidenav-show  bg-gray-100">
                <div className="backgroundimg">
                    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
                        id="sidenav-main">
                        <div className="sidenav-header">
                            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                                aria-hidden="true" id="iconSidenav"></i>
                            <a className="navbar-brand m-0" href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html"
                                target="_blank">
                                <img
                                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fproxy%2F0*kYj1aQljmDquuw7Z&f=1&nofb=1"
                                    className="navbar-brand-img h-100" alt="main_logo" />
                            </a>
                        </div>
                        <hr className="horizontal dark mt-0" />
                        <div className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100" id="sidenav-collapse-main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="hoverableitem nav-link" >
                                        <div
                                            className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-home" aria-hidden="true"></i>
                                        </div>
                                        <span className="nav-link-text ms-1">Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/benefits" className="hoverableitem nav-link">
                                        <div
                                            className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-trophy" aria-hidden="true"></i>
                                        </div>
                                        <span className="nav-link-text ms-1">Benefits</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/employees" className="hoverableitem nav-link">
                                        <div
                                            className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-users" aria-hidden="true"></i>
                                        </div>
                                        <span className="nav-link-text ms-1">Employees</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/companies" className="hoverableitem nav-link active">
                                        <div
                                            className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="fas fa-building selectedicon" aria-hidden="true"></i>
                                        </div>
                                        <span className="nav-link-text ms-1">Companies</span>
                                    </Link>
                                </li>
                                <li className="nav-item mt-3">
                                    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="hoverableitem nav-link">
                                        <div
                                            className="icon icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                        </div>
                                        <span className="nav-link-text ms-1">Sign Out</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
                        {/* <!-- Navbar --> */}
                        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
                            navbar-scroll="true">
                            <div className="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark">Admin</a></li>
                                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Companies</li>
                                    </ol>
                                    <h6 className="font-weight-bolder mb-0">Edit</h6>
                                </nav>
                                <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                    </div>
                                    <ul className="navbar-nav  justify-content-end">
                                        <li className="nav-item d-flex align-items-center">
                                            <Link to="/login" className="nav-link text-body font-weight-bold px-0">
                                                <i className="fa fa-user me-sm-1"></i>
                                                <span className="d-sm-inline d-none">Sign out</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* <!-- End Navbar --> */}
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                                    <div className="card z-index-0">
                                        <div className="extrashadow">
                                            <div className="card-header text-center pt-4">
                                                <h3 className="text-info">Edit {companyName}</h3>
                                            </div>
                                            <div className="card-body">
                                                <form className="formtext" onSubmit={submitHandling}>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" value={companyName} onChange={(answer) => { setCompanyName(answer.target.value) }} placeholder="Company Name"
                                                            aria-label="CompanyName" aria-describedby="email-addon" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" value={contactName} onChange={(answer) => { setContactName(answer.target.value) }} placeholder="Contact Name"
                                                            aria-label="ContactName" aria-describedby="email-addon" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="email" className="form-control" value={companyMail} onChange={(answer) => { setCompanyMail(answer.target.value) }} placeholder="Company Email"
                                                            aria-label="Email" aria-describedby="email-addon" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="text" className="form-control" value={companyAddress} onChange={(answer) => { setCompanyAddress(answer.target.value) }} placeholder="Company Address"
                                                            aria-label="Address" aria-describedby="email-addon" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <input type="password" className="form-control" value={password} onChange={(answer) => { setPassword(answer.target.value) }} placeholder="Password"
                                                            aria-label="Password" aria-describedby="password-addon" required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="country" className="text-bluepayflip">For which country do you want to register?</label>
                                                        <select className="form-control" id="country" aria-label="Country" value={country} onChange={(answer) => { setCountry(answer.target.value) }}>
                                                            <option value="Belgium">Belgium</option>
                                                            <option value="Slovenia">Slovenia</option>
                                                            <option value="Portugal">Portugal</option>
                                                        </select>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn bg-redpayflip text-white w-100 my-4 mb-2">Update information</button>
                                                    </div>
                                                    <p hidden="true" id="existerror" style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>Error while trying to update the information</p>
                                                </form>
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
                                                ©2022,
                                                Payflip
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                                <li className="nav-item">
                                                    <a href="https://en.payflip.be/team" className="nav-link text-muted" target="_blank">About
                                                        Us</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="https://en.payflip.be/blogs" className="nav-link text-muted" target="_blank">Blog</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="https://en.payflip.be/partners" className="nav-link pe-0 text-muted" target="_blank">Partners</a>
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
    )
}