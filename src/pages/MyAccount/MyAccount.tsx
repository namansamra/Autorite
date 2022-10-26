import { useGlobalStore } from '@/store/store';
import { Button, Input, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsWordpress } from 'react-icons/bs';
import { TbPlugConnected } from 'react-icons/tb';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaWordpressSimple } from 'react-icons/fa';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { wordPressConnectSchema } from '@/utils/validationSchema';
import CustomFormError from '@/components/CustomFormError/CustomFormError';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { CgMenuRound, CgProfile } from 'react-icons/cg';
import { SiQuantconnect } from 'react-icons/si';
import { connectWordpress } from '@/services/common';
import CustomToast from '@/components/Toast/Toast';
function MyAccount() {
  const userInfo = useGlobalStore((state) => state.appState.userInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const [wordpressStatus, setWordpressStatus] = useState('not-connected');
  const handleConnectWordpress = async (values) => {
    try {
      await connectWordpress(values);
      setWordpressStatus('connected');
    } catch (error: any) {
      const { response } = error;
      if (response.data) {
        const { message } = response.data;
        CustomToast({ title: message, status: 'error' });
      }
    }
  };

  const initialValues = {
    domain: '',
    username: '',
    password: '',
  };
  const actions = [
    {
      title: 'Profile',
      step: 0,
      icon: () => <CgProfile className="text-md text-grey-500 mr-2" />,
    },
    {
      title: 'App Integration',
      step: 1,
      icon: () => <SiQuantconnect className="text-md text-grey-500 mr-2" />,
    },
  ];
  return (
    <div className="w-full  h-screen bg-grey-200 text-grey-800">
      <div className="w-full h-full flex flex-col gap-5 p-4">
        <h1 className="font-bold text-3xl">User Info</h1>
        <div className="flex p-4 gap-10">
          <div className="flex flex-col gap-2 w-[300px] h-max p-4 bg-white shadow-md rounded-lg">
            {actions.map((action, i) => (
              <div
                key={action.title}
                className={` flex items-center p-2.5 text-md font-semibold text-grey-600 cursor-pointer rounded-sm ${
                  step == action.step ? 'bg-primary-50' : ''
                }`}
                onClick={() => setStep(action.step)}
              >
                {action.icon()} {action.title}
              </div>
            ))}
          </div>
          <div className="w-full h-full p-4 bg-white shadow-md rounded-lg">
            {step == 0 ? (
              <div className="flex gap-20 p-10">
                <div className="flex items-center justify-center  bg-primary-100 border-[2px] border-primary-400 min-h-[200px] min-w-[200px] rounded-full text-primary-900 text-6xl font-medium uppercase shadow-lg">
                  {userInfo?.name?.substring(0, 1)}
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex gap-10 items-center text-lg">
                    <div className="font-bold min-w-[100px]">Name</div>
                    <div>{userInfo?.name}</div>
                  </div>
                  <div className="flex gap-10 items-center text-lg">
                    <div className="font-bold min-w-[100px]">Email</div>
                    <div>{userInfo?.email}</div>
                  </div>
                  <div className="flex gap-10 items-center text-lg">
                    <div className="font-bold min-w-[100px]">Role</div>
                    <div>{userInfo?.role}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 justify-center">
                <div className="flex flex-col items-center w-[300px] shadow-xl p-5 py-8 my-5 gap-4 rounded-md bg-grey-100">
                  <BsWordpress className="h-[200px] w-[200px] text-grey-400" />
                  <Button
                    variant={'primary'}
                    rightIcon={<TbPlugConnected />}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Connect Wordpress
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader className="flex items-center gap-2">
                        Connect your Wordpress <FaWordpressSimple />
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        {wordpressStatus == 'not-connected' ? (
                          <Formik
                            validationSchema={wordPressConnectSchema}
                            initialValues={initialValues}
                            onSubmit={handleConnectWordpress}
                          >
                            {(props) => (
                              <Form>
                                <div className="flex w-full flex-col gap-2">
                                  <Field name="domain">
                                    {({ field, form: { touched, errors } }) => {
                                      return (
                                        <div className="flex flex-col gap-[5px]">
                                          <Input
                                            placeholder="Wordpress Site Address"
                                            {...field}
                                            className="px-4 py-3"
                                          />
                                          <ErrorMessage
                                            name="domain"
                                            render={CustomFormError}
                                          />
                                        </div>
                                      );
                                    }}
                                  </Field>

                                  <Field name="username">
                                    {({ field, form: { touched, errors } }) => {
                                      return (
                                        <div className="flex flex-col gap-[5px]">
                                          <Input
                                            placeholder="Username"
                                            {...field}
                                            className="px-4 py-3"
                                          />
                                          <ErrorMessage
                                            name="username"
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
                                            placeholder="Application Password"
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
                                  Connect
                                </Button>
                              </Form>
                            )}
                          </Formik>
                        ) : (
                          <div className="flex flex-col gap-4 p-5 bg-white text-2xl text-grey-700 w-full items-center">
                            <BsFillCheckCircleFill className="text-primary-300 h-[50px] w-[50px]" />
                            <p>Your Wordpress is connected!!</p>
                          </div>
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>
                {/* <div className="flex flex-col bg-white items-center w-[300px] shadow-lg p-5  my-5 gap-4 rounded-md">
                  <CgMenuRound className="h-[200px] w-[200px] text-grey-400" />
                  <Button
                    variant={'primary'}
                    rightIcon={<TbPlugConnected />}
                    onClick={() => {}}
                    isDisabled={true}
                  >
                    Comming Soon...
                  </Button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
