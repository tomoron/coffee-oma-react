import { FC, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { Fetchsessiondestroy } from 'apis/Session';
import { useResetRecoilState } from 'recoil';
import LoginState from 'atom';

type State = {
  logout: boolean;
};

const SignOut: FC = () => {
  const [state, setState] = useState<State>({ logout: false });
  const [redirect, setRedirect] = useState<boolean>(false);
  const resetUser = useResetRecoilState(LoginState);

  useEffect(() => {
    Fetchsessiondestroy()
      .then((result) =>
        result !== undefined && result === 200
          ? (setState({ logout: true }), resetUser)
          : setState({ logout: false }),
      )
      .catch(() => setState({ logout: false }));
    setTimeout(() => setRedirect(true), 6000);
  }, []);

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Grid columns={3} centered style={{ margin: '4em' }}>
        <Grid.Column width={3} />
        <Grid.Column width={10} as={Segment}>
          <Header as="h4" textAlign="center">
            {state
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
