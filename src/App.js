import React, {Component} from 'react';
import './App.css';
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";



 const app = new Clarifai.App({
  apiKey: '5e60b0ee2176469591eb448d21fefab5'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models
       .predict(
          Clarifai.FACE_DETECT_MODEL,
          "https://samples.clarifai.com/face-det.jpg")
          .then(
            function(response) {
              console.log(response);
            },
            function(err) {
              console.log(err);
            }
          );

  }

  render() {
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={250} type="cobweb" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
