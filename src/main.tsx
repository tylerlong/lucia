import React from 'react';
import gifshot from 'gifshot';
import { Slider } from 'antd';

class App extends React.Component {
  slider?: typeof Slider;
  inputElements: HTMLInputElement[];
  imageElements: HTMLImageElement[];

  constructor(props: any) {
    super(props);
    this.inputElements = [];
    this.imageElements = [];
  }

  render() {
    return <div>
      <h1>Project Lucia</h1>
      <p>
        Lucia is derived from lux, the Latin word for light.
      </p>
      <input type="file" id="upload0" onChange={e => this.change(0)} ref={element => this.inputElements.push(element!)}/>
      <input type="file" id="upload1" onChange={e => this.change(1)} ref={element => this.inputElements.push(element!)}/>
      <br/><br/>Animation speed: <Slider min={1} max={100} defaultValue={10} 
        onAfterChange={() => this.makeGif()} ref={(element: typeof Slider) => this.slider = element}/>
      <hr/>
      <img id="display0" height="256px" ref={element => this.imageElements.push(element!)}/>
      <img id="display1" height="256px" ref={element => this.imageElements.push(element!)}/>
      <hr/>
      <img id="result" height="256px" className="center"/>
    </div>
  }

  change(index: number) {
    const element = this.inputElements[index];
    const file = element.files![0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      this.imageElements[index].src=`data:image/png;base64,${btoa(reader.result as string)}`;
      this.makeGif();
    };
  }

  makeGif() {
    const sliderValue = (this.slider! as any).state.value;
    const img1 = document.getElementById('display0') as HTMLImageElement;
    const img2 = document.getElementById('display1') as HTMLImageElement;
    if(img1.src !== '' && img2.src !== '') {
      gifshot.createGIF({
        images: [img1, img2],
        gifHeight: 256,
        frameDuration: 100 / sliderValue,
      }, function(obj: any) {
        if(!obj.error) {
          (document.getElementById('result') as HTMLImageElement).src = obj.image;
        }
      });
    }
  }
}

export default App;
