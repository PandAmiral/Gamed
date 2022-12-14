import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/utils.module.css";
import React from "react";
import Link from "next/link";

export default function Archive() {
    const gamesArchive = require("../public/data/archive.json");
    return (
        <Layout>
            <Head>
                <title>Gamed - Archive</title>
            </Head>
            <h1 className="text-2xl text-center">Archive</h1>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-6">
                    {gamesArchive.map((game) => (
                        <Link key={game.id} className="flex text-3xl bg-purple transition justify-center hover:shadow-solid-yellow duration-500" href={{ pathname: '/archive/[id]', query: { id: game.id } }} >
                            {game.id}
                        </Link>
                    ))}
                </div>
            </div>
        </Layout >
    );
}