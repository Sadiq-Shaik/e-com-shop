import { useSession } from "next-auth/react";
import Link from "next/link";

import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

import { useShoppingCart } from "../context/shoppingCartContext";

function Cart(props) {
  const { status } = useSession();

  const {
    cartState: { cartItems, totalAmount },
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
  } = useShoppingCart();

  console.log(cartItems);
  // console.log(localStorage.getItem("cartState"));

  if (status == "unauthenticated") {
    return (
      <div className="w-3/4 flex flex-col gap-4 mx-auto text-center my-4">
        <h2 className="text-xl">You must Login first</h2>
        <Link className="hover:underline text-xl" href="/login">
          Click here to navigate to login page
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-1/2 mx-auto my-4 p-3 rounded-lg bg-slate-200 dark:bg-slate-600">
      <h2 className="text-center text-lg mb-2">Your Shopping Cart</h2>
      {cartItems ? (
        <ul className="rounded-lg flex flex-col gap-3 items-center p-4">
          {cartItems.map((item, i) => (
            <li
              key={i}
              className="bg-slate-400 dark:bg-slate-800 p-4 rounded-lg flex flex-wrap justify-around items-center gap-4 w-full"
            >
              <img
                className="w-1/4 h-24 md:h-40 object-cover"
                src={item.image}
                alt={item.title}
              />
              <p className="flex flex-col gap-2">
                <span>{item.title}</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.price)}
                </span>
              </p>
              <p className="bg-slate-500 px-4 py-2 rounded-lg flex items-center gap-2">
                <button
                  onClick={() => {
                    decrementItemQuantity(item);
                  }}
                  className="active:outline rounded-lg text-3xl"
                >
                  <AiOutlineMinusSquare />
                </button>
                {item.quantity}
                <button
                  onClick={() => {
                    incrementItemQuantity(item);
                  }}
                  className="active:outline rounded-lg text-3xl"
                >
                  <AiOutlinePlusSquare />
                </button>
              </p>
              <button
                onClick={() => {
                  removeItem(item);
                }}
                className="bg-red-400 dark:bg-red-600 px-2 py-1 rounded-lg"
              >
                Remove this product
              </button>
            </li>
          ))}
          {totalAmount > 0 ? (
            <>
              <p className="text-xl w-fit bg-slate-400 dark:bg-slate-800 p-4 rounded-lg">
                Total:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(totalAmount)}
              </p>
              <button className="text-xl w-full md:w-1/4 bg-slate-400 dark:bg-slate-800 p-4 rounded-lg hover:-translate-y-0.5 active:outline active:translate-y-0.5">
                Pay now
              </button>
            </>
          ) : (
            <p className="text-center">
              is empty, please add to cart some products and comeback.
            </p>
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cart;
