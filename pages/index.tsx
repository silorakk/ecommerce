import IncentiveSection from "@/components/IncentiveSection";
import NewArrivals from "@/components/NewArrivals";
import { ProductCard } from "@/components/ProductCard";
import PromotionSection from "@/components/PromotionSection";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@prisma/client";

interface HomeProps {
  products: Product[];
}
export default function Home() {
  const products = useProducts();

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
              <ProductCard key={product.id} product={product} />
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
