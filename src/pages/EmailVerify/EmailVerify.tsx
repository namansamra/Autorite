import { sendVerificationEmail, verifyUser } from '@/services/common';
import { useGlobalStore } from '@/store/store';
import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

let timerId: any = null;
let timeDelay = 20;
const EmailConfirmationBox = () => {
  const [timer, setTimer] = useState(timeDelay);
  const [disabled, setDisabled] = useState(true);

  const startTimer = () => {
    setTimer(timeDelay);
    clearInterval(timerId);
    setDisabled(true);
    timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerId);
          setDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleResendClick = async () => {
    startTimer();
    await sendVerificationEmail();
  };
  return (
    <div className="flex flex-col items-center gap-[20px] rounded-lg bg-white p-[64px] text-center justify-center">
      <h1 className="text-[32px] font-bold text-grey-900">
        💌 One Last Step!!
      </h1>
      <div className="text-center text-sm text-grey-600">
        We have sent a confirmation link to your address.
        <br />
        Please check and confirm your email address.
      </div>

      <Button disabled={disabled} onClick={handleResendClick} width="50%">
        Resend {timer != 0 && 'in ' + timer + 's'}
      </Button>
      <div className="text-xs text-grey-400 mt-5">
        If the email hasn't arrived after a few minutes, please check your spam
        folder or request a new confirmation email. Confirming your email
        address helps us prevent spam and fraud. Thank you!
      </div>
    </div>
  );
};

function EmailVerify() {
  const search = useLocation<any>().search;
  const token = new URLSearchParams(search).get('token');
  const [step, setStep] = useState(0);
  console.log(token);
  const [loading, setLoading] = useState(false);
  const [setUserInfo, setAuth] = useGlobalStore((state) => [
    state.actions.setUserInfo,
    state.actions.setAuth,
  ]);
  const verifyHandler = async () => {
    setLoading(true);
    try {
      console.log(token);
      const { data } = await verifyUser(token);
      setStep(1);
      window.location.reload();
      window.location.href =
        window.location.protocol + window.location.host + '/login';
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="flex w-2/5 flex-col items-center justify-center bg-primary-100 bg-[url('/SidebarHelpImage.png')] bg-no-repeat bg-cover"></div>
        <div className="flex w-3/5 bg-whiteSmoke">
          <div className="flex flex-col my-auto w-screen justify-center items-center">
            <div className="flex w-2/5 flex-col items-center justify-center bg-primary-100 bg-[url('/SidebarHelpImage.png')] bg-no-repeat bg-cover"></div>
            <div className="flex items-center justify-center p-6">
              {token ? (
                step == 0 ? (
                  <div className="flex flex-col gap-5 text-lg my-[200px] text-grey-600 w-[400px] shadow-md rounded-md p-4 bg-whiteSmoke">
                    <div className="">
                      Please click on the button below to verify!
                    </div>
                    <Button
                      isLoading={loading}
                      onClick={verifyHandler}
                      variant="primary"
                    >
                      Verify
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 text-lg my-[200px] text-grey-600 w-[400px] shadow-md rounded-md p-8 bg-whiteSmoke items-center justify-center">
                    <div className="">Email Verified Successfully!!</div>
                  </div>
                )
              ) : (
                <EmailConfirmationBox />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerify;
