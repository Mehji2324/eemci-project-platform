import Hero from '@/features/landing/Hero';
import StatsStrip from '@/features/landing/StatsStrip';
import SchoolsBlock from '@/features/landing/SchoolsBlock';
import ProgramsShowcase from '@/features/landing/ProgramsShowcase';
import WhyChoose from '@/features/landing/WhyChoose';
import Testimonials from '@/features/landing/Testimonials';
import Partners from '@/features/landing/Partners';
import CtaBand from '@/features/landing/CtaBand';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <SchoolsBlock />
      <ProgramsShowcase />
      <WhyChoose />
      <Testimonials />
      <Partners />
      <CtaBand />
    </>
  );
}
