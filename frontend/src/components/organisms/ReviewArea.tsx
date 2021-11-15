import { FC, Suspense } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import ReviewItems from 'container/EnhancedReviewItems';
import ErrorBoundary from 'error/ErrorBoundary';
import ErrorReviewLoader from 'error/ErrorReviewLoader';

const ReviewArea: FC = () => (
  <>
    <Divider horizontal>
      <Header as="h4">
        <Icon name="pencil alternate" />
        ユーザーレビュー
      </Header>
    </Divider>
    <ErrorBoundary statusMessages={{ 404: 'レビューが取得できませんでした。' }}>
      <Suspense fallback={<ErrorReviewLoader />}>
        <ReviewItems />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default ReviewArea;
