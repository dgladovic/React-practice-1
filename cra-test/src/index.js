/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import './index.css';
import './randomcss.css'


const CardList = (props) =>{

    return(
    <div>
      {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
    )
}


class Card extends React.Component{
  render(){
    const profile = this.props;
    return(
    <div className='github-profile'>
      <img src={profile.avatar_url} />
      <div className='info'>
        <div className='name'>{profile.name}</div>
        <div className='company'>{profile.company}</div>
      </div>
    </div>
    )
  }
}

class Form extends React.Component{

  state = {
    userName: '',
  };

  handleSubmit = async (event) =>{
    event.preventDefault();       // ovo je da overridujemo HTmlove eventove, a preuzimamo ceo event obj.
    try{
      const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
      this.props.onSubmit(resp.data);
      this.setState({ userName: '' });
    }
    catch (e){
      const resp = {
        data: {
          name:'there has been an error',
          id: 'error',
        }
      };   
      this.props.onSubmit(resp.data);
      console.log('doslo je do greske');
    }

  };

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Github username"   
          value = {this.state.userName}
          onChange = { (event) => this.setState({ userName: event.target.value })}
          required
        />
        <button>Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  
  // constructor(props){   
  //   super(props);
  //   this.state = {            //mora da bude objekat za razliku od functional componenta
  //     profiles: testData,
  //   };      
  // }

  state = {                      //class field syntax, isto kao gore samo se ovde koristi pod Babelom
    profiles: [],
  };

  addNewProfile = (profileData) =>{
    this.setState( prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }

  render(){
    return( 
    <div>
      <div className='header'>{this.props.title} </div>
      <Form onSubmit={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>      
    </div>
    )  
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App title="The Gitub Cards App"/>
);