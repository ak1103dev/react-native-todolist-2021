import React from 'react';
import {View, Button, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from '../store/models/counter';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Text>{count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default Counter;
