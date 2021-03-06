import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import LoginState from 'atom/LoginState';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from 'model/index';
import { useCookies } from 'react-cookie';

const useMyProfile = (): CurrentUser => {
  const user = useRecoilValue(LoginState);
  const navigate = useNavigate();
  const [cookie] = useCookies(['token']);

  useEffect(() => {
    if (!cookie.token) {
      navigate('/sign_in', {
        state: {
          message: 'ログインしてから、お試しください。',
          type: 'error',
        },
      });
    }
  }, [cookie.token, navigate]);

  return user;
};

export default useMyProfile;
