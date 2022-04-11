import { useState, useEffect } from 'react';
import Router from "next/router";
import Head from 'next/head';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Loader from '../Loader';

const Layout = ({children, title}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className='main-layout'>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Blog app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className="flex-grow-1">
        {
          loading ? (
            <Loader/>
          ) : (
            children
          )
        }
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;