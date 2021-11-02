import { useEffect, useState } from 'react';
import { Fetchproductindex } from 'apis/Product';
import { Product } from 'model/index';

const useHomeRanking = (): Product[] => {
  const [state, setState] = useState<Product[]>([]);

  useEffect(() => {
    Fetchproductindex()
      .then((result) =>
        result !== undefined && result.products
          ? setState(result.products)
          : [],
      )
      .catch(() => setState([]));
  }, []);

  return state;
};

export default useHomeRanking;