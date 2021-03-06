import React, { Component, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { MainLogo } from "../utils/tools";
import { MyContext } from '../context';

const stage_two = () => {
  const context = useContext(MyContext)



  return (
    <View>
      <MainLogo/>

      <Text style={styles.loserStyle}> {context.state.result} </Text>
      <Button
        title="Try Again"
        buttonStyle={styles.buttonStyle}
        onPress={()=> context.newLoser()}
      />
      <Button
        title="Start Over"
        buttonStyle={styles.buttonStyle}
        onPress={()=> context.reset()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle:{
    backgroundColor: '#09BC8A',
    marginTop: 20
  },
  loserStyle:{
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    color: '#508991'
  }
})
export default stage_two