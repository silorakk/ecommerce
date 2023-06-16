import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
// import Footer from './footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
