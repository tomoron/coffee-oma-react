import { useCallback } from 'react';
import { useFormContext, FieldError } from 'react-hook-form';
import { FormInputType, ruletype } from 'model/index';

/* eslint-disable react/jsx-props-no-spreading */

type prop = {
  errormessage?: string;
  required?: boolean | undefined;
  min?: boolean | undefined;
};

const useFormController = ({
  errormessage,
  required,
  min,
}: prop): {
  errors: Partial<Record<FormInputType, FieldError | undefined>>;
  rule: ruletype;
} => {
  const {
    formState: { errors },
  } = useFormContext<Record<FormInputType, string>>();

  const rule = useCallback(() => {
    if (required) {
      return { required: errormessage };
    }
    if (min) {
      return {
        required: 'アカウント名が入力されていません。',
        minLength: {
          value: 2,
          message: 'アカウント名は最低2文字以上必要です',
        },
      };
    }

    return {};
  }, [required, min, errormessage]);

  return { errors, rule };
};

export default useFormController;
