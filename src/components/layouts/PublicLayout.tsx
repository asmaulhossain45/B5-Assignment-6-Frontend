import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
