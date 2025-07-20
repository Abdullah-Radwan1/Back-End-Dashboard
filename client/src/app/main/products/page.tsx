"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Title from "@/app/components/Title";
import { useGetProductsQuery } from "../../../../redux/API/api";
import type { Product, Stat } from "../../../../types/userT";
import Loading from "@/app/loading";

// ⭐ Gold-colored stars with better spacing
const StarRating = ({ value }: { value: number }) => (
  <div className="flex gap-1 mt-2 mb-2 text-[#FFD700]">
    {" "}
    {/* Gold */}
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i}>{i < value ? "★" : "☆"}</span>
    ))}
  </div>
);

const ProductCard = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}: Product) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-card text-foreground border border-border rounded-2xl shadow hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 space-y-2">
        <p className="text-sm font-semibold text-primary">{category}</p>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-base font-semibold text-primary">
          ${Number(price).toFixed(2)}
        </p>
        <StarRating value={rating} />
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-4 pb-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "See More"}
        </Button>
      </CardFooter>

      {isExpanded && (
        <CardContent className="pt-0 px-4 pb-4 text-sm space-y-2">
          <p>
            <span className="font-medium text-foreground">ID:</span>{" "}
            <span className="text-muted-foreground">{_id}</span>
          </p>
          <p>
            <span className="font-medium text-foreground">Supply Left:</span>{" "}
            <span className="text-muted-foreground">{supply}</span>
          </p>
          {stat.map((statItem: Stat, index: number) => (
            <div key={index} className="pt-2 border-t border-border">
              <p className="text-muted-foreground">
                Yearly Sales: {statItem.yearlySalesTotal}
              </p>
              <p className="text-muted-foreground">
                Yearly Units Sold: {statItem.yearlyTotalSoldUnits}
              </p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);

  return (
    <div className="px-10 py-6">
      <Title title="PRODUCTS" subtitle="See your list of products." />

      {data || !isLoading ? (
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product: Product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      ) : (
        <div className="h-[75vh]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Products;
