import React from 'react';
import {wrapper} from 'redux/store';
import App, { AppInitialProps, AppContext } from "next/app";

import { getUser } from 'libs/user'
import { USER } from "@actionTypes/user";


class WrappedApp extends App<AppInitialProps> {
    public static getInitialProps = async ({ Component, ctx }: AppContext) => {

            const user = await getUser( ctx );

        // Keep in mind that this will be called twice on server, one for page and second for error page
        ctx.store.dispatch({
            type: USER.SET_DATA,
            payload: {
                token: user.token,
                role: user.role
            }
        });
        console.log('ctx.store', ctx.store)
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}),
                // Some custom thing for all pages
                path: ctx.pathname,
                user: user,
            }
        };
    };

    public render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(WrappedApp);