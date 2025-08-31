import { Link } from "react-router";
import { ChevronRight, Headset, Mail, MapPin, Phone } from "lucide-react";
import type { ElementType } from "react";
import Logo from "@/assets/brand/Logo.png";
import NewsletterImage from "@/assets/images/Business_Woman_1.jpg";
import { Button } from "../ui/button";
import AppSection from "../common/AppSection";

interface FooterLink {
  heading: string;
  links: { label: string; path: string; icon?: ElementType }[];
}

const footerLinks: FooterLink[] = [
  {
    heading: "Menu Links",
    links: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Features", path: "/features" },
      { label: "FAQ", path: "/faq" },
    ],
  },
  {
    heading: "Quick Links",
    links: [
      { label: "Pricing", path: "/pricing" },
      { label: "Cookie Policy", path: "/" },
      { label: "Privacy Policy", path: "/" },
      { label: "Terms & Conditions", path: "/" },
    ],
  },
  {
    heading: "Contact Info",
    links: [
      { label: "+1 (234) 567-8901", path: "tel:+12345678901", icon: Phone },
      { label: "+1 (234) 567-8902", path: "tel:+12345678902", icon: Headset },
      {
        label: "contact@wallex.com",
        path: "mailto:contact@wallex.com",
        icon: Mail,
      },
      {
        label: "123 Main Street, New York",
        path: "https://maps.google.com?q=123+Main+Street+New+York",
        icon: MapPin,
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t">
      <AppSection as="div" className="pt-14 lg:pt-28">
        <div className="bg-primary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-14 p-6 lg:p-10 rounded-xl">
          <img
            src={NewsletterImage}
            alt="Newsletter Image"
            className="w-full h-full object-cover rounded-lg"
          />

          <div className="lg:col-span-2 xl:col-span-3 flex flex-col justify-between gap-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-light">Join Millions of Satisfied Users!</h2>
            <p className="description text-light">Subscribe to our newsletter to get the latest updates.</p>

            <Link to={"/contact"} className="mt-4">
              <Button variant={"secondary"}>Subscribe</Button>
            </Link>
          </div>
        </div>
      </AppSection>

      <AppSection
        as="section"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8"
      >
        <div className="flex flex-col gap-6">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-10 w-auto" />
          </Link>

          <h3 className="text-2xl font-bold">Digital Wallet</h3>

          <p className="description max-w-96">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>

        {footerLinks.map((item, index) => (
          <div key={index} className="space-y-6">
            <h4 className="text-xl font-bold">{item.heading}</h4>

            <ul className="space-y-3">
              {item.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2"
                  >
                    <span className="text-primary">
                      {link.icon ? (
                        <link.icon size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                    <span className="description font-medium group-hover:text-primary transition-colors duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </AppSection>

      <div className="border-t py-3">
        <AppSection
          as="div"
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p>
            Copyright &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">Wallex.</span>
          </p>
          <p>All rights reserved</p>
        </AppSection>
      </div>
    </footer>
  );
};

export default Footer;
