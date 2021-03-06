import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Grid } from 'semantic-ui-react';
import RegistrationNew from 'components/templates/RegistrationNew';
import RegistrationShow from 'container/display/EnhancedRegistrationShow';
import RegistrationEdit from 'components/templates/RegistrationEdit';

type Props = {
  isnew?: boolean;
  isedit?: boolean;
  ismypage?: boolean;
  isshow?: boolean;
};

const Registration: FC<Props> = ({
  isnew = false,
  isedit = false,
  ismypage = false,
  isshow = false,
}) => (
  <>
    <Helmet title="Registration" />
    <Grid centered textAlign="center" padded verticalAlign="middle">
      <Grid.Column>
        {isnew && <RegistrationNew />}
        {isedit && <RegistrationEdit />}
        {ismypage && <RegistrationShow />}
        {isshow && <RegistrationShow />}
      </Grid.Column>
    </Grid>
  </>
);

export default Registration;
