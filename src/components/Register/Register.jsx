import React, { useState } from "react";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import style from "./Register.module.css";

export default function Register() {
  let regExPhone = /^(002|\+2)?01[0125][0-9]{8}$/;
  let regExPassword = /^[A-Z][a-z0-9_@#$]{6,}$/;

  let validationSchema = YUP.object({
    name: YUP.string()
      .min(3, "Name minlength is 3")
      .max(32, "Name maxlength is 32")
      .required("Name is required"),
    email: YUP.string().required("Email is required"),
    phone: YUP.string()
      .matches(regExPhone, "Phone is invalid")
      .required("Phone is required"),
    password: YUP.string()
      .matches(regExPassword, " Enter 6-16 character")
      .required("Password is required"),
    rePassword: YUP.string()
      .oneOf([YUP.ref("password")], "Password and rePassword not matched")
      .matches()
      .required("rePassword is required"),
  });

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLodding, setisLodding] = useState(false);

  async function submitRegister(values) {
    setisLodding(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setisLodding(false);
        seterror(err.response.data.message);
      });
    if (data.message === "success") {
      setisLodding(false);
      navigate("/login");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <div className="fix-height py-5">
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <h2 className="mb-5 fw-bold text-main text-center">Register Now</h2>
        <form
          onSubmit={formik.handleSubmit}
          className={`${style.registerForm} w-50 mx-auto`}
        >
          <label htmlFor="name" className="fw-bold">
            Name :
          </label>
          <input
            placeholder="Enter Your Name"
            id="name"
            type="text"
            value={formik.values.name}
            name="name"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email" className="fw-bold">
            Email :
          </label>
          <input
            placeholder="anything@gmail.com"
            id="email"
            type="email"
            value={formik.values.email}
            name="email"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone" className="fw-bold">
            Phone :
          </label>
          <input
            placeholder="Ex: 01002007000"
            id="phone"
            type="tel"
            value={formik.values.phone}
            name="phone"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password" className="fw-bold">
            Password :
          </label>
          <input
            id="password"
            type="password"
            value={formik.values.password}
            name="password"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword" className="fw-bold">
            rePassword :
          </label>
          <input
            id="rePassword"
            type="password"
            value={formik.values.rePassword}
            name="rePassword"
            className="form-control mb-3 border-3 mt-1"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert mt-2 p-2 alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {isLodding ? (
            <button type="button" className="btn bg-main text-white mt-2">
              <RotatingLines
                strokeColor="white"
                strokeWidth="4"
                animationDuration="1"
                width="25"
                visible={true}
              />
            </button>
          ) : (
            <div className={`${style.btns} d-flex justify-content-between gap-3`}>
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white px-4 fw-bold"
              >
                Register
              </button>
              <div className="d-flex justify-content-center align-items-center">
                <p className="m-0">Already have an account?</p>{" "}
                <Link className="btn fs-6 text-main fw-bold" to={"/login"}>
                  Login
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
