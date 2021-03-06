import { FC } from 'react';
import useSignout from 'hooks/effect/SignOut';
import SignOut from 'components/atoms/SignOut';

const EnhancedSignOut: FC = () => {
  useSignout();

  return <SignOut />;
};

export default EnhancedSignOut;
