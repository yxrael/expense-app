import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ManageExpense } from './screens/ManageExpense';
import { RecentExpense } from './screens/RecentExpenses';
import { AllExpenses } from './screens/AllExpenses';

import { GlobalStyles } from './constants/styles';
import { IconButton } from './components/UI/IconButton';
import { ExpensesContextProvider } from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottonTabs.Navigator screenOptions={ ({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => <IconButton 
          icon="add" 
          color={tintColor} 
          size={30} 
          onPress={()=>{
            navigation.navigate('ManageExpense');
          }}
        />
    })}
    >
      <BottonTabs.Screen 
        name="RecentExpenses"
        component={RecentExpense}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size}) => <Ionicons name="hourglass" size={size} color={color}/>
        }}
      />
      <BottonTabs.Screen 
        name="AllExpenses" 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size}) => <Ionicons name="calendar" size={size} color={color}/>
        }}
      />
    </BottonTabs.Navigator>
  )
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }}
            >
            <Stack.Screen 
              name='ExpensesOverview' 
              component={ExpensesOverview} 
              options={{ headerShown: false }}
              />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense} 
              options={{
                presentation: 'modal',
              }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}


