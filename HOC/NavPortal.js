// import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NavPortal = ({ openModal, children }) => {
  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setMounted(true);
  //     return () => setMounted(false);
  //   }, []);

  return openModal
    ? createPortal(children, document.querySelector("#navPortal"))
    : null;
};

export default NavPortal;
