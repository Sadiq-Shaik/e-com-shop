import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

const ShoppingCartContext = createContext({
  cartState: {},
  incrementItemQuantity: (id) => {},
  decrementItemQuantity: (id) => {},
  clearAllItems: () => {},
  initializerLS: () => {},
});

let initialCartState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

function cartReducerFn(state, action) {
  //
  if (action.type === "INIT") {
    const lsCartState = JSON.parse(localStorage.getItem("cartState"));

    if (lsCartState) {
      return lsCartState;
    } else {
      return state;
    }
  }

  if (action.type === "ADD_TO_CART") {
    console.log("adding to cart");

    if (state.cartItems.find((item) => item.id === action.payload.id) == null) {
      // add to cartitems array
      // state.cartItems.push(action.payload);

      const newCartItems = state.cartItems.map((item) => item);

      newCartItems.push(action.payload);

      // console.log(state);

      const newState = {
        ...state,
        cartItems: newCartItems,
        totalAmount: state.totalAmount + action.payload.price,
        totalItems: state.totalItems + 1,
      };

      localStorage.setItem("cartState", JSON.stringify(newState));

      return newState;
      //
    }
  }

  if (action.type === "INCREMENT") {
    //
    console.log("Incrementing");

    const newCartItems = state.cartItems.map((item) => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });

    const newState = {
      ...state,
      totalItems: state.totalItems + 1,
      totalAmount: state.totalAmount + Number(action.payload.price),
      cartItems: newCartItems,
    };

    localStorage.setItem("cartState", JSON.stringify(newState));

    return newState;
  }

  if (action.type === "REMOVE_ITEM") {
    console.log("Removing item");

    if (state.cartItems.find((item) => item.id === action.payload.id) != null) {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      const removeQuantity = state.cartItems.filter(
        (item) => item.id === action.payload.id
      )[0].quantity;

      // console.log(newCartItems);

      const newState = {
        ...state,
        cartItems: newCartItems,
        totalItems: state.totalItems - removeQuantity,
        totalAmount:
          state.totalAmount - Number(action.payload.price) * removeQuantity,
      };

      localStorage.setItem("cartState", JSON.stringify(newState));

      return newState;
    }
  }

  if (action.type === "DECREMENT") {
    console.log("Decrementing");

    const newCartItems = state.cartItems.map((item) => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });

    const newState = {
      ...state,
      cartItems: newCartItems,
      totalAmount: state.totalAmount - Number(action.payload.price),
      totalItems: state.totalItems - 1,
    };

    localStorage.setItem("cartState", JSON.stringify(newState));

    return newState;
  }
}

export function ShoppingCartProvider(props) {
  const { children } = props;

  const [cartState, cartDispatch] = useReducer(cartReducerFn, initialCartState);

  const incrementItemQuantity = (product) => {
    if (cartState.cartItems.find((item) => item.id === product.id) == null) {
      cartDispatch({
        type: "ADD_TO_CART",
        payload: {
          id: product.id,
          title: product.title,
          quantity: 1,
          price: product.price,
          image: product.images[0],
        },
      });
    } else {
      cartDispatch({
        type: "INCREMENT",
        payload: {
          id: product.id,
          price: product.price,
        },
      });
    }
  };

  const decrementItemQuantity = (product) => {
    if (
      cartState.cartItems.find((item) => item.id === product.id).quantity <= 1
    ) {
      cartDispatch({
        type: "REMOVE_ITEM",
        payload: {
          id: product.id,
          title: product.title,
          quantity: 1,
          price: product.price,
        },
      });
    } else {
      // if (cartState.cartItems.find((item) => item.quantity > 1))
      cartDispatch({
        type: "DECREMENT",
        payload: {
          id: product.id,
          quantity: 1,
          title: product.title,
          price: product.price,
        },
      });
    }
  };

  const removeItem = (product) => {
    cartDispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const initializerLS = () => {
    cartDispatch({ type: "INIT" });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartState,
        incrementItemQuantity,
        decrementItemQuantity,
        initializerLS,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
