import {NextPage} from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { Header} from "../components/Header";

interface LayoutProps{
    children:NextPage | any;
}
export function Layout({children}:LayoutProps) {
    return(
        <>
        <Head>
            <title>Music - Player</title>
            <meta name="description" content="Listen and read you music" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
            {children}
        <Footer/>
        </>
    )
}