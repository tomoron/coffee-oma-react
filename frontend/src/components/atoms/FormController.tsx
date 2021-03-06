import { FC } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { Input, Form, Ref, TextArea } from 'semantic-ui-react';
import { FormInputType, ruletype } from 'model/index';
/* eslint-disable react/jsx-props-no-spreading */

const FormController: FC<{
  name: FormInputType;
  label?: string;
  icon?: string;
  required?: boolean;
  min?: boolean;
  errors: Partial<Record<FormInputType, FieldError | undefined>>;
  rule: ruletype;
  textarea?: boolean;
}> = ({ name, label, icon, required, errors, rule, textarea }) => (
  <Controller
    name={name}
    rules={rule()}
    defaultValue=""
    render={({ field: { ref, ...method } }) => (
      <Ref innerRef={ref}>
        <Form.Field
          error={
            errors[name] && {
              content: errors[name]?.message,
              pointing: 'below',
            }
          }
          control={textarea ? TextArea : Input}
          label={label}
          icon={icon}
          type={name === 'current_password' ? 'password' : name}
          data-testid={name}
          required={required}
          {...(icon && { iconPosition: 'left' })}
          placeholder={name}
          {...method}
          rows={6}
        />
      </Ref>
    )}
  />
);

export default FormController;
