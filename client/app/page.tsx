import Nav from "./(website)/Nav";
import Hero from "./(website)/Hero";
import FeaturesSection from "./(website)/FeaturesSection";
import HowItWorks from "./(website)/HowItWorks";
import Pricing from "./(website)/Pricing";
import CampaignManagerShowcase from "./(website)/CampaignManagerShowcase";
import TestimonialCarousel from "./(website)/Testimonials";
import FAQSection from "./(website)/FAQSection";
import FinalCTA from "./(website)/FinalCTA";
import Footer from "./(website)/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <Nav />
      {/* Hero Section */}
      <Hero />
      {/* Features Grid */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <Pricing />

      {/* Campaign Manager Showcase */}
      <CampaignManagerShowcase />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
