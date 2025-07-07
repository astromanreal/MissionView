
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Info, Phone, Twitter, Github, Instagram } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the MissionView team. Find our email, phone, and social media links here.',
};


export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-10">
        <Mail className="w-12 h-12 text-primary mr-6" />
        <div>
          <h1 className="text-4xl font-bold text-primary">Get In Touch</h1>
          <p className="text-lg text-muted-foreground">We'd love to hear from you. Here's how you can reach us.</p>
        </div>
      </div>
      
      <div className="flex justify-center">
          <Card className="w-full max-w-2xl shadow-xl border-primary/20">
              <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                      <Info className="w-7 h-7 mr-3 text-primary" />
                      Contact Information
                  </CardTitle>
                  <CardDescription>
                      For general inquiries, you can reach us through the following channels. We look forward to hearing from you!
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Direct Contact</h3>
                    <div className="space-y-5">
                      <div className="flex items-start">
                          <Mail className="w-6 h-6 mr-4 text-primary mt-1" />
                          <div>
                              <p className="text-base font-medium text-foreground">Email</p>
                              <a href="mailto:Astroman6569@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                  Astroman6569@gmail.com
                              </a>
                          </div>
                      </div>
                      <div className="flex items-start">
                          <Phone className="w-6 h-6 mr-4 text-primary mt-1" />
                           <div>
                              <p className="text-base font-medium text-foreground">Phone</p>
                              <a href="tel:+918102116569" className="text-muted-foreground hover:text-primary transition-colors">
                                  +91 8102116569
                              </a>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                    <p className="text-muted-foreground mb-4">
                        Stay up-to-date with our latest news and missions on social media.
                    </p>
                    <div className="flex space-x-4">
                        <Button variant="outline" size="icon" asChild title="MissionView on Twitter">
                          <a href="https://x.com/Sathyamsarthak" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild title="MissionView on GitHub">
                           <a href="https://github.com/astromanreal" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild title="MissionView on Instagram">
                           <a href="https://www.instagram.com/srishikharji/" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5" /></a>
                        </Button>
                    </div>
                  </div>
              </CardContent>
          </Card>
      </div>

    </div>
  );
}
