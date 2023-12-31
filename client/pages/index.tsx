import type { NextPage } from "next";
import Head from "next/head";
import Home from "../components/Home";

const App: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Killing Time</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Home />
    </div>
  );
};

export default App;
