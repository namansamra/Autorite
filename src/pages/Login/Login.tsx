import Layout from '@/components/Layout/Layout';
import Sidebar from '@/components/Sidebar/SidebarV2';
import { Dashboard } from '@/navigation/path';
import { userLogin } from '@/services/common';
import { useGlobalStore } from '@/store/store';
import { loginValidationSchema } from '@/utils/validationSchema';
import { Alert, Button, Input } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';

const CustomFormError = (msg) => {
  return <span className="text-[8px] leading-[10px] text-red-500">{msg}</span>;
};

function Login() {
  const history = useHistory();
  const [setUserInfo, setAuth, userInfo] = useGlobalStore((state) => [
    state.actions.setUserInfo,
    state.actions.setAuth,
    state.appState.userInfo,
  ]);

  console.log(userInfo);

  const handleLogin = async (formValues) => {
    try {
      const { data } = await userLogin(formValues);
      const { user, tokens } = data;
      setAuth(tokens);
      if (user.isEmailVerified == 0) {
        console.log(history);
        history.push('/auth/verify-email');
        return;
      }
      setUserInfo(user);
      history.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    email: '',
    password: '',
  };
  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="flex w-2/5 flex-col items-center justify-center bg-primary-100 bg-[url('/SidebarHelpImage.png')] bg-no-repeat bg-cover"></div>
        <div className="flex w-3/5 bg-whiteSmoke">
          <div className="flex w-[80%] bg-white m-auto flex-col items-center justify-center py-16 rounded-xl shadow-2xl">
            <>
              <div className="flex w-[50%] flex-col">
                <div className="flex w-full flex-col">
                  <p className="mb-3 text-left text-2xl font-bold">Login</p>
                  <p className="mb-5 text-left text-xs text-grey">
                    Enter your credentials to proceed
                  </p>
                </div>
                <Formik
                  validationSchema={loginValidationSchema}
                  initialValues={initialValues}
                  onSubmit={handleLogin}
                >
                  {(props) => (
                    <Form>
                      <div className="flex w-full flex-col gap-2">
                        <Field name="email">
                          {({ field, form: { touched, errors } }) => {
                            return (
                              <div className="flex flex-col gap-[5px]">
                                <Input
                                  placeholder="Email"
                                  {...field}
                                  className="px-4 py-3"
                                />
                                <ErrorMessage
                                  name="email"
                                  render={CustomFormError}
                                />
                              </div>
                            );
                          }}
                        </Field>

                        <Field name="password">
                          {({ field, form: { touched, errors } }) => {
                            return (
                              <div className="flex flex-col gap-[5px]">
                                <Input
                                  name="password"
                                  placeholder="Password"
                                  {...field}
                                  className="px-4 py-3"
                                  type="password"
                                />
                                <ErrorMessage
                                  name="password"
                                  render={CustomFormError}
                                />
                              </div>
                            );
                          }}
                        </Field>
                      </div>
                      <Button
                        className="h-[44px] w-full py-3 bg-primary-500 text-white mt-6"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
            <div className="mt-4 mb-6 flex items-center justify-center">
              <p className="text-xs mr-2">New to AutoRite?</p>
              <p
                onClick={() => history?.push('/signup')}
                className="text-[12px] cursor-pointer font-semibold text-grey transition duration-200 ease-in-out"
              >
                Create Account
              </p>
              {/* |
              <a
                href="#!"
                className="text-[12px] font-size-14 font-semibold text-grey transition duration-200 ease-in-out"
              >
                Forgot password?
              </a> */}
            </div>
            <div className="flex items-center justify-center pl-3 pr-3 pb-6 text-xs">
              <p className="mb-0 mr-1">
                Having troubles logging in?
                <a
                  href="https://autorite.me/about-us/"
                  target="_blank"
                  rel="noreferrer"
                  className="pl-2 font-bold text-primary-1000"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
