import { FC } from 'react';
import { Header } from 'semantic-ui-react';
import Threecards from 'components/molecules/Threecards';
import styled from 'styled-components';

const Rankinggrid = styled.div`
  margin: 3rem 0 !important;
`;

const Homeranking: FC = () => (
  <Rankinggrid className="ui vertical stripe center aligned segment grid">
    <Header as="h2" content="お気に入りアイテムランキング" />
    <Threecards />
  </Rankinggrid>
);

export default Homeranking;
