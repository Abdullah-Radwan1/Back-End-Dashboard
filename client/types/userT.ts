export type user = {
 name: string;
 role: string;
};
export type Stat = {
 yearlySalesTotal: any;
 yearlyTotalSoldUnits: number;
};

export type Product = {
 _id: number;
 name: string;
 description: string;
 price: number;
 rating: number;
 category: string;
 supply: string;
 stat: Stat[];
};

// jsoooon
// {
//           "builds": [
//            {
//             "src": "package.json",
//             "use": "@vercel/next"
//            }
//           ],
//           "buildCommand": "tsc --noEmit && next build"
//          }
