import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HomeProps {
  products: Product[];
}
export default function Home() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addProduct = async () => {
    const res = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        imageUrl: imageUrl,
      }),
    });

    const json: { data: Product } = await res.json();

    setProducts([...products, json.data]);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const json: { data: Product[] } = await res.json();
      const products = json.data;

      setProducts(products);
    };

    getProducts();
  }, []);

  console.log(products);
  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h2 className=" mt-4 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center">
        Welcome, <span className="text-blue-500">{session?.user?.name}</span>
      </h2>

      <div>
        <div className="w-64 p-12">
          <h3 className="font-bold">Add product</h3>
          <div className="flex items-center justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6"
            >
              Name
            </label>
          </div>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6"
            >
              Description
            </label>
          </div>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium leading-6"
            >
              Image Url
            </label>
          </div>
          <div className="mt-2">
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="rounded-full mt-12 bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
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
