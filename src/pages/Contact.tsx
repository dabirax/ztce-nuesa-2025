import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface ContactLead {
  name: string;
  role: string;
  phone: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactLeads: ContactLead[] = [
    {
      name: "Daudu Ayodeji (Adara)",
      role: "Conference Director",
      phone: "08105102245",
    },
    {
      name: "Olalekan Abobarin",
      role: "SW Coordinator",
      phone: "08029140541",
    },
    {
      name: "Eniwaye Marvelous",
      role: "Gen. Secretary",
      phone: "08148188127",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log("Contact Form Submitted:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about ZTCE 2025? Reach out to our team or send us a message
          </p>
        </div>

        {/* Contact Leads */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Event Leads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactLeads.map((lead, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground p-4 rounded-full mb-4">
                    <User size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {lead.name}
                  </h3>
                  <p className="text-sm text-secondary font-semibold mb-3">
                    {lead.role}
                  </p>
                  <a 
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">{lead.phone}</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll respond as soon as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="mt-1 min-h-[150px]"
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-primary-light"
              >
                <Mail className="mr-2" size={20} />
                Send Message
              </Button>
            </form>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Need Immediate Assistance?
            </h3>
            <p className="text-muted-foreground mb-4">
              For urgent inquiries, please call any of our event leads directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a 
                href="tel:08105102245"
                className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
              >
                <Phone size={16} />
                <span>Conference Director: 08105102245</span>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
