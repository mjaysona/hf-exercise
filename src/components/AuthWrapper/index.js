import { useState } from 'react';
import { Card } from '../Card'
import { Button } from '../Button';
import './index.css';
import { InputField } from '../InputField';

export const AuthWrapper = () => {
  const [username, setUsername] = useState('');
  const [isUserFound, setIsUserFound] = useState();
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handleLogin = () => {
    if (!username) {
      setIsUsernameInvalid(true);
      return;
    }

    setIsUserFound(true);
    setIsUsernameInvalid(false);
  }
  
  const renderLoginForm = () => {
    return (
      <Card title={'Welcome back!'}>
        <InputField
          error={isUsernameInvalid ? 'Invalid username' : ''}
          type={'text'}
          label={'Welcome'}
          onChangeCallback={handleUsernameChange}
        />
        <div className='cta'>
          <Button onClickCallback={handleLogin} type='primary'>
            Login
          </Button>
          <a href='#'>normal link</a>
          <a href='#'><strong>heavy link</strong></a>
        </div>
      </Card>
    )
  };
  
  const renderSuccessfulLogin = () => {
    return <Card>Successful Login</Card>;
  };

  const renderWelcome = () => {
    return (
      <Card title={'Welcome back!'}>
        <InputField
          error={isUsernameInvalid ? 'Invalid username' : ''}
          type={'text'}
          label={'Welcome'}
          onChangeCallback={handleUsernameChange}
        />
        <div className='cta'>
          <Button onClickCallback={handleLogin} type='primary'>
            Login
          </Button>
        </div>
      </Card>
    );
  };

  if (isUserFound) {
    return renderLoginForm();
  }

  if (isLoggedIn) {
    return renderSuccessfulLogin();
  }

  return renderWelcome();
};