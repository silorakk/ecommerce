import { CartContext, CartContextType } from "@/context/cartContext";
import { OrderWithProducts } from "@/types/prisma";
import { CheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Orders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<OrderWithProducts[]>([]);
  const { addItem } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders: { data: { orders: OrderWithProducts[] } } =
        await axios.get(`/api/orders?userId=${session?.user.id}`);
      setOrders(userOrders.data.orders);
    };
    if (session?.user.id) {
      fetchOrders();
    }
  }, [session?.user.id]);

  return (
    <div className="bg-white">
      <div className="mx-auto mt-12  max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Check the status of recent orders, manage returns, and download
            invoices.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-16 sm:space-y-24">
            {orders.map((order) => (
              <div key={order.id}>
                <h3 className="sr-only">
                  Order placed on{" "}
                  <time dateTime={order.createdAt.toString()}>
                    {order.createdAt.toString()}
                  </time>
                </h3>

                <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                  <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                    <div className="flex justify-between md:block">
                      <dt className="font-medium text-gray-900">
                        Order number
                      </dt>
                      <dd className="md:mt-1">{order.id}</dd>
                    </div>
                    <div className="flex justify-between pt-4 md:block md:pt-0">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="md:mt-1">
                        <time dateTime={order.createdAt.toString()}>
                          {
                            order.createdAt
                              .toLocaleString("en-GB")
                              .split("T")[0]
                          }
                        </time>
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                      <dt>Total amount</dt>
                      <dd className="md:mt-1">
                        £{(order.totalAmount ?? 0) / 100}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                    <Link
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                    >
                      View Order
                      <span className="sr-only">{order.id}</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                    >
                      View Invoice
                      <span className="sr-only">for order {order.id}</span>
                    </Link>
                  </div>
                </div>
                <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                  <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                    {order.ProductOrders &&
                      order.ProductOrders.map((productOrder) => (
                        <div
                          key={productOrder.product.id}
                          className="flex py-6 sm:py-10"
                        >
                          <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                            <div className="lg:flex-1">
                              <div className="sm:flex">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {productOrder.product.name}
                                  </h4>
                                  <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                                    {productOrder.product.description}
                                  </p>
                                </div>
                                <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">
                                  £
                                  {(
                                    (productOrder.product.price ?? 0) *
                                    productOrder.quantity
                                  ).toFixed(2)}
                                </p>
                              </div>
                              <p className="my-2 text-sm">
                                Qty: {productOrder.quantity}
                              </p>
                              <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                <Link
                                  href={`/product/${productOrder.product.id}`}
                                  className="text-indigo-600 hover:text-indigo-500"
                                >
                                  View Product
                                </Link>
                                <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                  <Link
                                    href="#"
                                    onClick={() =>
                                      addItem({
                                        product: productOrder.product,
                                        quantity: 1,
                                      })
                                    }
                                    className="text-indigo-600 hover:text-indigo-500"
                                  >
                                    Buy Again
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 font-medium">
                              {order.orderStatus === "Delivered" ? (
                                <div className="flex space-x-2">
                                  <CheckIcon
                                    className="h-6 w-6 flex-none text-green-500"
                                    aria-hidden="true"
                                  />
                                  <p>
                                    Delivered
                                    <span className="hidden sm:inline">
                                      {" "}
                                      on{" "}
                                      <time
                                        dateTime={order.createdAt.toISOString()}
                                      >
                                        {order.createdAt.toDateString()}
                                      </time>
                                    </span>
                                  </p>
                                </div>
                              ) : order.orderStatus === "OutForDelivery" ? (
                                <p>Out for delivery</p>
                              ) : order.orderStatus === "Cancelled" ? (
                                <p className="text-gray-500">Cancelled</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                            <img
                              src={productOrder.product.imageUrls[0]}
                              alt={productOrder.product.name}
                              className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
