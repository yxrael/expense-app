
import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { Button } from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';

export const ManageExpense = ({route, navigation}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense'
    })

  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense- please try again later!');
      setIsSubmitting(false); 
    }
   }

   if ( error && !isSubmitting ) {
    return <ErrorOverlay message={error}/>
   }

   const cancelHandler = () => { 
i
    navigation.goBack();
    }

   const confirmHandler = async (expenseData) => { 
    setIsSubmitting(true);
    try {
      if( isEditing ) {
        expensesCtx.updateExpense(
          editedExpenseId, expenseData);
        updateExpense( editedExpenseId, expenseData );
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Coul not save data - please try again later!');
      setIsSubmitting(false);
    }

    }

  if ( isSubmitting ) {
    return <LoadingOverlay />
  }
 
  return (
    <View style={styles.container}>
      <ExpenseForm 
        onCancel={cancelHandler}
        submitButtonLabel={ isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      
      {
        isEditing && 
        <View style={styles.deleteContainer}>
          <IconButton 
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
          />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
})