
import AppSection from "../common/AppSection";
import SectionHeading from "../common/SectionHeading";
import ContactForm from "../forms/ContactForm";


type Props = {
  bgColor?: boolean;
};

const ContactUs = ({ bgColor }: Props) => {
  return (
    <AppSection as="section" bgColor={bgColor} className="space-y-7 lg:space-y-14">
      <SectionHeading
        title="Get in Touch for Support & Collaboration"
        subtitle="Contact Us"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <ContactForm bgColor={bgColor} />
    </AppSection>
  );
};

export default ContactUs;
