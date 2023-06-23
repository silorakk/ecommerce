import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
// import Footer from './footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
