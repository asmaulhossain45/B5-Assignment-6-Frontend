import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "@/pages/public/Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const PublicLayout = () => {
  const { userLoading } = useCurrentUser();

  if (userLoading) return <Loading type="page" size="lg" />;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
