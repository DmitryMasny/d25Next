// @ts-ignore
import nookies from 'nookies'
import { userAutoRegRequest } from "api/user";
import { getDataByToken } from 'libs/helpers'


let cc = 0
const nookiesOptions = {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
}

export const getUser = async ( ctx = null ) => {
    //получаем куки
    const cookies = ctx && nookies.get( ctx )
    //получаем jwt token
    let token: string = cookies?.token;
    console.log( 'token in cookie', token )
    // nookies.destroy(ctx, 'auth')
    if ( !token && !cc ) {
        cc++
console.log('cc',cc )
        const regResponse = await userAutoRegRequest();
        console.log( 'regResponse', regResponse )
        if ( regResponse.user_id && regResponse.token ) {
            // nookies.set( ctx, 'user_id', regResponse.user_id, nookiesOptions )
            nookies.set( ctx, 'token', regResponse.token, nookiesOptions )
            token =  regResponse.token
        } else {
            console.log( '-- Error! There is not user_id or token returned from server --' )
        }

    }

    return token ? getDataByToken(token) : null;
};