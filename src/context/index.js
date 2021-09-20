import React, { Component } from 'react';
import Toast from 'react-native-toast-message';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage:1,
    players:[],
    result:0
  }

  addPlayerHandler = (name) => {
    this.setState((prev, props)=>({
      players:[
        ...prev.players,
        name
      ]
    }))
  }

  removePlayerHandler = (i) => {
    let newArray = this.state.players;
    newArray.splice(i, 1);
    this.setState({players:newArray})
  }

  generateLooser = () =>{
    const {players} = this.state;

    this.setState({
      result: players[Math.floor(Math.random()*players.length)]
    })
  }

  nextHandler = () =>{
    const {players} = this.state;

    if(players.length < 2)
      Toast.show({
        type:'error',
        position:'bottom',
        text1:'Sorry',
        text2:'You should have at least 2 users'
      });
    else{
      this.setState({
        stage:2
      },()=>{
        this.generateLooser()
      })
    }
  }

  resetGame = () =>{
    this.setState({
      stage: 1
    })
  }
  
  render() {
    return (
      <>
        <MyContext.Provider value={{
          state:this.state,
          addPlayer: this.addPlayerHandler,
          removePlayer: this.removePlayerHandler,
          next: this.nextHandler,
          newLoser: this.generateLooser,
          reset: this.resetGame
          }}
        >
          {this.props.children}
        </MyContext.Provider>
      </>
    )
  }
}

export{
  MyProvider, 
  MyContext
}
