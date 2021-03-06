import { FC, Suspense } from 'react';
import { Header } from 'semantic-ui-react';
import UserProfile from 'container/fetch/EnhancedUserProfile';
import MyProfile from 'container/display/EnhancedMyProfile';
import ErrorBoundary from 'error/ErrorBoundary';
import UserProfileLoading from 'error/UserProfileLoading';

const RegistrationShow: FC<{ pathname: string }> = ({ pathname }) => (
  <>
    <Header
      as="h1"
      content={pathname === '/mypage' ? 'マイプロフィール' : 'ユーザーの詳細'}
      textAlign="center"
      stryle={{ marginBottom: '3rem' }}
    />
    {pathname === '/mypage' ? (
      <MyProfile />
    ) : (
      <ErrorBoundary statusMessages={{ 404: 'ユーザー情報が存在しません。' }}>
        <Suspense fallback={<UserProfileLoading />}>
          <UserProfile />
        </Suspense>
      </ErrorBoundary>
    )}
  </>
);

export default RegistrationShow;
