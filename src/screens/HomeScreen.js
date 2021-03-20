import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const tasksCollection = firestore().collection('Tasks');

const HomeScreen = ({navigation}) => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    const subscriber = tasksCollection.onSnapshot(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);
      const tempList = [];
      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        tempList.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setList(tempList);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const addTask = () => {
    console.log(input);
    tasksCollection.add({
      title: input,
      isCompleted: false,
    });
    setInput('');
  };

  const updateTask = payload => {
    tasksCollection.doc(payload.id).update({
      isCompleted: !payload.isCompleted,
      updatedAt: new Date(),
    });
  };

  const completedTasks = list.filter(item => item.isCompleted);
  const incompletedTasks = list.filter(item => !item.isCompleted);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
      <Text>To Do List</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="New Task"
        style={{borderColor: '#d0d0d0', borderWidth: 1, marginBottom: 10}}
      />
      <Button title="Add" onPress={addTask} />
      <Text style={{fontSize: 30}}>To Do</Text>
      <View>
        {incompletedTasks.map(item => (
          <TouchableOpacity key={item.id} onPress={() => updateTask(item)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{fontSize: 30}}>Done</Text>
      <View>
        {completedTasks.map(item => (
          <TouchableOpacity key={item.id} onPress={() => updateTask(item)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
