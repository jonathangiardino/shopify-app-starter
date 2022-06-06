import { createContext, useContext, useMemo, useReducer } from "react";

const initialState = {};
const shopContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "GET_SHOP": {
      return {
        ...state,
      };
    }

    case "UPDATE_SHOP": {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return null;
  }
}

export const ShopProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // METHODS
  const getShop = () => {
    dispatch({ type: "GET_SHOP" });
  };

  const updateShop = (payload) => {
    dispatch({ type: "UPDATE_SHOP", payload });
  };

  const value = useMemo(
    () => ({
      state,
      getShop,
      updateShop,
    }),
    [state]
  );

  return <shopContext.Provider value={value} {...props} />;
};

export const useShop = () => {
  const context = useContext(shopContext);

  if (context === undefined) {
    throw new Error(`useShop must be used within ShopProvider`);
  }
  return context;
};

export const ShopContextProvider = ({ children }) => (
  <ShopProvider>{children}</ShopProvider>
);