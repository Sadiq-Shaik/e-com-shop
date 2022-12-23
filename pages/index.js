import useSWR from "swr";
import Head from "next/head";
import FeaturedSection from "../components/Featured/Featured";
// import { useEffect } from "react";
import { useShoppingCart } from "../context/shoppingCartContext";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   return res.json();
// };

export default function Home(props) {
  const { products } = props;

  const { initializerLS } = useShoppingCart();

  // useEffect(() => {
  //   initializerLS();
  //   console.log(JSON.parse(localStorage.getItem("cartState")));
  // }, []);

  // const { data, error, isLoading } = useSWR(
  //   "https://dummyjson.com/products?limit=6",
  //   fetcher,
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   }
  // );

  // if (error) return <div>failed to load</div>;
  // if (isLoading)
  //   return (
  //     <div className="flex items-center justify-center text-3xl min-h-[80vh]">
  //       <p>loading...</p>
  //     </div>
  //   );

  // console.log(data);

  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="View 200 products from our collection"
        />
        <title>Welcome to Online Shop</title>
      </Head>
      <FeaturedSection products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://dummyjson.com/products?limit=6");

  const data = await response.json();

  // console.log(data);
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
  };
}
