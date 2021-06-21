import React, { FC } from 'react'
import styled, { createGlobalStyle } from "styled-components"
import Head from "next/head"

import Footer from "./modules/Footer"
import Header from "./modules/Header"
// import AdminBtn from "./elements/AdminBtn"
import ToTopBtn from "./elements/ToTopBtn"
// import Jivosite from "./elements/Jivosite"
// import ModalManager from "./modules/ModalManager"

import { seoDefault, ISeo } from "constants/seo"
import { COLORS, media } from "constants/styles"


interface Props {
    children: React.ReactNode;
    seo?: ISeo;
    user?: any;
}

/** Styles */
const Page = styled( 'div' )`
    flex: 1 0 auto;
    background-color: #ffffff;
    @media (${ media.xs }) {
        min-height: calc(100vh - 100px);
        padding-bottom: 20px;
    }
`;
const PageInner = styled( 'div' )`
    position: relative;
    max-width: 1280px;
    height: auto;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    @media (${ media.xs }) {
        padding: 10px 20px;
    }
`

const GlobalStyle = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`

/**
 * MainContainer
 */
const MainContainer = ( { children, seo, user }: Props ) => (
    <>
        <Head>
            <title>{ seo && seo.title || seoDefault.title }</title>
            <meta property="og:title" content={seo && seo.title || seoDefault.title} key="title" />
            <meta name="description" content={seo && seo.desc || seoDefault.desc} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="theme-color" content={COLORS.PRIMARY} />
            {/*<link rel="icon" sizes="192x192" href="/static/images/icons-192.png" />*/}
            {/*<link rel="apple-touch-icon" href="/static/images/icons-192.png" />*/}
            {/*<link rel="manifest" href="/manifest.json" />*/}
            <link rel="icon" href="../public/favicon.ico"/>
        </Head>
        {/*<Head>*/}
        {/*    <meta property="og:title" content="My new title" key="title" />*/}
        {/*</Head>*/}
        <GlobalStyle />

        {/*<AdminBtn />*/}
        <ToTopBtn />
        {/*<Jivosite />*/}
        {/*<ModalManager/>*/}

        <Header  user={user}/>


        <Page>
            <PageInner>
                { children }
            </PageInner>
        </Page>
        {/*<Footer />*/}
    </>
)

export default MainContainer