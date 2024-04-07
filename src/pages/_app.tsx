// pages/_app.js
import React from "react";
import Layout from "@/components/Layout";
// import Error from "@/components/Error"
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ErrorBoundary fallback={"something wrong"}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default MyApp;
