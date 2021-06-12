import { FC, useEffect, useReducer } from 'react';
import { Card, Segment } from 'semantic-ui-react';
import Indexcards from 'components/atoms/Indexcards';
import { Fetchproductindex } from 'apis/Product';
import { productindexReducer } from 'reducers/Product';
import { products } from 'mock/product';
import REQUEST_STATE, { ProductsActionTypes } from '../../constants';

type Props = {
  className?: string;
};

const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  productsList: products,
};

export const Threecards: FC<Props> = ({ className }) => {
  const [state, dispatch] = useReducer(productindexReducer, initialState);

  useEffect(() => {
    dispatch({ type: ProductsActionTypes.FETCHING });
    Fetchproductindex()
      .then((data) =>
        dispatch({
          type: ProductsActionTypes.FETCH_SUCCESS,
          payload: data,
        }),
      )
      .catch(() => dispatch({ type: ProductsActionTypes.ERROR }));
  }, []);

  return (
    <>
      <Segment
        loading={state.fetchState === 'LOADING'}
        style={{ margin: '4em', padding: '3em' }}
      >
        <Card.Group itemsPerRow={3} stackable className={className} centered>
          <Indexcards products={state.productsList} />
        </Card.Group>
      </Segment>
      )
    </>
  );
};

export default Threecards;
