import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-slate-900 dark:text-slate-50 min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
