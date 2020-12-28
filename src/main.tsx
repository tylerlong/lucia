import React from 'react';
import gifshot from 'gifshot';
import { Slider } from 'antd';

class App extends React.Component<any, any> {
  slider?: typeof Slider;
  inputElement?: HTMLInputElement;
  resultImage?: HTMLImageElement;

  constructor(props: any) {
    super(props);
    this.state = { size: 0 };
  }

  render() {
    return <div>
      <h1>Project Lucia</h1>
      <p>
        Lucia is derived from lux, the Latin word for light.
      </p>
      <hr/>
      <div id="images"></div>
      <br/>Upload new image: <input type="file" onChange={e => this.change()} ref={element => this.inputElement = element!}/>
      <br/><br/>Animation speed: <Slider min={1} max={100} defaultValue={10} 
        onAfterChange={() => this.makeGif()} ref={(element: typeof Slider) => this.slider = element}/>
      <hr/>
      Preview: <br/>
      <img height="256px" className="center" ref={element => this.resultImage = element!}/>
    </div>
  }

  change() {
    this.setState({size: this.state.size + 1});
    const element = this.inputElement!;
    const file = element.files![0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const image = document.createElement('img');
      image.src = `data:image/png;base64,${btoa(reader.result as string)}`;
      image.height = 256;
      image.className="image"
      document.getElementById('images')!.appendChild(image);
      this.makeGif();
    };
    element.value='';
  }

  makeGif() {
    const sliderValue = (this.slider! as any).state.value;
      gifshot.createGIF({
        images: Array.from(document.getElementsByClassName('image')),
        gifHeight: 256,
        frameDuration: 100 / sliderValue,
      }, (obj: any) => {
        if(!obj.error) {
          this.resultImage!.src = obj.image;
        }
      });
  }
}

export default App;
