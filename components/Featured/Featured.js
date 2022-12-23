// import Image from "next/image";
// import { useEffect } from "react";
import { useShoppingCart } from "../../context/shoppingCartContext";

function FeaturedSection(props) {
  const { products } = props;

  const { cartState, incrementItemQuantity } = useShoppingCart();

  console.log(cartState);

  return (
    <section className="text-center my-8 md:my-16">
      <h3 className="text-xl md:text-3xl my-4 md:my-8">Featured Products</h3>
      <ul className=" md:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {products.map((el, i) => {
          return (
            <li
              className="w-3/4 mx-auto md:w-full bg-slate-300 dark:bg-slate-600 box rounded-lg p-4"
              key={i}
            >
              <div className="text-lg md:text-xl">{el.title}</div>

              <img
                className="rounded-lg mx-auto my-4 md:my-8 w-5/6 h-40 md:h-80 object-cover"
                src={el.images[0]}
              />
              <div className="md:text-xl tracking-wide">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format((el.price * 82).toFixed(2))}
              </div>
              <button
                onClick={() =>
                  incrementItemQuantity({
                    ...el,
                    price: Number((el.price * 82).toFixed(2)),
                  })
                }
                className="my-2 md:my-4 md:text-xl border-solid outline p-2 md:p-4 rounded-lg outline-slate-800 dark:outline-slate-200 hover:bg-slate-500"
              >
                Add to cart
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FeaturedSection;
