

import { FlatList, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import { ExpenseItem } from './ExpenseItem'


const renderExpenseItem = (itemData) => {
  return <ExpenseItem { ...itemData.item }/>
}


export const ExpensesList = ({expenses}) => {


  return (
    <FlatList 
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={ (item) => item.id }
    />
  )
}

