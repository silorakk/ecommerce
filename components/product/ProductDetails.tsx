export const ProductDetails = () => {
  return (
    <div className="mt-8 lg:col-span-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddToCart(product);
        }}
      >
        <button
          type="submit"
          disabled={itemInCart}
          className="disabled:cursor-not-allowed disabled:bg-gray-400 mt-8flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {itemInCart ? "Already in cart" : "Add to cart"}
        </button>
      </form>

      {/* Product details */}
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Description</h2>

        <p>{product?.description}</p>
      </div>

      {/* Policies */}
      <section aria-labelledby="policies-heading">
        <h2 id="policies-heading" className="sr-only">
          Our Policies
        </h2>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {policies.map((policy) => (
            <div
              key={policy.name}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
            >
              <dt>
                <policy.icon
                  className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="mt-4 text-sm font-medium text-gray-900">
                  {policy.name}
                </span>
              </dt>
              <dd className="mt-1 text-sm text-gray-500">
                {policy.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};
