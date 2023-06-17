import { Fragment, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useRouter as useNextRouter } from "next/router";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import CartSideMenu from "./CartSideMenu";
import { CartContext, CartContextType } from "@/context/cartContext";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Products", href: "#", current: false },
  { name: "Cart", href: "/cart", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const nextRouter = useNextRouter();
  const { isCartDisplayed, updateCartVisibility, items } = useContext(
    CartContext
  ) as CartContextType;

  const { data: session } = useSession();

  return (
    <>
      <CartSideMenu
        isDisplayed={isCartDisplayed}
        setIsDisplayed={updateCartVisibility}
      />
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                    <Link href="/">
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.href === nextRouter.asPath
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-700 hover:text-white ",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      {session?.user.role === "ADMIN" && (
                        <Link
                          key="admin"
                          href="/admin-dashboard"
                          className={classNames(
                            "/admin-dashboard" === nextRouter.asPath
                              ? "bg-gray-900 text-white"
                              : "text-gray-600 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={
                            "/admin-dashboard" === nextRouter.asPath
                              ? "page"
                              : undefined
                          }
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="mr-12"
                  onClick={() => updateCartVisibility(!isCartDisplayed)}
                >
                  <CartIcon itemsInCart={items.length > 0} />
                </button>
                {session?.user ? (
                  <div className="flex gap-4 items-center">
                    <p className="text-purple-600">{session.user.name}</p>
                    <button
                      onClick={() => signOut()}
                      className="px-4 py-2.5 text-sm font-semibold text-grey-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <a
                      className="cursor-pointer ml-2 p-2 text-gray-600 hover:text-gray-500"
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </a>
                    <a
                      className="cursor-pointer ml-2 p-2 text-gray-600 hover:text-gray-500"
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.href === nextRouter.asPath
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {session?.user.role === "ADMIN" && (
                  <Disclosure.Button
                    key="admin"
                    as={Link}
                    href="/admin-dashboard"
                    className={classNames(
                      "/admin-dashboard" === nextRouter.asPath
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      "/admin-dashboard" === nextRouter.asPath
                        ? "page"
                        : undefined
                    }
                  >
                    Dashboard
                  </Disclosure.Button>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
