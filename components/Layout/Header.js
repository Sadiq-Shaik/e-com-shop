import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavPortal from "../../HOC/NavPortal";

function Header(props) {
  const { toggleDark, isDark } = props;

  const { status } = useSession();

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: `${status === "authenticated" ? "Profile" : "Login"}`,
      path: `${status === "authenticated" ? "/profile" : "/login"}`,
    },
  ];

  const navLinks = links.map((el, i) => (
    <li key={i} className="hover:text-slate-500">
      <Link href={el.path}>{el.name}</Link>
    </li>
  ));

  const navToCart = (e) => {
    router.push("/cart");
  };

  const toggleNavModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <header className="w-full sticky py-8 top-0 z-10 bg-slate-400 dark:bg-slate-900">
      <section className="w-3/4 mx-auto flex justify-between">
        <Link href="/">
          <div className="dark:text-slate-200 text-xl md:text-3xl font-bold">
            Online Shop {isDark ? "🛒" : "💰"}
          </div>
        </Link>
        <nav className="flex items-center gap-4 md:gap-8">
          <ul className="hidden md:flex md:gap-8 text-xl">
            {/* {links.map((el, i) => (
              <li key={i} className="hover:text-slate-500">
                <Link href={el.path}>{el.name}</Link>
              </li>
            ))} */}
            {navLinks}
            {status === "authenticated" ? (
              <button
                className="text-xl hover:text-slate-600"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              ""
            )}
          </ul>
          {/* isLoggedin to cart link */}
          <button
            onClick={navToCart}
            className="text-sm md:text-xl hover:text-slate-500"
          >
            Cart
          </button>
          <button
            onClick={toggleNavModal}
            className="md:hidden text-lg md:text-xl hover:text-slate-500"
          >
            <GiHamburgerMenu />
          </button>

          {/* {status === "authenticated" ? (
            <button
              className="text-xl hover:text-slate-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            ""
          )} */}
        </nav>
        <button
          className="fixed text-sm md:text-base z-15 bottom-6 left-6 p-2 border-2 border-slate-700 dark:border-slate-300 bg-slate-300 dark:bg-slate-700 rounded-md"
          onClick={toggleDark}
        >
          Toggle Dark Mode
        </button>
      </section>
      <NavPortal openModal={openModal}>
        <ul className="fixed w-[25%] text-sm bg-slate-200 dark:bg-slate-700 top-16 right-4 p-2 rounded-lg text-center z-10 flex flex-col gap-3">
          {navLinks}
          {status === "authenticated" ? (
            <button
              className="text-sm hover:text-slate-600"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            ""
          )}
          <button
            className="bg-slate-400 dark:bg-slate-900 p-2 rounded-md my-text-slate-200 hover:bg-slate-500 hover:dark:bg-slate-800"
            onClick={toggleNavModal}
          >
            Close
          </button>
        </ul>
      </NavPortal>
    </header>
  );
}

export default Header;
