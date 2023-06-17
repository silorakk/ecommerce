import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PromotionSection from "@/components/PromotionSection";
import NewArrivals from "@/components/NewArrivals";
import IncentiveSection from "@/components/IncentiveSection";
import Link from "next/link";

interface HomeProps {
  products: Product[];
}
export default function Home() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const json: { data: Product[] } = await res.json();
      const products = json.data;

      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <main className="mx-auto">
      <NewArrivals />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our products
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    £{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PromotionSection />
      <IncentiveSection />
    </main>
  );
}

// export const getServerSideProps: GetServerSideProps<{
//   products: Product[];
// }> = async () => {
//   const res = await import('')
//   const json: { data: Product[] } = await res.json();

//   return {
//     props: { products: json.data },
//   };
// };
