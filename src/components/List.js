import React from "react";
import numberWithCommas from "../helpers/numberWithCommas";
function List(props) {
  return (
    <div className="flex justify-between mb-2 text-sm">
      <div className="flex justify-between w-full mr-5">
        <div>{props.data.nama}</div>
        <div>x {props.data.qty}</div>
      </div>
      <div>{numberWithCommas(props.data.harga * props.data.qty)}</div>
    </div>
  );
}

export default List;
