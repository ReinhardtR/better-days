import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children?: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-1">{children}</main>
      <Footer />
    </>
  );
}
