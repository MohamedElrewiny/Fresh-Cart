import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../loading/Loading";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { isLoading, data } = useQuery("category", getCategories);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container py-2 fix-height">
          <h2 className="main-title">Categories</h2>
          <div className="row">
            {data?.data.data.map((category) => (
              <div
                key={category._id}
                className="col-lg-2 col-md-3 col-sm-6 my-2"
              >
                <div className="product cursor-pointer  rounded-1 py-3 px-2">
                  <img
                    src={category.image}
                    className="w-100"
                    alt={category.name}
                    height={200}
                  />
                  <p className="text-main text-center my-2">{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
