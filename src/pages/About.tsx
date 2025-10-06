import { Card } from "@/components/ui/card";
import { Target, Users, Lightbulb, Rocket } from "lucide-react";
import nuesaLogo from "@/assets/nuesa-logo.jpg";

const About = () => {
  const goals = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Foster creative thinking and innovative solutions to engineering challenges",
    },
    {
      icon: Users,
      title: "Industry Connection",
      description: "Bridge the gap between academia and industry professionals",
    },
    {
      icon: Target,
      title: "Collaboration",
      description: "Create opportunities for cross-institutional partnerships and teamwork",
    },
    {
      icon: Rocket,
      title: "Skill Development",
      description: "Enhance technical and professional skills through workshops and seminars",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <img 
                src={nuesaLogo} 
                alt="NUESA Logo" 
                className="h-64 w-64 object-contain rounded-full shadow-2xl"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About NUESA Southwest Zone
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                The Nigerian Universities Engineering Students' Association (NUESA) Southwest Zone 
                is a premier organization dedicated to fostering academic excellence, professional 
                development, and innovation among engineering students across southwestern Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-white to-muted border-2 border-primary shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                2025 Conference Theme
              </h2>
              <p className="text-2xl md:text-3xl font-semibold text-secondary mb-6">
                Engineering Excellence: Bridging Innovation, Industry, and Impact
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                This theme emphasizes our commitment to creating a platform where innovative ideas 
                meet industry expertise, fostering solutions that create meaningful impact in our 
                society and beyond.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              About the Conference
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                The Zonal Technical Conference & Exhibition (ZTCE) 2025 is the flagship event 
                of NUESA Southwest Zone, bringing together engineering students, educators, and 
                industry professionals from across the region.
              </p>
              <p>
                This year's conference will feature technical paper presentations, project exhibitions, 
                workshops, seminars, and networking sessions designed to enhance the technical 
                competence and professional development of participants.
              </p>
              <p>
                ZTCE 2025 provides a unique platform for students to showcase their innovative 
                projects, learn from industry experts, and connect with peers who share their 
                passion for engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Conference Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-secondary to-secondary-light text-white p-4 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <goal.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Host Institution */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 border-2 border-primary">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
                Host Institution
              </h2>
              <h3 className="text-2xl font-semibold text-secondary mb-6 text-center">
                Federal University of Technology, Akure (FUTA)
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  The Federal University of Technology, Akure (FUTA) is one of Nigeria's premier 
                  technology-focused universities, renowned for its commitment to excellence in 
                  engineering education and research.
                </p>
                <p>
                  Located in Akure, Ondo State, FUTA provides an ideal setting for ZTCE 2025, 
                  with state-of-the-art facilities and a vibrant academic environment that 
                  perfectly aligns with our conference theme.
                </p>
                <p>
                  We are honored to partner with FUTA to bring you an exceptional conference 
                  experience that will inspire, educate, and connect the next generation of 
                  engineering leaders.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
