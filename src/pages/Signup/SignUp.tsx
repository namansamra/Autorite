import { useEffect, useState } from 'react';
import Alert from '@/components/Alert/index';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signUpValidationSchema } from '@/utils/validationSchema';
import { useHistory } from 'react-router-dom';
import { Button, Input, useToast } from '@chakra-ui/react';
import { userSignUp } from '@/services/common';
import { useGlobalStore } from '@/store/store';
import CustomFormError from '@/components/CustomFormError/CustomFormError';

const SignUp = () => {
  const initialValues = {
    name: '',
    email: '',
    // phone: '',
    password: '',
    // confirmPassword: '',
  };

  const history = useHistory();
  const toast = useToast();
  const [setUserInfo, setAuth] = useGlobalStore((state) => [
    state.actions.setUserInfo,
    state.actions.setAuth,
  ]);

  async function handleSignUp(formData) {
    console.log(formData);
    try {
      const { data } = await userSignUp(formData);
      const { tokens, user } = data;
      setAuth(tokens);
      history.push('/auth/verify-email');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-2/5 flex-col items-center justify-center bg-primary-100 bg-[url('/SidebarHelpImage.png')] bg-no-repeat bg-cover"></div>
      <div className="flex w-3/5 bg-whiteSmoke">
        <div className="flex flex-col  w-full items-center justify-center text-4xl font-bold">
          <img
            src="https://autorite.me/wp-content/themes/autorite/image/AUTORITE-footer.png"
            alt="autorite"
          />
          Comming Soon...
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-2/5 flex-col items-center justify-center bg-primary-100 bg-[url('/SidebarHelpImage.png')] bg-no-repeat bg-cover"></div>
      <div className="flex w-3/5 bg-whiteSmoke">
        <div className="flex w-[80%] bg-white m-auto flex-col items-center justify-center py-10 rounded-xl shadow-2xl">
          <div className="flex w-[50%] flex-col">
            <div className="flex w-full flex-col">
              <p className="mb-3 text-left text-2xl font-bold">Sign up</p>
              <p className="mb-5 text-left text-xs text-grey">
                Create your account log in information to use the <br />
                dashboard.
              </p>
            </div>
            <Formik
              validationSchema={signUpValidationSchema}
              initialValues={initialValues}
              onSubmit={handleSignUp}
            >
              {(props) => (
                <Form>
                  <div className="flex w-full flex-col gap-2">
                    <Field name="name">
                      {({ field, form: { touched, errors } }) => {
                        return (
                          <div className="flex flex-col gap-[5px]">
                            <Input
                              placeholder="Name"
                              {...field}
                              className="px-4 py-3"
                            />
                            <ErrorMessage
                              name="name"
                              render={CustomFormError}
                            />
                          </div>
                        );
                      }}
                    </Field>

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

                    {/* <Field name="phone">
                          {({ field, form }) => {
                            return (
                              <div className="flex flex-col gap-[5px]">
                                <Input
                                  placeholder="Phone Number"
                                  {...field}
                                  className="px-4 py-3"
                                />
                                <ErrorMessage
                                  name="phone"
                                  render={CustomFormError}
                                />
                              </div>
                            );
                          }}
                        </Field> */}

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
                    {/* <Field name="confirmPassword">
                          {({ field, form: { touched, errors } }) => {
                            return (
                              <div className="flex flex-col gap-[5px]">
                                <Input
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  {...field}
                                  className="px-4 py-3"
                                  type="password"
                                />
                                <ErrorMessage
                                  name="confirmPassword"
                                  render={CustomFormError}
                                />
                              </div>
                            );
                          }}
                        </Field> */}

                    <div className="mt-6 text-xs text-grey-600">
                      By Clicking Create account, you Agree to our
                      <a
                        href="https://autorite.me/terms/"
                        target="_blank"
                        rel="noreferrer"
                        className="pl-1 font-bold text-primary-1000"
                      >
                        Terms of Services{' '}
                      </a>
                      and
                      <a
                        href="https://autorite.me/terms/"
                        target="_blank"
                        rel="noreferrer"
                        className="pl-1 font-bold text-primary-1000"
                      >
                        Privacy Policy.
                      </a>
                    </div>
                  </div>
                  <Button
                    className="h-[44px] w-full py-3 bg-primary-500 text-white mt-6"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 flex flex-col items-center gap-6 text-center">
              <p
                className="cursor-pointer text-xs text-grey-600 hover:text-grey-900"
                onClick={() => history.push('/login')}
              >
                Already have an account?
              </p>
              <div className="flex items-center justify-between pl-3 pr-3 pb-6 text-center text-xs">
                <p className="mb-0 mr-1">
                  Having trouble in creating account?
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
      </div>
    </div>
  );
};

export default SignUp;
