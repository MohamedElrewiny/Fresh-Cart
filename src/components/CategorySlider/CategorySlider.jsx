import React from "react";
import Style from "./CategorySlider.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data } = useQuery("categoryslider", getCategories);

  return (
    <>
      <div className={Style.CategorySlider}>
        {data?.data.data ? (
          <>
            {" "}
            <h2 className="fs-5">Shop Popualr Category</h2>
            <Slider className=" mb-3" {...settings}>
              {data?.data.data.map((category) => {
                return (
                  <>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-100"
                      height={200}
                      key={category._id}
                    />
                    <h4 className="fs-6 py-1">{category.name}</h4>
                  </>
                );
              })}
            </Slider>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
