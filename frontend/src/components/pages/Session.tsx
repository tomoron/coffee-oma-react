import { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import SignInForm from 'container/EnhancedSignInForm';
import SignOut from 'container/EnhancedSignOut';
import Confirmation from 'container/EnhancedConfirmation';
import ResetPassword from 'components/organisms/ResetPassword';
import ResetPasswordEdit from 'components/organisms/ResetPasswordEdit';

type Props = {
  issignin?: boolean;
  issignout?: boolean;
  isconfirm?: boolean;
  isreset?: boolean;
  isresetedit?: boolean;
};

const Session: FC<Props> = ({
  issignin,
  issignout,
  isconfirm,
  isreset,
  isresetedit,
}) => (
  <>
    <Helmet title="Session" />
    <Grid centered textAlign="center" padded verticalAlign="middle">
      <Grid.Column>
        {issignin && <SignInForm />}
        {issignout && <SignOut />}
        {isconfirm && <Confirmation />}
        {isreset && <ResetPassword />}
        {isresetedit && <ResetPasswordEdit />}
      </Grid.Column>
    </Grid>
  </>
);

export default Session;
