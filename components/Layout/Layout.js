import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useShoppingCart } from "../../context/shoppingCartContext";

function Layout(props) {
  const { children } = props;

  const { initializerLS } = useShoppingCart();

  useEffect(() => {
    initializerLS();
    console.log(JSON.parse(localStorage.getItem("cartState")));
  }, []);

  const ls = useRef(); //localStorage
  const htmlClass = useRef(); // document html class attribute
  const preference = useRef(); // ls preference
  // const matchMediaRef = useRef(); // window.matchMedia
  // const [matchMedia, setMatchMedia] = useState(
  //   // window.matchMedia("(prefers-color-scheme: dark")
  //   null
  // );

  // const [isDark, setIsDark] = useState(true);

  // useEffect(() => {
  //   ls = localStorage;
  //   htmlClass = document.documentElement.classList;
  //   // const preference = ls.theme;
  //   // console.log(preference);

  //   if (isDark) {
  //     htmlClass.add("dark");
  //   } else {
  //     htmlClass.remove("dark");
  //   }
  // });

  // function toggleDarkModeHandler() {
  //   if (isDark) {
  //     document.documentElement.classList.remove("dark");
  //     setIsDark(false);
  //   } else {
  //     document.documentElement.classList.add("dark");
  //     setIsDark(true);
  //   }
  // }

  // const [isLoadingTheme, setIsLoadingTheme] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const isDarkSys = useMediaQuery("(prefers-color-scheme: dark)");

  // initialize page theme
  useEffect(() => {
    ls.current = localStorage;
    htmlClass.current = document.documentElement.classList;
    preference.current = ls.current?.getItem("theme");
    // matchMediaRef.current = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;

    // setMatchMedia(window.matchMedia("(prefers-color-scheme: dark)"));

    // if (
    //   preference.current === "dark" ||
    //   (!("theme" in ls.current) && matchMedia.matches)
    // ) {
    //   htmlClass.current.add("dark");
    //   setIsDark(true);
    //   setIsLoadingTheme(false);
    // } else {
    //   htmlClass.current.remove("dark");
    //   setIsDark(false);
    //   setIsLoadingTheme(false);
    // }

    console.log("preference.current :>> ", preference.current);
    console.log("ls.current :>> ", "theme" in ls.current);
    console.log("isDarkSys :>> ", isDarkSys);

    if (
      preference.current === "dark" ||
      (!("theme" in ls.current) && isDarkSys)
    ) {
      //

      console.log("hi");

      htmlClass.current.add("dark");
      setIsDark(true);
      //
    } else {
      //
      htmlClass.current.remove("dark");
      setIsDark(false);
      //
    }
  }, [isDarkSys]);

  //
  function toggleDarkModeHandler() {
    if (isDark) {
      htmlClass.current.remove("dark");
      ls.current.setItem("theme", "light");
      setIsDark(false);
    } else {
      htmlClass.current.add("dark");
      ls.current.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  // if (isLoadingTheme) {
  //   return (
  //     <h1 className="flex items-center justify-center w-full">
  //       Loading... Please Wait
  //     </h1>
  //   );
  // } else {
  return (
    <>
      <Header isDark={isDark} toggleDark={toggleDarkModeHandler} />
      <main className="min-h-[85vh]">{children}</main>
      <Footer />
    </>
  );
}
// }

export default Layout;
