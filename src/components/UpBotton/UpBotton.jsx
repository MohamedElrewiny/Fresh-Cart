import React from "react";
import Style from "./UpBotton.module.css";

export default function UpBotton() {
  function upToTop() {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <button
        onClick={() => upToTop()}
        className={`${Style.UpBotton} fw-bold btn p-2 btn-success`}
      >
        <i class="fa-solid fa-arrow-up mx-1"></i>
      </button>
    </>
  );
}
