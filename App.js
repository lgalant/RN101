import React, { Component } from 'react';
import { Text, View , Image, ScrollView, TextInput, StyleSheet} from 'react-native';
 


function Welcome(props) {
  return <Text>Hola, {props.name}</Text>;
}


class Welcome2 extends React.Component {

  render() {
    return (
      <Text>Hello2, {this.props.name}</Text>
    )
  }
}


class Pelicula extends React.Component {
  render() {
    return(
      <View key={this.props.peli.imdbID} style={{flexDirection:'row'}}>
        <Image style={{height:100, width:100}} source={{ uri: this.props.peli.Poster}} resizeMode={'contain'} />    
        <View style={{marginRight:0}}>
          <Text numberOfLines={1} style={{fontWeight:'600', fontSize:25, color:'blue', marginRight:10}}> {this.props.peli.Title}</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontWeight:'bold', fontSize:20}}> Año:</Text>
          <Text style={{fontSize:20}}> {this.props.peli.Year}</Text>          
        </View>
   
          <Text> {this.props.peli.imdbID}</Text>
        </View>

      
      </View>
    )
  }
}

 
class SearchField extends Component {

  render() {
    return(
      <View>
          <TextInput
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
              placeholder={this.props.title}
              onChangeText={(text) => this.props.onChangeText(text)}
              value={this.props.filter}
        />          

      </View>
    )
  }

}

  export default class PelisApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter:'',
      movies:[],
    };    
  };



  componentDidMount() {
    this.getMoviesFromApiAsync('Back');
  }
  //2b23ac0e
  //http://img.omdbapi.com/?apikey=[yourkey]&
  //http://www.omdbapi.com/?i=tt3896198&apikey=2b23ac0e
  getMoviesFromApiAsync(filtro) {
    return fetch('http://www.omdbapi.com/?s='+filtro+'&apikey=2b23ac0e')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({movies:responseJson.Search})
      })
      .catch((error) => {
        console.error(error);
      });
  }


  onChangeText(text) {
      this.setState({filter:text});
      this.getMoviesFromApiAsync(text);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop:40 }}>

        <Image style={{height:100, width:100}} source={require('./Images/react.png')} resizeMode={'contain'} />    
        <Text style={{fontSize:30}}>Hello Mobile World!!</Text>
        <Welcome name='Amigos!' />
        <View style = {{    backgroundColor:'white', borderWidth:1, borderColor:"#CED0CE",borderColor:'black', width:250,height:32,
         flexDirection:'row', alignItems:'center'}}>
        <Image style={Style.icon20} source={require('./Images/search.png')} resizeMode={'contain'} />               
        <TextInput   
              autoCorrect={false}
              autoCapitalize={'none'}
              underlineColorAndroid='transparent'
              placeholder={'Buscar pelicula'}
              placeholderTextColor="red"
              onChangeText={(text) => this.onChangeText(text)}
              value={this.state.filter}
        />          
      </View>
    
        <ScrollView style={{marginTop:20, width:400, marginHorizontal:4}}>
       { this.state.movies?this.state.movies.map((movie)=>(
          <Pelicula peli={movie} key={movie.imdbID} />
       ))
      :[]}
      </ScrollView>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  icon20: {
    width: 20,
    height: 20,
    margin:10,
  },  
});