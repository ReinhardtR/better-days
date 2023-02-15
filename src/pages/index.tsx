import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import { withAuth } from "~/server/auth";

const Home: NextPage = () => {
  return <Layout>yo</Layout>;
};

export const getServerSideProps = withAuth();

export default Home;
