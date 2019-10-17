import React, { Component } from 'react';
import { Text, View , Image} from 'react-native';
//import {Images} from './Images'
import { Images } from '.'


function Welcome(props) {
  return <Text>Hello, {props.name}</Text>;
}


class Welcome2 extends React.Component {

  render() {
    return (
      <Text>Hello2, {this.props.name}</Text>
    )
  }
}

export default class HelloWorldApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter:'',
      movies:[],
    };    
  };


  componentDidMount() {
    this.getMoviesFromApiAsync();
  }
  
  getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({movies:responseJson.movies})
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image style={{height:100, width:100}} source={require('./Images/react.png')} resizeMode={'contain'} />    
        <Text style={{fontSize:30}}>Hello Mobile World!!</Text>
        <Welcome name='Amigos!' />
        <Welcome2 name='Amigas!' />
       { this.state.movies.map((movie)=>(
         <View key={movie.id}>
          <Text> {movie.title}</Text>
          </View>
       ))
      }
      </View>
    );
  }
}
