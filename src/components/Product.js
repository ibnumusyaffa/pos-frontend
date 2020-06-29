import React from "react";
import numberWithCommas from "../helpers/numberWithCommas";
function Product(props) {
  return (
    <div
      onClick={props.onClick}
      className="bg-white border border-solid border-gray-300 flex flex-col rounded cursor-pointer"
      style={{ height: 200 }}
    >
      <div className="w-full bg-gray-600 h-32 flex justify-center items-center">
        <div className="font-bold text-3xl text-white">
          {props.data.nama.substring(0, 2)}
        </div>
      </div>
      <div className="p-4">{props.data.nama}</div>
    </div>
  );
}

export default Product;
