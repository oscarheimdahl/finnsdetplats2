import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from 'firebase/auth';

interface AppStateContext {
  user: User | null;
  week: Day[];
  bookings: Booking[];
  setUser: (payload: User) => void;
  clearUser: () => void;
  setWeek: (payload: Day[]) => void;
  addBooking: (payload: Booking) => void;
  removeBooking: (payload: string) => void;
}

interface AppStateAction {
  type: 'SET_USER' | 'CLEAR_USER' | 'SET_WEEK' | 'ADD_BOOKING' | 'REMOVE_BOOKING';
  payload?: any;
}

export interface Day {
  date: string;
}

export interface Booking {
  id?: string;
  date: string;
  type: 'd' | 'p';
  uid: string;
  displayName: string;
  photoURL: string;
  partOfDay?: number;
}

const reducer = (state: AppStateContext, action: AppStateAction): AppStateContext => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload as User,
      };

    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
      };

    case 'SET_WEEK':
      return {
        ...state,
        week: action.payload as Day[],
        bookings: [],
      };

    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload as Booking],
      };

    case 'REMOVE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(({ id }) => id !== action.payload),
      };

    default:
      return state;
  }
};

const AppState = createContext({} as AppStateContext);

export default function AppStateProvider({ children }: { children: ReactNode }) {
  const setUser = (payload: User) => dispatch({ type: 'SET_USER', payload });
  const clearUser = () => dispatch({ type: 'CLEAR_USER' });

  const setWeek = (payload: Day[]) => dispatch({ type: 'SET_WEEK', payload });

  const addBooking = (payload: Booking) => dispatch({ type: 'ADD_BOOKING', payload });
  const removeBooking = (payload: string) => dispatch({ type: 'REMOVE_BOOKING', payload });

  const [state, dispatch] = useReducer(reducer, {
    user: null,
    week: [],
    bookings: [],
    setUser,
    clearUser,
    setWeek,
    addBooking,
    removeBooking,
  });

  return <AppState.Provider value={state}>{children}</AppState.Provider>;
}

export const useAppState = () => useContext(AppState);
