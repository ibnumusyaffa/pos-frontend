import React from "react";
import "./styles/global.css";
import Product from "./components/Product";
import List from "./components/List";
import numberWithCommas from "./helpers/numberWithCommas";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 1,
          nama: "Ayam Goreng",
          harga: 10000,
        },
        {
          id: 2,
          nama: "Ayam Bakar",
          harga: 10000,
        },
        {
          id: 3,
          nama: "Esteh",
          harga: 10000,
        },
        {
          id: 4,
          nama: "Nasi",
          harga: 10000,
        },
        {
          id: 5,
          nama: "Nasi",
          harga: 10000,
        },
        {
          id: 6,
          nama: "Nasi",
          harga: 10000,
        },
        {
          id: 7,
          nama: "Esteh",
          harga: 10000,
        },
        {
          id: 8,
          nama: "Nasi",
          harga: 10000,
        },
        {
          id: 9,
          nama: "Nasi",
          harga: 10000,
        },
        {
          id: 10,
          nama: "Nasi",
          harga: 10000,
        },
      ],
      cart: [],
    };
  }

  onAddCart(product) {
    let isExist = this.state.cart.filter((item) => {
      return product.id == item.id;
    });

    if (isExist.length > 0) {
      let newCart = this.state.cart.map((item) => {
        if (item.id == product.id) {
          item.qty = item.qty + 1;
        }
        return item;
      });

      this.setState({ cart: newCart });
    } else {
      this.setState({
        cart: [...this.state.cart, { ...product, qty: 1 }],
      });
    }
  }

  render() {
    let total = 0;
    if (this.state.cart.length > 0) {
      total = this.state.cart
        .map((o) => o.harga * o.qty)
        .reduce((a, c) => a + c);
    }
    return (
      <div className="bg-gray-100 h-screen">
        <div className="flex justify-center h-full">
          <div className="w-2/3 flex mt-5">
            <div className="grid grid-cols-4 col-gap-3 row-gap-3    w-2/3 mr-5">
              {this.state.products.map((product) => {
                return (
                  <Product
                    onClick={() => this.onAddCart(product)}
                    data={product}
                  ></Product>
                );
              })}
            </div>
            <div className="w-1/3">
              <div className="flex justify-center items-center h-12 bg-blue-200 rounded">
                <div className="font-semibold text-lg text-blue-800">
                  New Customer
                </div>
              </div>

              <div className="mt-2 rounded bg-white h-64  border border-solid border-gray-300 p-5 overflow-y-auto">
                {this.state.cart.map((item) => {
                  return <List data={item}></List>;
                })}
                <div className="flex justify-between text-sm font-bold">
                  <div>Total</div>
                  <div>Rp {numberWithCommas(total)}</div>
                </div>
              </div>

              <div className="flex my-3">
                <button className="h-16 w-full bg-green-500 px-5 mr-1 rounded text-white">
                  Save Bill
                </button>
                <button className="h-16 w-full bg-green-500 px-5 ml-1 rounded text-white">
                  Bayar Bill
                </button>
              </div>
              <div className="bg-blue-700 h-16 rounded flex justify-center items-center">
                <div className="text-white text-2xl font-semibold">
                  Rp {numberWithCommas(total)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
