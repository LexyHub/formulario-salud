import faqData from "./faq.json";

export interface FAQ {
  title: string;
  content: string;
}

export const faqs: FAQ[] = faqData;
