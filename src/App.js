
import React from 'react';
import './App.css';
import _ from 'lodash';
import CharacterCard from './CharacterCard';
import { tag } from 'postcss-selector-parser';

 
let message = 'SARAYUT'
 
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false,
    reham: 1
  }
}
 
class App extends React.Component {

  state = prepareStateFromWord(message);
  reham =()=>{
    this.setState({
      reham: this.state.reham + 1,
      completed: !this.state.completed
    })
  }
  activationHandler = (c) => {
    let guess = [...this.state.guess, c]
    this.setState({ guess })
    if (guess.length == this.state.chars.length) {
      if (guess.join('').toString() == this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], attempt: this.state.attempt + 1 })
      }
    }
  }

  render() {
    return (
      <center>
      <body >
      <div >
        {
          Array.from(this.state.chars).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              attempt={this.state.attempt}
              activationHandler={this.activationHandler}
              reham = {this.state.reham}
            />
          ))
        }
        <h2>Selected</h2>
    
        {
          Array.from(this.state.guess).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
        <div>Attemp {this.state.attempt}</div>
        {
          this.state.completed && <h4>Complete</h4>
        }
        {
          this.state.completed &&<button onClick={this.reham}>Play Agian</button>
        }
        
      </div>
     </body>
     </center>
    )
  }
}
 
export default App


