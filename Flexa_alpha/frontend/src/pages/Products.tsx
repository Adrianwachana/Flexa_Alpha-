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

// Feature items for the top section
const features = [
  {
    title: "Eco-Friendly",
    description: "All products are sustainably sourced to reduce waste.",
    icon: Leaf,
  },
  {
    title: "Great Quality",
    description: "Handpicked premium second-hand items.",
    icon: Award,
  },
  {
    title: "Affordable",
    description: "Get premium items at budget-friendly prices.",
    icon: ShoppingBag,
  },
  {
    title: "Loved by Customers",
    description: "Highly rated by thousands of happy buyers.",
    icon: Heart,
  },
];

export default function Products() {
  // Fetch products from backend API
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <Helmet>
        <title>Products | Flexa</title>
      </Helmet>

      {/* WHY CHOOSE FLEXA SECTION */}
      <section className="py-16 px-6 bg-[hsl(42,100%,96%)]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary-foreground">
            Why Choose Flexa?
          </h2>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT LISTING SECTION */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Latest Products</h2>

          {/* Loading, error, or product grid */}
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products!.map((product) => (
                <ProductItem key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
