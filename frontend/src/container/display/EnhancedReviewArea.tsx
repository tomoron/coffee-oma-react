import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import LoginState from 'atom/LoginState';
import ReviewArea from 'components/organisms/ReviewArea';
import { Product } from 'model/index';

const EnhancedReviewArea: FC<{ product: Product }> = ({ product }) => {
  const user = useRecoilValue(LoginState);

  return <ReviewArea user={user} exists={!!product.reviews_count} />;
};

export default EnhancedReviewArea;
