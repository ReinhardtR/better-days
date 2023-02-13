import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "../utils/api";
import { ThemeProvider } from "next-themes";
import { Inter } from "@next/font/google";
import "../styles/globals.css";
import clsx from "clsx";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Better Days</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <SessionProvider session={session}>
          <div
            className={clsx(
              "flex min-h-screen flex-col font-sans",
              fontSans.variable
            )}
          >
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
