import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import { AdminAddEmployerPage } from "./Components/Admin/AddEmployer";
import { AdminBenefits } from "./Components/Admin/Benefit";
import { AdminDash } from "./Components/Admin/Dashboard";
import { EmployerDash } from "./Components/Employer/Dashboard";
import { AdminEditEmployerPage } from "./Components/Admin/EditEmployer";
import { AdminEmployeesPage } from "./Components/Admin/Employee";
import { AdminEmployersPage } from "./Components/Admin/Employer";
import Login from "./Components/Login";
import { Signup } from './Components/Signup';
import { useEffect } from "react";
import { EmployerBenefitsPage } from "./Components/Employer/Benefit";
import { AuthenticationPage } from "./Components/BeingAuthenticated";
import { EmployerBenefitsAssigningPage } from "./Components/Employer/BenefitAssigning";
import { AdminAddEmployeePage } from "./Components/Admin/AddEmployee";
import { AdminEditEmployeePage } from "./Components/Admin/EditEmployee";
import { EmployerEmployeesPage } from "./Components/Employer/Employee";
import { EmployerAddEmployeePage } from "./Components/Employer/AddEmployee";
import { EmployerEditEmployeePage } from "./Components/Employer/EditEmployee";
import { EmployerSpecificBenefitsPage } from "./Components/Employer/CompanyBenefits";
import { EmployeeDash } from "./Components/Employee/Dashboard";
import { EmployeeSpecificBenefitsPage } from "./Components/Employee/EmployeeBenefits";
import { EmployeeBenefitsShoppingPage } from "./Components/Employee/Benefit";

function App() {
  let navigate = useNavigate()
  let validateurl = "http://localhost:7000/auth/validate";
  let refreshurl = "http://localhost:7000/auth/refreshToken";

  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("accessToken") != null) {
        const refreshTokens = async () => {
          try {
            let response = await fetch(validateurl, { headers: { "Authorization": localStorage.getItem("accessToken") } })
            let responseinjson = await response.json()
            if (responseinjson.message == "Authorized") {
              let newtokenresponse = await fetch(refreshurl, { headers: { "Authorization": localStorage.getItem("accessToken") } })
              let newtokenresponseinjson = await newtokenresponse.json();
              localStorage.setItem("accessToken", `Bearer ${newtokenresponseinjson.data.token.accessToken}`)
            }
            else {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("role");
            }
          } catch (err) {
            console.log(err)
          }
        }
        (async () => await refreshTokens())()
      }
    }, 14 * 60 * 1000);

    setInterval(() => {
      const authentication = async () => {
        if (localStorage.getItem("accessToken") != null) {
          let response = await fetch(validateurl, { headers: { "Authorization": localStorage.getItem("accessToken") } });
          let responseinjson = await response.json()
          if (responseinjson.message != "Authorized") {
            signout();
          }
        }
      }
      (async () => await authentication())();
    }, 5000);
  })

  const signout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Routes>
      if(tr)
      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='admin/dashboard' element={<AdminDash />}></Route>
      <Route path='admin/benefits' element={<AdminBenefits />}></Route>
      <Route path='admin/employees' element={<AdminEmployeesPage />}></Route>
      <Route path='admin/employees/add' element={<AdminAddEmployeePage />}></Route>
      <Route path='admin/employees/:id' element={<AdminEditEmployeePage />}></Route>
      <Route path='admin/companies' element={<AdminEmployersPage />}></Route>
      <Route path='admin/companies/add' element={<AdminAddEmployerPage />}></Route>
      <Route path='admin/companies/:id' element={<AdminEditEmployerPage />}></Route>

      <Route path='employer/dashboard' element={<EmployerDash />}></Route>
      <Route path='employer/benefits' element={<EmployerBenefitsPage />}></Route>
      <Route path='employer/ourbenefits' element={<EmployerSpecificBenefitsPage />}></Route>
      <Route path='employer/employees' element={<EmployerEmployeesPage />}></Route>
      <Route path='employer/employees/add' element={<EmployerAddEmployeePage />}></Route>
      <Route path='employer/employees/:id' element={<EmployerEditEmployeePage />}></Route>

      <Route path='employee/dashboard' element={<EmployeeDash />}></Route>
      <Route path='employee/benefits' element={<EmployeeBenefitsShoppingPage />}></Route>
      <Route path='employee/mybenefits' element={<EmployeeSpecificBenefitsPage />}></Route>
      <Route path='authentication' element={<AuthenticationPage />}></Route>
      <Route path='*' element={<Navigate to="/login" />}></Route>
    </Routes>
  );
}

export default App;
