import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";

export default function SpendMoney() {
  const [listProducts, setListProducts] = useState([
    {
      id: uuidv4(),
      name: "Earthen Bottle",

      price: 48,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
      quantity: 1,
    },
    {
      id: uuidv4(),
      name: "Nomad Tumbler",

      price: 35,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
      quantity: 1,
    },
    {
      id: uuidv4(),
      name: "Focus Paper Refill",

      price: 89,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
      quantity: 1,
    },
    {
      id: uuidv4(),
      name: "Machined Mechanical Pencil",
      price: 35,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
      quantity: 1,
    },
  ]);

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItemCount(cartItemCount + 1); // Cập nhật số lượng sản phẩm trong giỏ hàng
  };

  useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
    setCartItemCount(0); // Đặt lại số lượng sản phẩm trong giỏ hàng
  };

  return (
    <>
      {showCart ? (
        <Cart cartItems={cartItems} handleClose={handleCloseCart} />
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 30, padding: "0 20px" }}>Shopping cart</h2>
        <i
          onClick={handleShowCart}
          style={{ fontSize: 30 }}
          className="fa-solid fa-cart-shopping"
        >
          {cartItemCount > 0 && (
            <span className="cart-item-count">{cartItemCount}</span>
          )}
        </i>
      </div>

      <div className="bg-white">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {listProducts.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price} $
              </p>
              <button
                type="button"
                className="d-button d-button-primary"
                style={{
                  backgroundColor: "green",
                  padding: "8px 12px",
                  borderRadius: 10,
                }}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
