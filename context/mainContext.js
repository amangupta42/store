import { toast } from 'react-toastify'
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'NEXT_ECOMMERCE_STARTER_'

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0,
}

// Action types
const ActionTypes = {
  SET_CART: 'SET_CART',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  SET_ITEM_QUANTITY: 'SET_ITEM_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
}

// Helper function to calculate total
function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

// Helper function to save to localStorage
function saveToLocalStorage(cart) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart),
      })
    )
  }
}

// Helper function to load from localStorage
function loadFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const storageState = window.localStorage.getItem(STORAGE_KEY)
    if (storageState) {
      try {
        return JSON.parse(storageState)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
        return initialState
      }
    }
  }
  return initialState
}

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_CART:
      return action.payload

    case ActionTypes.ADD_TO_CART: {
      const { item } = action.payload
      let newCart

      if (state.cart.length) {
        const index = state.cart.findIndex(cartItem => cartItem.id === item.id)
        if (index >= 0) {
          // Item exists, update quantity
          newCart = [...state.cart]
          newCart[index] = {
            ...newCart[index],
            quantity: newCart[index].quantity + item.quantity,
          }
        } else {
          // New item
          newCart = [...state.cart, item]
        }
      } else {
        // First item
        newCart = [item]
      }

      const newState = {
        cart: newCart,
        numberOfItemsInCart: newCart.length,
        total: calculateTotal(newCart),
      }

      saveToLocalStorage(newCart)
      return newState
    }

    case ActionTypes.REMOVE_FROM_CART: {
      const { item } = action.payload
      const newCart = state.cart.filter(c => c.id !== item.id)
      const newState = {
        cart: newCart,
        numberOfItemsInCart: newCart.length,
        total: calculateTotal(newCart),
      }

      saveToLocalStorage(newCart)
      return newState
    }

    case ActionTypes.SET_ITEM_QUANTITY: {
      const { item } = action.payload
      const newCart = [...state.cart]
      const index = newCart.findIndex(cartItem => cartItem.id === item.id)

      if (index !== -1) {
        newCart[index] = { ...newCart[index], quantity: item.quantity }
      }

      const newState = {
        cart: newCart,
        numberOfItemsInCart: newCart.length,
        total: calculateTotal(newCart),
      }

      saveToLocalStorage(newCart)
      return newState
    }

    case ActionTypes.CLEAR_CART:
      saveToLocalStorage([])
      return initialState

    default:
      return state
  }
}

// Create context
const SiteContext = createContext(undefined)

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useCart must be used within a ContextProviderComponent')
  }
  return context
}

// Provider component
export function ContextProviderComponent({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Initialize cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      } else {
        try {
          const parsedState = JSON.parse(storageState)
          dispatch({ type: ActionTypes.SET_CART, payload: parsedState })
        } catch (error) {
          console.error('Failed to load cart from localStorage:', error)
        }
      }
    }
  }, [])

  // Memoized context actions
  const addToCart = useCallback(item => {
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: { item } })
    toast.success('Successfully added item to cart!', {
      position: toast.POSITION.TOP_LEFT,
    })
  }, [])

  const removeFromCart = useCallback(item => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: { item } })
  }, [])

  const setItemQuantity = useCallback(item => {
    dispatch({ type: ActionTypes.SET_ITEM_QUANTITY, payload: { item } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_CART })
  }, [])

  const value = {
    cart: state.cart,
    numberOfItemsInCart: state.numberOfItemsInCart,
    total: state.total,
    addToCart,
    removeFromCart,
    setItemQuantity,
    clearCart,
  }

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

// Export both the context and a Consumer for backward compatibility
export { SiteContext }
