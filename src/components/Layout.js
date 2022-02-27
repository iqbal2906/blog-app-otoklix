import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Blogpost App</title>
    </Head>
    <Navbar />
    {children}
  </>
);
