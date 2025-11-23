import { Card } from "@/components/ui/card";
import { Leaf, DollarSign, Award, Users, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We believe in reducing waste and giving shoes a second life. Every purchase helps reduce environmental impact.",
    },
    {
      icon: DollarSign,
      title: "Affordability",
      description: "Quality shouldn't break the bank. We offer premium second-hand shoes at prices everyone can afford.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Each shoe is carefully inspected and curated to ensure you get the best pre-loved footwear.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "By choosing second-hand, you're part of a growing community making sustainable fashion mainstream.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Authentic products, transparent pricing, and guaranteed satisfaction with every purchase.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Flexa</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We're on a mission to make sustainable fashion accessible to everyone.
            Every shoe has a story, and we're here to give them a second chapter.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            At Flexa, we believe that fashion shouldn't cost the earth. Our mission is to create
            a circular economy for footwear, where quality shoes get multiple lives and everyone
            has access to affordable, stylish options. We're not just selling shoes; we're
            building a movement towards sustainable consumption.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Flexa was born from a simple observation: too many quality shoes end up in landfills
              while people struggle to afford decent footwear. We saw an opportunity to bridge
              this gap and create value for everyone involved.
            </p>
            <p>
              What started as a small collection of second-hand sneakers has grown into a
              thriving marketplace featuring sneakers, formal shoes, and boots. Each item is
              carefully selected, cleaned, and quality-checked to ensure you get the best
              possible experience.
            </p>
            <p>
              Today, we're proud to be part of the sustainable fashion movement, helping
              thousands of customers make environmentally conscious choices without compromising
              on style or quality. Join us in giving shoes their second life – because they
              deserve it, and so does our planet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;