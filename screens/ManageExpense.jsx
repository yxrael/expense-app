
import { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { Button } from '../components/UI/Button';

export const ManageExpense = ({route, navigation}) => {

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense'
    })

  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {

    navigation.goBack();
   }

   const cancelHandler = () => { 

    navigation.goBack();
    }

   const confirmHandler = () => { 

    navigation.goBack();
    }
 

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.buttonStyle} mode='flat' onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.buttonStyle} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8
  }
})