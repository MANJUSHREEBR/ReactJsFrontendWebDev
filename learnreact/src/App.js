import React, {Component} from 'react'
import axios from'axios'
import {Loading} from './Loading'
//import { render } from 'react-dom';

class App extends Component {
  constructor(props){
    super(props)
    //state
    this.state = {
      users: [],
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getuser(){
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users,...response.data.results],
      loading:false
    }))

  }
  //callinf API before component mount
  componentWillMount(){
     this.getuser();

   }
   handleSubmit(e){
     e.preventDefault();
     this.getuser();
     console.log("more users loaded")


   }




  render(){
    const {loading, users} = this.state
  return (
    <div className="App">
       <form onSubmit= {this.handleSubmit}>
         <input type="submit" value = "load users"></input>
       </form><hr/>
     {!loading ?
     users.map(user => 
     <div key ={user.id.value}>
       <h3 style = {{color: 'red'}}>{user.name.first + user.name.last }</h3>
       <p>{user.email}</p><hr></hr>
      
     </div>
  
     ): <Loading message = "Hey Hey Hey"/>}
    </div>
  );
  }
}

export default App;
