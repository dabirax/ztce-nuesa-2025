import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CountdownTimer from "@/components/CountdownTimer";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import eventPoster from "@/assets/event-poster.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Networking",
      description: "Connect with engineering students and industry professionals",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Showcase your projects and innovative solutions",
    },
    {
      icon: Calendar,
      title: "Workshops",
      description: "Attend technical workshops and masterclasses",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={eventPoster}
            alt="ZTCE 2025"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/70"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Engineering Excellence
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mb-4 font-medium">
              Bridging Innovation, Industry, and Impact
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/90 text-lg mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={24} />
                <span>November 19-22, 2025</span>
              </div>
              <div className="hidden md:block">•</div>
              <div className="flex items-center gap-2">
                <MapPin size={24} />
                <span>FUTA, Akure</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-12">
              #ZTCE2025
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-secondary hover:bg-secondary-light text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/register">Register Now</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <CountdownTimer />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Attend ZTCE 2025?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of engineering students for an unforgettable experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of the largest engineering students' gathering in Southwest Nigeria
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link to="/register">Register for ZTCE 2025</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
