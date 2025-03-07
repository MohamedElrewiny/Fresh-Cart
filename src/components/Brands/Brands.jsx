import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../loading/Loading";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { isLoading, data } = useQuery("brands", getBrands);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container py-2 fix-height">
          <h2 className="main-title">Brands</h2>
          <div className="row">
            {data?.data.data.map((brands) => (
              <div key={brands._id} className="col-lg-2 col-md-3 col-sm-6 my-2">
                <div className="product cursor-pointer rounded-1 py-3 px-2">
                  <img
                    src={brands.image}
                    className="w-100"
                    alt={brands.name}
                    height={200}
                  />
                  <p className="text-main text-center my-2">{brands.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
