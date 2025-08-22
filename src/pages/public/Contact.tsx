import PageHeader from "@/components/public/common/PageHeader";
import ContactUs from "@/components/public/sections/ContactUs";

const Contact = () => {
  return (
    <>
      <PageHeader
        pageName="Contact Us"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        breadcrumb={["Home", "Contact"]}
      />

      <ContactUs />

      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6066.557626403969!2d-74.25246845251313!3d40.51332807661081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3ca9c5b51cf6f%3A0x1419d50a2b6c82aa!2s123%20Main%20St%2C%20Staten%20Island%2C%20NY%2010307%2C%20USA!5e0!3m2!1sen!2sbd!4v1755823930116!5m2!1sen!2sbd"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
};

export default Contact;
