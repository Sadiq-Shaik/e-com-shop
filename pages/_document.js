import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="">
      <Head />
      <body className="dark:bg-slate-800 dark:text-slate-200 min-h-screen">
        <Main />
        <div id="navPortal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
