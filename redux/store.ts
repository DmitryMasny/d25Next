import {createStore, applyMiddleware, Store} from 'redux';
// @ts-ignore
import {createWrapper, Context} from 'next-redux-wrapper';
// @ts-ignore
import {composeWithDevTools} from 'redux-devtools-extension';
// @ts-ignore
import thunk from 'redux-thunk';

import reducers from '@reducers/index';


// export interface State {
//     tick: string;
// }

export type State = any

// create a makeStore function
export const store: any = (context: Context) => createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(store, {debug: true});