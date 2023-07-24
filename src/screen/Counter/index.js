import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {incrementCounter, decrementCounter} from '../../stores/actions/counter';

export default function Counter(props) {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 18}}>{counter.count}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="-" onPress={() => dispatch(decrementCounter())} />
        <Button
          title="Reset"
          onPress={() => dispatch({type: 'RESET', data: 0})}
        />
        <Button title="+" onPress={() => dispatch(incrementCounter(1))} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({});
