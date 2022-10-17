import React, {Component} from 'react';
import './App.css';
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";


 const app = new Clarifai.App({
  apiKey: '5e60b0ee2176469591eb448d21fefab5'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const  clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width, //left_col is percentage of width. When i multiply it with current width of image i get where should be left column in the image
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), //right_col is total %tage minus width starting from left side 
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    this.setState({box: {} })
    app.models
       .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
          .then(response => {
            if(response){
              fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id,

                })
              })
                .then(response => response.json())
                .then(count => {
                  //updating only entries in current user
                  this.setState(Object.assign(this.state.user,{entries: count}))
                })
              this.displayFaceBox(this.calculateFaceLocation(response))
            }
          })
          .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route });
  }

  render() {
   const {isSignedIn, imageUrl, route, box } = this.state; //destructured states - can use without this  
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={250} type="cobweb" bg={true} />
        <Navigation  
          onRouteChange={this.onRouteChange}
          isSignedIn = {isSignedIn}
        />
        { //if route state home in display signin home screen else check if route state is signin if yes display signin if no display register 
        route === 'home'
            ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        : (
            route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
