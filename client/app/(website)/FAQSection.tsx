import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about AutoGram
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              question:
                "Is AutoGram secure and compliant with Instagram's policies?",
              answer:
                "Yes, AutoGram uses Instagram's official Graph API and follows all platform guidelines. We implement secure JWT authentication and automatic token refresh to ensure your account remains safe and compliant.",
            },
            {
              question:
                "What happens if my automation fails or encounters errors?",
              answer:
                "Our system includes comprehensive error logging and webhook notifications. You'll receive instant alerts for any failures, and our detailed logs help you quickly identify and resolve issues.",
            },
            {
              question: "How does the token refresh system work?",
              answer:
                "AutoGram automatically manages your Instagram access tokens, refreshing them before expiration to ensure uninterrupted service. You'll never have to worry about manual token management.",
            },
            {
              question:
                "Can I customize the automation rules for different campaigns?",
              answer:
                "Our rule-based campaign manager allows you to create sophisticated automation workflows with custom keywords, responses, and triggers for each campaign.",
            },
            {
              question: "What kind of support do you provide?",
              answer:
                "We offer 24/7 technical support, comprehensive documentation, video tutorials, and a dedicated success manager for enterprise customers.",
            },
            {
              question: "How much does AutoGram cost?",
              answer:
                "We offer flexible pricing plans starting from $29/month for small businesses, with enterprise solutions available. All plans include a 14-day free trial with no credit card required.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
