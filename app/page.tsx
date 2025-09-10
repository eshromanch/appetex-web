import Hero01 from "@/components/hero-01/hero-01";
import Logos07Page from "@/components/logos-07/logos-07";
import Overview from "@/components/overview/overview";
import CategorySection from "@/components/category-section/category-section";
import ProvenProcesses from "@/components/proven-processes/proven-processes";
import CTA from "@/components/cta/cta";

export default function Home() {
  return (
    <main>
      <Hero01 />
      <Logos07Page type="client" />
      <Overview />
      <CategorySection />
      <div className="-mt-20">
      <Logos07Page type="partner" /> 
      </div>
      <ProvenProcesses />
      {/* <Testimonial04 /> */}
      <CTA />
    </main>
  );
}
