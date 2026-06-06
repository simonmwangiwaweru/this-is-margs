import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | THIS IS MARGS",
  description: "Learn about THIS IS MARGS — a Kenyan-born health supplement brand built to make premium wellness accessible to every body.",
};

export default function AboutPage() {
  return <AboutClient />;
}
