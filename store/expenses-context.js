import { act, createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {}
});

const expensesReducer = ( state, action ) => { 
    switch (action.type) {

        case 'ADD':
            // const id = new Date().toString() + Math.random().toString(); **ANTIGUO GENERADOR DE ID
            return [ action.payload, ...state ];


        case 'SET':
          // console.log(action.payload)
          const inverted = action.payload.reverse();
          // console.log(inverted)
          return inverted;
          // return action.payload;

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
                const updatableExpense = state[updatableExpenseIndex];
                const updatedItem = { ...updatableExpense, ...action.payload.data};
                const updatedExpenses = [...state];
                updatedExpenses[updatableExpenseIndex] = updatedItem;
                return updatedExpenses;

        case 'DELETE':
            return state.filter( (expense) => expense.id !== action.payload );

        default:
            return state;
    }
 }

export const ExpensesContextProvider = ({children}) => { 

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => { 
        dispatch({
            type: 'ADD',
            payload: expenseData
        });
     };

     const setExpenses = (expenses) => {
        dispatch({
          type: 'SET',
          payload: expenses
        })
     }    

     const deleteExpense = (expenseId) => { 
        dispatch({
            type: 'DELETE',
            payload: expenseId
        })
      };

      const updateExpense = (id, expenseData) => {
        dispatch({
            type: 'UPDATE',
            payload: { id, data: expenseData }
        })
      }

      const value = {
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense
      }

    return  <ExpensesContext.Provider value={value}>
              {children}
            </ExpensesContext.Provider>
 }
