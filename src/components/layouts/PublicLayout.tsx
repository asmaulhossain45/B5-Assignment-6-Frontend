import { useCurrentUser } from "@/hooks/useCurrentUser";
import Loading from "@/pages/public/Loading";
import { Outlet } from "react-router";
import GuidedTour from "../common/GuidedTour";
import Footer from "./Footer";
import Header from "./Header";

const PublicLayout = () => {
  const { userLoading } = useCurrentUser();

  if (userLoading) return <Loading type="page" size="lg" />;

  return (
    <>
      <Header />
      <GuidedTour />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
