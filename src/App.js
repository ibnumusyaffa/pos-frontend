import React from "react";
import "./styles/global.css";
import Product from "./components/Product";
import List from "./components/List";
import numberWithCommas from "./helpers/numberWithCommas";
import axios from "axios";
let URL = "http://localhost:8000";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: [],
      status: "fetching",
    };
    this.onBayarBill = this.onBayarBill.bind(this);
    this.onSaveBill = this.onSaveBill.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  resetCart() {
    this.setState({
      cart: [],
    });
  }

  async fetchProducts() {
    try {
      let products = await axios.get(`${URL}/api/products`);
      this.setState({
        products: products.data.data,
        status: "idle",
      });
    } catch (error) {
      this.setState({
        status: "error",
      });
    }
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

  onSaveBill() {
    if (this.state.cart.length > 0) {
      this.resetCart();
      alert("Transaksi disimpan sementara");
    } else {
      alert("Produk Belum ada yang dipilih");
    }
  }

  onBayarBill() {
    if (this.state.cart.length > 0) {
      this.resetCart();
      alert("Transaksi Berhasil di input");
    } else {
      alert("Produk Belum ada yang dipilih");
    }
  }

  render() {
    let total = 0;
    if (this.state.cart.length > 0) {
      total = this.state.cart
        .map((o) => o.harga * o.qty)
        .reduce((a, c) => a + c);
    }

    let isFetching =
      this.state.products.length == 0 && this.state.status == "fetching";
    return (
      <div className="bg-gray-100 h-screen">
        <div className="flex justify-center h-full">
          <div className="w-2/3 flex mt-5">
            <div className="w-2/3">
              {!isFetching && (
                <div className="grid grid-cols-4 col-gap-3 row-gap-3     mr-5">
                  {this.state.products.map((product) => {
                    return (
                      <Product
                        key={product.id}
                        onClick={() => this.onAddCart(product)}
                        data={product}
                      ></Product>
                    );
                  })}
                </div>
              )}

              {isFetching && (
                <div className="flex justify-center items-center h-56">
                  <div>Mengambil data...</div>
                </div>
              )}
            </div>

            <div className="w-1/3">
              <div className="flex justify-center items-center h-12 bg-blue-200 rounded">
                <div className="font-semibold text-lg text-blue-800">
                  New Customer
                </div>
              </div>

              <div className="mt-2 rounded bg-white h-64  border border-solid border-gray-300 p-5 overflow-y-auto">
                {this.state.cart.map((item) => {
                  return <List key={item.id} data={item}></List>;
                })}
                <div className="flex justify-between text-sm font-bold">
                  <div>Total</div>
                  <div>Rp {numberWithCommas(total)}</div>
                </div>
              </div>

              <div className="flex my-3">
                <button
                  className="h-16 w-full bg-green-500 px-5 mr-1 rounded text-white"
                  onClick={this.onSaveBill}
                >
                  Save Bill
                </button>
                <button
                  className="h-16 w-full bg-green-500 px-5 ml-1 rounded text-white"
                  onClick={this.onBayarBill}
                >
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
