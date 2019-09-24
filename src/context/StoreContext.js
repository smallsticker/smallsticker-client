import React from 'react';
import Client from 'strapi-sdk-javascript';

const client = new Client('http://10.0.1.12:1337');

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { items: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {}
};

const StoreContext = React.createContext(defaultStoreContext);

export const withStoreContext = Component => {
  return props => (
    <StoreContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </StoreContext.Consumer>
  );
};

export default StoreContext;
