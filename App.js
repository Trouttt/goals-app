
import { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { StatusBar} from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoallInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([])

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  }

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((prevState) => [...prevState, {text: enteredGoalText, id: Math.random().toString()}]);
    endAddGoalHandler();
  }

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((prevState) => { return prevState.filter((goal) => goal.id !== id)});
  }
  //scrollview renderiza todos os itens, flatList não
  /**
   *    <ScrollView alwaysBounceVertical={false} style={styles.goalsContainer}>   
        {courseGoals.map((goal, index) => <View style={styles.goalItem} key={index}>
          <Text style={styles.goalText}>{goal}</Text>
        </View>)}
      </ScrollView>
   */
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color="5e0acc" onPress={startAddGoalHandler}/>
     <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
      <FlatList data={courseGoals} renderItem={itemData => {
        return (<GoalItem id={itemData.item.id}  onDeleteItem={deleteGoalHandler} text={itemData.item.text}/>)}} alwaysBounceVertical={false} keyExtractor={(item, index) => {return item.id}} style={styles.goalsContainer}>   
       
      </FlatList>
      </View>

    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop:50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5
  },
});
