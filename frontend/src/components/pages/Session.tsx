import { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import SignInForm from 'container/form/EnhancedSignInForm';
import SignOut from 'container/display/EnhancedSignOut';
import Confirmation from 'container/form/EnhancedConfirmation';
import ResetPasswordEdit from 'container/form/EnhancedResetPasswordEdit';
import ResetPassword from 'container/form/EnhancedResetPassword';

type Props = {
  issignin?: boolean;
  issignout?: boolean;
  isconfirm?: boolean;
  isreset?: boolean;
  isresetedit?: boolean;
};

const Session: FC<Props> = ({
  issignin = false,
  issignout = false,
  isconfirm = false,
  isreset = false,
  isresetedit = false,
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
