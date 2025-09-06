import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Marquee from "@/components/ui/marquee";
import { testimonials } from "@/data/testimonialsData";
import { Star } from "lucide-react";

const Testimonial04 = () => (
  <SectionContainer size="xl" padding="xl" background="muted">
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <Heading level={2} className="heading-black">
          What Our Clients Say
        </Heading>
        <Text size="lg" className="body-text-black-secondary text-center">
          Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about working with APPATEX.
        </Text>
      </div>

      {/* Testimonials */}
      <div className="relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-muted to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-muted to-transparent" />
        <Marquee pauseOnHover className="[--duration:20s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </SectionContainer>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-white rounded-xl p-6 shadow-lg border border-border"
    >
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-[17px] body-text-black mb-6 leading-relaxed">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="text-lg font-medium bg-primary text-primary-foreground">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold body-text-black">{testimonial.name}</p>
          <p className="text-sm body-text-black-muted">{testimonial.company}</p>
          <p className="text-xs body-text-black-muted">{testimonial.country}</p>
        </div>
      </div>
    </div>
  ));

export default Testimonial04;
