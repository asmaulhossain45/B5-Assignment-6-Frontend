import { lazy } from "react";

const Home = lazy(() => import("@/pages/public/Home"));
const About = lazy(() => import("@/pages/public/About"));
const Pricing = lazy(() => import("@/pages/public/Pricing"));
const Features = lazy(() => import("@/pages/public/Features"));
const FAQ = lazy(() => import("@/pages/public/FAQ"));
const Contact = lazy(() => import("@/pages/public/Contact"));

export const publicRoutes = [
  { index: true, Component: Home },
  { path: "about", Component: About },
  { path: "pricing", Component: Pricing },
  { path: "features", Component: Features },
  { path: "faq", Component: FAQ },
  { path: "contact", Component: Contact },
];
