import React from 'react';
import Client from 'strapi-sdk-javascript';

const client = new Client(process.env.STRAPI_API);

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { items: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  submitOrder: () => {},
  replaceCart: () => {}
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
