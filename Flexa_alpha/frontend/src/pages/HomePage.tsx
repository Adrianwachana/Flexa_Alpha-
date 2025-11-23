import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingBag, Leaf, Heart, Award } from "lucide-react";
import { useGetProductsQuery } from "../hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const categories = [
    { name: "Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
    { name: "Formal", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500" },
    { name: "Boots", image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500" },
  ];

  const features = [
    { icon: Leaf, title: "Sustainable", description: "Reduce waste, embrace second-hand fashion" },
    { icon: ShoppingBag, title: "Affordable", description: "Quality shoes at unbeatable prices" },
    { icon: Heart, title: "Quality", description: "Carefully curated pre-loved shoes" },
    { icon: Award, title: "Trusted", description: "Authentic products, guaranteed satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Flexa — Shop Smart</title>
      </Helmet>

      {/* HERO — Background: light-light marigold, Button hover: dark marigold */}
      <section className="relative bg-[hsl(42,100%,96%)] text-secondary-foreground py-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Second Life. First Choice.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover sustainable fashion with our curated collection of second-hand shoes
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-[#d39f00] hover:text-primary-foreground"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} to={`/shop?category=${category.name}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold">{category.name}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — Background changed to light-light marigold */}
      <section className="py-16 px-6 bg-[hsl(42,100%,96%)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary-foreground">Why Choose Flexa?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Latest Products</h2>

          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products!.map((product) => (
                <ProductItem key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
