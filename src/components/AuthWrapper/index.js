import { useState } from 'react';
import { Card } from '../Card'
import { Button } from '../Button';
import './index.css';
import { InputField } from '../InputField';

export const AuthWrapper = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUserFound, setIsUserFound] = useState();
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldLoginViaCode, setShouldLoginViaCode] = useState(false);
  const [code, setCode] = useState('');

  const handleInputChanged = (value, type) => {
    if (type === 'password') {
      setPassword(value);
      return;
    }

    if (type === 'code') {
      setCode(value);
      return;
    }
    
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
    // assume password is valid
    setIsLoggedIn(true);
  }

  const handleLoginWithCodeClicked = () => {
    setShouldLoginViaCode(true);
  }

  const handleResetFormClicked = () => {
    setIsUserFound(false);
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setIsUsernameInvalid(false);
    setIsPasswordInvalid(false);
    setShouldLoginViaCode(false);
    setCode('');
  }
  
  const renderLoginForm = () => {
    return (
      <Card title={'Log in to your account'}>
        <form>
          <div className='note'>We’ve sent a 6 digit code to your email. Enter it below to log in.</div>
          <InputField
            error={isPasswordInvalid && !shouldLoginViaCode ? 'Invalid password' : ''}
            type={shouldLoginViaCode ? 'code' : 'password'}
            label={shouldLoginViaCode ? 'Code' : 'Password'}
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
            ? <>Need help? <a href="#">Forgot password</a></>
            : <>Didn’t get an email? <a href="#">Resend code</a></>
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
          label={'Welcome'}
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