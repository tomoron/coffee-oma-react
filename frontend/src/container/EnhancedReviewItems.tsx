import { FC } from 'react';
import ReviewItems from 'components/atoms/ReviewItems';
import useReviewArea from 'hooks/ReviewItems';
import { useRecoilValue } from 'recoil';
import LoginState from 'Atom';

const EnhancedReviewItems: FC = () => {
  const reviews = useReviewArea();
  const currentuser = useRecoilValue(LoginState);

  return <ReviewItems reviews={reviews} user={currentuser} />;
};

export default EnhancedReviewItems;
