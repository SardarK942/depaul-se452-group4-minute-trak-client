import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPageLogin.module.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LandingPageLogin(props: { isRegister: boolean }) {
  const navigate = useNavigate();
  const [isRegister, setRegister] = useState<boolean>(props.isRegister);

  function handleModeSwap(): void {
    setRegister((prev) => !prev);
    isRegister ? navigate('../login') : navigate('../signup');
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <RegisterForm isOn={isRegister} handleModeSwap={handleModeSwap} />
        <LoginForm isOn={!isRegister} handleModeSwap={handleModeSwap} />
      </div>
    </div>
  );
}

export default LandingPageLogin;
