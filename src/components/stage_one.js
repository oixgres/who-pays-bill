//Min 7
import React, { useContext } from 'react';
import { Alert, View, StyleSheet } from 'react-native';

import {Formik} from 'formik'; //https://formik.org/
import * as Yup from 'yup'; //https://github.com/jquense/yup
import {Input, Button, ListItem, Text} from 'react-native-elements'; //https://reactnativeelements.com/

import { MyContext } from '../context';

const stage_one = () => {
  const context = useContext(MyContext);

  return (
    <Formik
      initialValues={{player:'', name:''}}
      validationSchema={Yup.object({
        player: Yup.string()
          .min(3, 'Must be more than 3 characters')
          .max(15, 'Must be less than 15 characters')
          .required('Name required')
      })}
      onSubmit={(values, {resetForm})=>{
        context.addPlayer(values.player)
        resetForm()
      }}
    >
      {({handleChange, handleBlur, handleSubmit, values, touched, errors})=>(
        <>
          <Text>
            Who pays the bill?
          </Text>
          <Input
            placeholder='Insert name here'
            leftIcon={{ type: 'feather', name: 'user-plus' }}
            inputContainerStyle={{
              marginHorizontal: 50,
              marginTop: 50
            }}
            onChangeText={handleChange('player')}
            onBlur={handleBlur('player')}
            value={values.player}
            
            // Si player tiene errorer y ha sido tocado el input
            renderErrorMessage={errors.player && touched.player}
            errorMessage={errors.player}
            errorStyle={{
              marginHorizontal: 50
            }}

          />
          <Button 
            buttonStyle={styles.button}
            title="Add player"
            onPress={handleSubmit}
          />
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#8F95D3',
    marginTop: 20
  }

})

export default stage_one
