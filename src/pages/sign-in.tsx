import { type GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { Button } from "~/components/ui/Button";
import { GoogleLogo } from "~/components/ui/Icons";

export default function SignIn() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl">Better Days</h1>
      <Button
        onClick={() => {
          signIn("google").catch(console.log);
        }}
        size="lg"
      >
        <GoogleLogo className="mr-2 h-6 w-6" />
        Sign in with Google
      </Button>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
