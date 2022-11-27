import { useGlobalStore } from '@/store/store';
import {
  Button,
  Input,
  Progress,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
import {
  buyPlan,
  connectWordpress,
  getPaymentStatus,
  getPlans,
} from '@/services/common';
import { GrCurrency } from 'react-icons/gr';
import CustomToast from '@/components/Toast/Toast';
import { useSimplePolling } from '@/hooks/usePollings';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
function MyAccount() {
  const [userInfo, wordPressInfo] = useGlobalStore((state) => [
    state.appState.userInfo,
    state.appState.wordPressInfo,
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = useState(0);
  const [wordpressStatus, setWordpressStatus] = useState('not-connected');
  const [plansInfo, setPlansInfo] = useState<any>(null);
  const [paymentSessionId, setPaymentSessionId] = useState('');
  const [verifyingPayment, setVerifyingPayment] = useState('pending');
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const { startPolling, stopPolling } = useSimplePolling(
    async () => {
      const { data } = await getPaymentStatus(paymentSessionId);

      switch (data?.subscriptionInfo?.status) {
        case 'created':
          setShowPaymentModal(true);
          setVerifyingPayment('pending');
          break;
        case 'completed':
          stopPolling();
          setTimeout(() => {
            setShowPaymentModal(false);
          }, 10000);
          setVerifyingPayment('completed');
          break;

        case 'failed':
          stopPolling();
          setTimeout(() => {
            setShowPaymentModal(false);
          }, 10000);
          setVerifyingPayment('failed');
          break;

        default:
          stopPolling();
          setTimeout(() => {
            setShowPaymentModal(false);
          }, 10000);
          setVerifyingPayment('');
          break;
      }
    },
    10,
    20
  );

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
      title: 'WordPress',
      step: 1,
      icon: () => <SiQuantconnect className="text-md text-grey-500 mr-2" />,
    },
    {
      title: 'Plans',
      step: 2,
      icon: () => <GrCurrency className="text-md !text-grey-500 mr-2" />,
    },
  ];
  const getCorrectComponent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="flex gap-20 p-10">
            <div className="flex items-center justify-center  bg-primary-100 border-[2px] border-primary-400  min-h-[200px] min-w-[200px] rounded-full text-primary-900 text-6xl font-medium uppercase shadow-lg">
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
        );

      case 1:
        return (
          <div className="flex gap-5">
            {wordPressInfo ? (
              <div className="flex gap-20 p-10">
                <BsWordpress className="h-[200px] w-[200px] text-primary-300" />
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex gap-10 items-center text-lg">
                    <div className="font-bold min-w-[100px]">Username</div>
                    <div>{wordPressInfo?.username}</div>
                  </div>
                  <div className="flex gap-10 items-center text-lg">
                    <div className="font-bold min-w-[100px]">Domain</div>
                    <a
                      href={wordPressInfo?.domain}
                      className="hover:text-primary-700 underline"
                      target={'_blank'}
                    >
                      {wordPressInfo?.domain}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
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
                        <>
                          <div className="flex flex-col gap-4 p-5 bg-white text-2xl text-grey-700 w-full items-center">
                            <BsFillCheckCircleFill className="text-primary-300 h-[50px] w-[50px]" />
                            <p>Your Wordpress is connected!!</p>
                          </div>
                        </>
                      )}
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </div>
            )}
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
        );

      case 2:
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col p-6 w-full max-w-lg gap-2 rounded-lg shadow-lg mx-5 border-2 border-grey-200">
              <h2>Current Plan Info:</h2>
              <div className="flex flex-col gap-2 text-grey-600">
                <div className="flex items-center justify-between">
                  <span className="text-grey-500">Plan Name</span>
                  <span className="font-bold text-grey-800">
                    {plansInfo?.userPlanInfo?.plan_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-grey-500">Credits Remaining</span>
                  <span className="font-bold text-grey-800">
                    {plansInfo?.userPlanInfo?.credits}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-grey-500">Expiry On</span>
                  <span className="font-bold text-grey-800">
                    {new Date(
                      plansInfo?.userPlanInfo?.expiration_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <Modal
              isOpen={showPaymentModal}
              onClose={() => {
                setShowPaymentModal(false);
              }}
            >
              <ModalOverlay />
              <ModalContent p="20px">
                <ModalHeader className="text-center">
                  Processing You Payment
                </ModalHeader>
                <ModalBody className="flex flex-col gap-2 justify-center items-center">
                  {verifyingPayment == 'pending' ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      size="xl"
                      className="text-primary-500"
                    />
                  ) : verifyingPayment == 'completed' ? (
                    <div className="text-grey-600 w-full text-center flex flex-col items-center justify-center gap-4">
                      Payment Successfully Completed!! <br />
                      <BsCheckCircle className="text-primary-600 h-[100px] w-[100px]" />
                    </div>
                  ) : (
                    <div className="text-grey-600 w-full text-center flex flex-col items-center justify-center gap-4">
                      Failed!! Please try again
                      <AiOutlineCloseCircle className="text-status-closed h-[100px] w-[100px]" />
                    </div>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
            <div className="flex gap-4 p-5 justify-evenly w-full flex-wrap items-center">
              {plansInfo?.plans?.map((plan: any) => {
                return (
                  <div
                    className="flex flex-col shadow-md rounded-md p-5 bg-primary-50 min-h-[400px] min-w-[300px] justify-between items-center"
                    key={plan.id}
                  >
                    <h1 className="font-bold text-3xl">{plan.plan_name}</h1>
                    <p>{plan.plan_type || '-'}</p>
                    <div className="text-lg">
                      Wallet Credits: <b>{plan.wallet_credits}</b>
                    </div>
                    <div className="text-lg">
                      Validity: <b>{plan.validity} days</b>
                    </div>
                    {!plan.currency ? (
                      <h2>Free</h2>
                    ) : (
                      <h2>
                        {plan.price} {plan.currency}
                      </h2>
                    )}

                    {plan?.plan_name == 'Trial' ? (
                      <Button variant={'primary'} isDisabled={true} w="100%">
                        Activate and Expire Automatically
                      </Button>
                    ) : plan?.plan_name ==
                      plansInfo?.userPlanInfo?.plan_name ? (
                      <Button variant={'primary'} isDisabled={true} w="100%">
                        Activated
                      </Button>
                    ) : (
                      <Button
                        variant={'primary'}
                        onClick={() => displayRazorpay(plan.plan_id)}
                        w="100%"
                      >
                        Buy Now
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

        break;

      default:
        break;
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(planId) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Cannot detect internet. Are you online?');
      return;
    }

    const result: any = await buyPlan({ plan_id: planId });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { subscription_id, session_id, ...other } =
      result.data?.subscriptionInfo;
    setPaymentSessionId(session_id);
    const options = {
      key: 'rzp_test_dqxSieRTxYtO1b', // Enter the Key ID generated from the Dashboard
      name: userInfo?.name,
      description: 'Test Transaction',
      subscription_id: subscription_id,
      handler: async function (response) {
        setShowPaymentModal(true);
        startPolling();
      },
      prefill: {
        name: userInfo?.name,
        email: userInfo?.email,
        contact: '',
      },
      theme: {
        color: '#40cdc0',
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    const fun = async () => {
      try {
        const plan = await getPlans();
        console.log(plan.data);
        setPlansInfo(plan.data as any);
      } catch (error) {
        console.log(error);
      }
    };

    fun();
  }, []);
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
            {getCorrectComponent(step)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
