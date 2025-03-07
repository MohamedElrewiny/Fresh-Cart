import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/Cart/CartContext";
import toast from "react-hot-toast";
import Loading from "../loading/Loading";

export default function FeaturedProducts() {
  let { addToCart } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("product successfully Added", {
        duration: 4000,
        position: "top-center",
      });
    } else {
      toast.error("Error adding product");
    }
  }

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data } = useQuery("featureProducts", getFeaturedProducts);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container py-2 fix-height">
          <h2 className=" main-title">Featured Products</h2>
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-lg-2 col-md-4 col-sm-6 my-2">
                <div className="product cursor-pointer py-3 px-2 rounded-1">
                  <Link to={`/productdetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      className="w-100"
                      alt={product.title}
                    />
                    <span className="text-main font-sm fw-bolder">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between mt-3">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
