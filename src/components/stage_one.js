//Min: 4:26
import React, { useContext } from 'react';
import { Alert, View, StyleSheet } from 'react-native';

import {Formik} from 'formik'; //https://formik.org/
import * as Yup from 'yup'; //https://github.com/jquense/yup
import {Input, Button, ListItem, Text} from 'react-native-elements'; //https://reactnativeelements.com/

import { MyContext } from '../context';
import { MainLogo} from '../utils/tools'


const stage_one = () => {
  const context = useContext(MyContext);

  const renderPlayers = () => (
    context.state.players.map((item, i) =>(
      <ListItem
        key={i}
        bottomDivider
        style={{width: '100%'}}
        onLongPress = {()=>context.removePlayer(i)}
      >
        <ListItem.Chevron />
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    ))
  )

  return (
    <>
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
            <MainLogo/>
            
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
              
              // Si player tiene errores y ha sido tocado el input
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
            <View style={{padding: 20, width:'100%'}}>
              {
                context.state.players && context.state.players.length > 0 ?
                <>
                  <Text>List of players</Text>
                  {renderPlayers()}
                  
                  {
                    context.state.players.length > 1 ?
                    <View style={styles.viewCenter}>
                      <Button
                        buttonStyle={styles.smallButton}
                        title='Start'
                        onPress={()=> context.next()}
                      />
                    </View>
                    :
                    null
                  }
                </>
                :
                null
              }
            </View>
          </>
            
        )}
      </Formik>
    </>
  )
}

const styles = StyleSheet.create({
  viewCenter:{
    width:'100%',
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    backgroundColor: '#8F95D3',
    marginTop: 20
  },
  smallButton:{
    backgroundColor: '#8F95D3',
    marginTop: 20,
    width: '150px'
  }
})

export default stage_one
