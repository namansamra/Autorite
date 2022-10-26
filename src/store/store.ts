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
  };
  actions: {
    setUserInfo: (data: any) => void;
    setAuth: (data: any) => void;
    resetStore: () => void;
    setWordPressInfo: (data: any) => void;
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
          resetStore() {
            set(
              produce((state: IGlobalStore) => {
                state.appState = initialState;
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
