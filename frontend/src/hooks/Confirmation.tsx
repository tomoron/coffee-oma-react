import { useHistory } from 'react-router-dom';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Fetchsessionconfirm } from 'apis/Session';

/* eslint-disable react/jsx-props-no-spreading */

const useConfirmation = (): {
  methods: UseFormReturn<{ email: string }>;
  onSubmit: (data: { email: string }) => Promise<void>;
} => {
  const history = useHistory();
  const methods = useForm<{ email: string }>({
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const onSubmit = async (data: { email: string }) => {
    await Fetchsessionconfirm(data)
      .then((result) => result === 200 && history.push('/send_mail'))
      .catch(() =>
        history.push('/', { message: 'エラーが発生しました。', type: 'error' }),
      );
  };

  return { methods, onSubmit };
};

export default useConfirmation;
