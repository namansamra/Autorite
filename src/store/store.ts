import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { persist, PersistOptions } from 'zustand/middleware';
import _ from 'lodash';

interface IGlobalStore {
  appState: {
    auth: null | any;
    userInfo: null | any;
    dashboard: null | any;
    payment: null | any;
    wordPressInfo: null | any;
    articleRows: null | any;
  };
  actions: {
    setUserInfo: (data: any) => void;
    setAuth: (data: any) => void;
    resetStore: () => void;
    setWordPressInfo: (data: any) => void;
    setArticleRows: (data: any) => void;
  };
}
const initialState = {
  auth: {
    isAuthorised: false,
    tokens: null,
  },
  dashboard: null,
  payment: null,
  userInfo: null,
  wordPressInfo: null,
  articleRows: [],
};
export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist(
      (set, get) => ({
        appState: initialState,
        actions: {
          setAuth(authData) {
            set(
              produce((state: IGlobalStore) => {
                state.appState.auth = authData;
              })
            );
          },
          setUserInfo(data) {
            set(
              produce((state: IGlobalStore) => {
                state.appState.userInfo = data;
              })
            );
          },
          setWordPressInfo(data) {
            set(
              produce((state: IGlobalStore) => {
                state.appState.wordPressInfo = data;
              })
            );
          },
          setArticleRows(data) {
            set(
              produce((state: IGlobalStore) => {
                state.appState.articleRows = data;
              })
            );
          },
          //we cannot refer initial state object here because zustand make changes in that to save state and it is then referenced to the current state
          resetStore() {
            set(
              produce((state: IGlobalStore) => {
                state.appState = {
                  auth: {
                    isAuthorised: false,
                    tokens: null,
                  },
                  dashboard: null,
                  payment: null,
                  userInfo: null,
                  wordPressInfo: null,
                  articleRows: [],
                };
              })
            );
          },
        },
      }),
      {
        name: 'zustand-store',
        version: 1,
        merge: (persistedState, currentState) =>
          _.merge(currentState, persistedState),
      }
    )
  )
);
