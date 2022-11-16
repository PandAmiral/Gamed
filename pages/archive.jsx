import Head from "next/head";
import Layout from "../components/layout";
import styles from '../styles/utils.module.css';

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>Gamed - Archive</title>
            </Head>
            <h1 className="text-3xl text-center">
                Archive
            </h1>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-6">
                    <a class={styles.ctaAlt}>1</a>
                </div>
            </div>
        </Layout>
    );
}