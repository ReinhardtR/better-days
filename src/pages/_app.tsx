import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "../utils/api";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "@next/font/google";

import "~/styles/globals.css";

const fontSans = FontSans({
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

      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
        }
      `}</style>

      <ThemeProvider attribute="class" disableTransitionOnChange>
        <SessionProvider session={session}>
          <div className="flex min-h-screen flex-col">
            <Component {...pageProps} />
          </div>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
