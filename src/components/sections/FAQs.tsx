import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SectionHeading from "../common/SectionHeading";

import businessMan1 from "@/assets/images/Business_Man_1.jpg";
import AppSection from "../common/AppSection";

type Props = {
  bgColor?: boolean;
};

type TFaq = {
  question: string;
  answer: string;
};

const faqsData: TFaq[] = [
  {
    question: "What is a digital wallet?",
    answer:
      "A digital wallet is a secure online tool that allows you to store money, make payments, transfer funds, and manage transactions digitally without needing cash or physical cards.",
  },
  {
    question: "Is my money safe in a digital wallet?",
    answer:
      "Yes, your money is protected using encryption, authentication, and security protocols like OTP (One-Time Password) and biometric verification. Always ensure you use a verified and trusted wallet service.",
  },
  {
    question: "Can I send money to someone who doesn’t use the same wallet?",
    answer:
      "Yes, many digital wallets allow you to send money to other wallets, bank accounts, or even through mobile numbers — depending on the provider’s features.",
  },
  {
    question: "Do I need a bank account to use a digital wallet?",
    answer:
      "Not always. Some wallets let you load money through agents, gift cards, or other users. However, linking a bank account allows easier top-ups and withdrawals.",
  },
  {
    question: "Are there any fees for using a digital wallet?",
    answer:
      "Most basic services like receiving money are free, but certain transactions (like withdrawals, transfers, or international payments) may include small service charges.",
  },
];

const FAQs = ({ bgColor }: Props) => {
  return (
    <AppSection
      as="section"
      bgColor={bgColor}
      className="space-y-7 lg:space-y-14"
    >
      <SectionHeading
        title="Frequently Asked Questions"
        subtitle="FAQs"
        align="center"
      />

      <div className="lg:grid lg:grid-cols-3 lg:gap-14 items-center">
        <img src={businessMan1} alt="FAQs Image" className="hidden lg:block w-full h-full object-cover rounded-lg" />

        <Accordion
          type="single"
          collapsible
          className="lg:col-span-2 w-full"
          defaultValue="item-0"
        >
          {faqsData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AppSection>
  );
};

export default FAQs;
