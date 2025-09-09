'use client';

import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { contactData } from "@/data/contactData";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare
} from "lucide-react";

export default function ContactPage() {
  
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we&apos;ll respond within 24 hours",
      contact: contactData.email,
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our sourcing experts",
      contact: contactData.phone,
      action: "Call Now"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Chat with us instantly on WhatsApp",
      contact: contactData.whatsapp,
      action: "WhatsApp Chat"
    }
  ];

  const officeLocations = [
    {
      city: "Dhaka, Bangladesh",
      address: contactData.address,
      phone: contactData.phone,
      whatsapp: contactData.whatsapp,
      email: contactData.email,
      hours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
    }
  ];

  const quickLinks = [
    { title: "Request Quote", href: "/quote" },
    { title: "Our Services", href: "/services" },
    { title: "Product Categories", href: "/products" },
    { title: "About Us", href: "/about" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <PageHero
        badge="Contact Us"
        title="Get in Touch With Our Team"
        description="Ready to start your sourcing journey? Our expert team is here to help you find the right products at the right price with the right quality."
        backgroundImage="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        backgroundImageAlt="Professional business communication and team collaboration"
        primaryButton={{
          text: "Request Quote",
          href: "/quote"
        }}
        secondaryButton={{
          text: "Our Services",
          href: "/services"
        }}
        height="md"
        overlay="medium"
      />

      {/* Contact Methods */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              How Can We Help You?
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              Choose the most convenient way to reach out to our team of sourcing experts.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Heading level={4} className="heading-black mb-3">
                      {method.title}
                    </Heading>
                    <Text className="body-text-black-muted mb-4 text-center">
                      {method.description}
                    </Text>
                    <Text weight="semibold" className="body-text-black mb-4 text-center">
                      {method.contact}
                    </Text>
                    <Button className="appatex-gradient">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>


      {/* Contact Form & Office Info */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <Heading level={2} className="heading-black mb-4">
                Send Us a Message
              </Heading>
              <Text className="body-text-black-secondary">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </Text>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium body-text-black mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium body-text-black mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium body-text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium body-text-black mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium body-text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium body-text-black mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium body-text-black mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about your inquiry or requirements..."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full appatex-gradient">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Office Information */}
          <div className="space-y-6">
            <div>
              <Heading level={2} className="heading-black mb-4">
                Our Office
              </Heading>
              <Text className="body-text-black-secondary">
                Visit our office or get in touch with our team for personalized assistance.
              </Text>
            </div>
            
            <div className="space-y-6">
              {officeLocations.map((office, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <Text weight="semibold" className="body-text-black">{office.city}</Text>
                          <Text className="body-text-black-muted">{office.address}</Text>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <Text weight="semibold" className="body-text-black">Phone</Text>
                          <Text className="body-text-black-muted">{office.phone}</Text>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <Text weight="semibold" className="body-text-black">WhatsApp</Text>
                          <Text className="body-text-black-muted">{office.whatsapp}</Text>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <Text weight="semibold" className="body-text-black">Email</Text>
                          <Text className="body-text-black-muted">{office.email}</Text>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <Text weight="semibold" className="body-text-black">Business Hours</Text>
                          <Text className="body-text-black-muted">{office.hours}</Text>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="heading-black">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <a 
                        href={link.href}
                        className="body-text-black hover:text-primary transition-colors duration-200"
                      >
                        {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>

      {/* FAQ Section */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Frequently Asked Questions
            </Heading>
            <Text size="lg" className="body-text-black-secondary">
              Here are some common questions we receive from our clients.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Heading level={4} className="heading-black mb-3">
                  What is your minimum order quantity?
                </Heading>
                <Text className="body-text-black-muted">
                  We offer flexible MOQ options based on your specific requirements and product category. Contact us to discuss your needs.
                </Text>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Heading level={4} className="heading-black mb-3">
                  How long does the sourcing process take?
                </Heading>
                <Text className="body-text-black-muted">
                  The timeline varies depending on product complexity, but typically ranges from 2-8 weeks from initial consultation to delivery.
                </Text>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Heading level={4} className="heading-black mb-3">
                  Do you provide quality assurance?
                </Heading>
                <Text className="body-text-black-muted">
                  Yes, we have rigorous quality control processes including pre-production inspections, in-process checks, and final audits.
                </Text>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Heading level={4} className="heading-black mb-3">
                  Can you source custom products?
                </Heading>
                <Text className="body-text-black-muted">
                  Absolutely! We specialize in custom sourcing solutions tailored to your specific requirements and specifications.
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
    </div>
  );
}
