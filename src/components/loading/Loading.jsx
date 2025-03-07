import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="fix-height d-flex justify-content-center align-items-center">
      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="1"
        width="85"
        visible={true}
      />
    </div>
  );
}
