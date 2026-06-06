"use client";
import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const observe = () =>
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));

    observe();
    const t = setTimeout(observe, 200);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, []);

  return null;
}
