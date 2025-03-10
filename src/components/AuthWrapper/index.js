import { useState } from 'react';
import { Card } from '../Card'
import { Button } from '../Button';
import './index.css';
import { InputField } from '../InputField';
import { Notification } from '../Notification';
import { ReactComponent as UserIcon} from '../../assets/icons/user.svg';

export const AuthWrapper = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserFound, setIsUserFound] = useState();
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldLoginViaCode, setShouldLoginViaCode] = useState(false);
  const [code, setCode] = useState('');

  const handleInputChanged = (value, type) => {
    if (type === 'password') {
      if (value) setIsPasswordInvalid(false);
      setPassword(value);
      return;
    }

    if (type === 'code') {
      if (value) setIsCodeInvalid(false);
      setCode(value);
      return;
    }
    
    if (value) setIsUsernameInvalid(false);
    setUsername(value);
  };

  const handleContinueClicked = () => {
    if (!username) {
      setIsUsernameInvalid(true);
      return;
    }

    setIsUserFound(true);
    setIsUsernameInvalid(false);
  }

  const handleLoginClicked = () => {
    if (!shouldLoginViaCode && !password) {
      setIsPasswordInvalid(true);
      return;
    }

    if (shouldLoginViaCode && !code) {
      setIsCodeInvalid(true);
      return;
    }

    setIsLoggedIn(true);
  }

  const handleLoginWithCodeClicked = () => {
    setShouldLoginViaCode(true);
  }

  const handleResetFormClicked = () => {
    setIsUserFound(false);
    setIsUsernameInvalid(false);
    setIsPasswordInvalid(false);
    setIsCodeInvalid(false);
    setIsLoggedIn(false);
    setShouldLoginViaCode(false);
    setUsername('');
    setPassword('');
    setCode('');
  }
  
  const renderLoginForm = () => {
    return (
      <Card title={'Log in to your account'}>
        <div className='logged-user'>
          <Notification>
            <div className='logged-user__avatar'>
              <div className='logged-user__avatar__icon'>
                <UserIcon />
              </div>
              <div className='logged-user__avatar__name'>
                <strong>{username}</strong>
              </div>
            </div>
            <div className='logged-user__cta'>
              <span className='non-link-text' onClick={handleResetFormClicked}>
                <strong>Switch account</strong>
              </span>
            </div>
          </Notification>
        </div>
        <form>
          {shouldLoginViaCode &&
            <div className='note'>We've sent a 6 digit code to your email. Enter it below to log in.</div>}
          <InputField
            error={
              isPasswordInvalid || isCodeInvalid
                ? `Invalid ${shouldLoginViaCode ? 'code' : 'password'}`
                : ''
            }
            type={shouldLoginViaCode ? 'code' : 'password'}
            label={shouldLoginViaCode ? 'Code' : 'Password'}
            maxLength={shouldLoginViaCode ? 6 : undefined}
            onChangeCallback={(value) => handleInputChanged(value, shouldLoginViaCode ? 'code' : 'password')}
            value={shouldLoginViaCode ? code : password}
          />
          <div className='cta'>
            <Button onClickCallback={handleLoginClicked} type='primary'>
              Login
            </Button>
            {!shouldLoginViaCode && (
              <>
                <div className='cta__or'>
                  <p>or</p>
                  <p>Go passwordless and we'll send you an email</p>
                </div>
                <Button onClickCallback={handleLoginWithCodeClicked} type='secondary'>
                  Log in with a code
                </Button>
              </>
            )}
          </div>
        </form>
        <div className='help'>
          {shouldLoginViaCode
            ? <>Need help? <span className='non-link-text'>Forgot password</span></>
            : <>Didn't get an email? <span className='non-link-text'>Resend code</span></>
          }
        </div>
      </Card>
    )

  };  
  const renderSuccessfulLogin = () => {
    return (
      <Card title={'Login complete!'}>
        <div className='cta'>
          <Button onClickCallback={handleResetFormClicked} type='secondary'>
            Reset form
          </Button>
        </div>
      </Card>
    );
  };

  const renderWelcome = () => {
    return (
      <Card title={'Welcome back!'}>
        <InputField
          error={isUsernameInvalid ? 'Invalid username' : ''}
          type={'text'}
          label={'Username'}
          onChangeCallback={handleInputChanged}
          value={username}
        />
        <div className='cta'>
          <Button onClickCallback={handleContinueClicked} type='primary'>
            Continue
          </Button>
        </div>
      </Card>
    );
  };

  if (isUserFound && !isLoggedIn) {
    return renderLoginForm();
  }

  if (isLoggedIn) {
    return renderSuccessfulLogin();
  }

  return renderWelcome();
};