// pages/_app.js
import React from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import "./globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ErrorBoundary fallback="something wrong">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default MyApp;
