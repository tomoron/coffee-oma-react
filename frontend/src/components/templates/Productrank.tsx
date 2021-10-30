import { FC } from 'react';
import { Header } from 'semantic-ui-react';
import { RankingCards } from 'components/molecules/RankingCards';

const ProductRank: FC = () => (
  <>
    <Header
      as="h1"
      content="ランキング"
      textAlign="center"
      stryle={{ marginBottom: '3rem' }}
    />
    <Header as="h3" textAlign="center" stryle={{ marginBottom: '3rem' }}>
      アイテムのお気に入り数でランキングを表示しています。
    </Header>
    <RankingCards />
  </>
);
export default ProductRank;
