"use client";
import React, { useState } from "react";
import {
 Box,
 Card,
 CardActions,
 CardContent,
 Collapse,
 Button,
 Typography,
 Rating,
 useTheme,
 useMediaQuery,
} from "@mui/material";
import Title from "../../../components/Title";
import { useGetProductsQuery } from "../../../redux/API/api";
import type { Product, Stat } from "../../../types/userT";

const Product = ({ _id, name, description, price, rating, category, supply, stat }: Product) => {
 const theme = useTheme();
 const [isExpanded, setIsExpanded] = useState(false);

 return (
  <Card
   sx={{
    backgroundImage: "none",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0.55rem",
   }}
  >
   <CardContent>
    <Typography sx={{ fontSize: 14 }} color={theme.palette.primary.main} gutterBottom>
     {category}
    </Typography>
    <Typography variant="h5" component="div">
     {name}
    </Typography>
    <Typography sx={{ mb: "1.5rem" }} color={theme.palette.primary.main}>
     ${Number(price).toFixed(2)}
    </Typography>
    <Rating value={rating} readOnly />

    <Typography variant="body2">{description}</Typography>
   </CardContent>
   <CardActions>
    <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>
     See More
    </Button>
   </CardActions>
   <Collapse
    in={isExpanded}
    timeout="auto"
    unmountOnExit
    sx={{
     color: theme.palette.primary.main,
    }}
   >
    <CardContent>
     <Typography>id: {_id}</Typography>
     <Typography>Supply Left: {supply}</Typography>
     {stat.map((statItem: Stat, index: number) => (
      <Box key={index} mt={2}>
       <Typography>Yearly Sales This Year: {statItem.yearlySalesTotal}</Typography>
       <Typography>Yearly Units Sold This Year: {statItem.yearlyTotalSoldUnits}</Typography>
      </Box>
     ))}
    </CardContent>
   </Collapse>
  </Card>
 );
};

const Products = () => {
 const { data, isLoading } = useGetProductsQuery(undefined);
 const isNonMobile = useMediaQuery("(min-width: 1000px)");

 return (
  <Box m="1.5rem 2.5rem">
   <Title title="PRODUCTS" subtitle="See your list of products." />
   {data || !isLoading ? (
    <Box
     mt="20px"
     display="grid"
     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
     justifyContent="space-between"
     rowGap="20px"
     columnGap="1.33%"
     sx={{
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
     }}
    >
     {data.map(({ _id, name, description, price, rating, category, supply, stat }: Product) => (
      <Product
       key={_id}
       _id={_id}
       name={name}
       description={description}
       price={price}
       rating={rating}
       category={category}
       supply={supply}
       stat={stat} // stat is passed as a prop here
      />
     ))}
    </Box>
   ) : (
    <div className="my-24 min-h-[80vh] flex justify-center items-center gap-4">
     loading...{" "}
     <div className="border-t-4  border-gray-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
   )}
  </Box>
 );
};

export default Products;
