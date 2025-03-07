import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { cartContext } from "../../context/Cart/CartContext";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  let { getLoggedUSerCart, removeCartItem, updataProductQuentity } =
    useContext(cartContext);

  async function updateCount(id, count) {
    let { data } = await updataProductQuentity(id, count);
    setcartDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setcartDetails(data);
  }

  async function getCart() {
    let { data } = await getLoggedUSerCart();
    setcartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      {cartDetails ? (
        <div className="container my-3 mx-auto p-3 bg-main-light">
          <h3>Shop Cart </h3>
          <h4 className="h6 text-main mb-2 fw-bold mt-2 ">
            Cart Item : {cartDetails.numOfCartItems}
          </h4>
          <h4 className="h6 text-main fw-bold mb-4">
            Total Cart Price : {cartDetails.data.totalCartPrice} EGP
          </h4>
          {cartDetails.data.products.map((product) => (
            <div
              className="row border-bottom p-2 d-flex align-items-center"
              key={product.product.id}
            >
              <div className="col-md-2">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt={product.name}
                />
              </div>
              <div className="col-md-10">
                <div
                  className={`d-flex justify-content-between align-items-center flex-wrap gap-3   `}
                >
                  <div>
                    <h3 className="h5 ">
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <h6 className="text-main m-0 h5">
                      Price : {product.price} EGP
                    </h6>
                  </div>
                  <div className={`d-flex align-items-center ${Style.counter}`}>
                    <button
                      onClick={() =>
                        updateCount(product.product.id, product.count + 1)
                      }
                      className="btn fw-bold fs-4 border-main px-2 py-0"
                    >
                      +
                    </button>
                    <span className="mx-2 px-2 fs-4">{product.count}</span>
                    <button
                      disabled={product.count === 1}
                      onClick={() =>
                        updateCount(product.product.id, product.count - 1)
                      }
                      className="btn fw-bold fs-4 border-main px-2 py-0"
                    >
                      -
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(product.product.id)}
                  className="btn p-0 fs-5 mt-2"
                >
                  <i className="text-danger fs-5 fas fa-trash-can me-2"></i>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Link
            to={"/address"}
            className="btn fw-bold my-3 w-100 bg-main  text-white"
          >
            Online Payment
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
