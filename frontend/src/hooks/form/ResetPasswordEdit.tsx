import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Fetchpasswordresetedit } from 'apis/Session';

const useResetPasswordEdit = (): {
  methods: UseFormReturn<{
    ['password_confirmation']: string;
    password: string;
  }>;
  onSubmit: (data: {
    ['password_confirmation']: string;
    password: string;
  }) => Promise<void>;
} => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const methods = useForm<{
    password: string;
    ['password_confirmation']: string;
  }>({ criteriaMode: 'all', mode: 'onBlur' });
  const headers = {
    'access-token': query.get('access-token') as string,
    client: query.get('client') as string,
    uid: query.get('uid') as string,
  };

  const onSubmit = async (data: {
    ['password_confirmation']: string;
    password: string;
  }) => {
    try {
      const response = await Fetchpasswordresetedit({ data, headers });
      if (response === 200) {
        navigate('/', {
          state: {
            message: 'パスワードが変更されました。',
            type: 'success',
          },
        });
      }
    } catch (e) {
      navigate('/', {
        state: { message: 'エラーが発生しました。', type: 'error' },
      });
    }
  };

  return { methods, onSubmit };
};

export default useResetPasswordEdit;
