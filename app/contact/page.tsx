import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | THIS IS MARGS",
  description:
    "Get in touch with THIS IS MARGS. Chat on WhatsApp, send us a message, or visit our Nairobi shop. We're here to help with product advice, orders and more.",
};

export default function ContactPage() {
  return <ContactClient />;
}
