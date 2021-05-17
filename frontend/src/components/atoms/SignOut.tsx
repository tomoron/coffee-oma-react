import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { Fetchsessiondestroy } from 'apis/Session';
import { useResetRecoilState } from 'recoil';
import LoginState from 'atom';

type State = {
  logout: boolean;
};

const SignOut: FC = () => {
  const [state, setState] = useState<State>({ logout: false });
  const history = useHistory();
  const resetUser = useResetRecoilState(LoginState);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      Fetchsessiondestroy()
        .then(
          (result) =>
            result !== undefined &&
            result === 200 &&
            (resetUser(),
            setState((prevUser) => ({ ...prevUser, logout: true }))),
        )
        .catch(() => setState({ logout: false }));
      setTimeout(() => history.push('/'), 6000);
    }

    return (): void => {
      isMounted = false;
    };
  }, [history, resetUser]);

  return (
    <>
      <Grid columns={3} centered style={{ margin: '4em' }}>
        <Grid.Column width={3} />
        <Grid.Column width={10} as={Segment}>
          <Header as="h4" textAlign="center">
            {state.logout
              ? 'ログアウトが正常に行われました'
              : 'ログアウトができせんでした。'}
            <Header.Subheader>
              ５秒後にトップページに移動します。
              <Link to="/">Topへ</Link>
            </Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    </>
  );
};

export default SignOut;