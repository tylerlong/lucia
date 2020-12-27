import React, { HtmlHTMLAttributes } from 'react';
import gifshot from 'gifshot';

class App extends React.Component {
  render() {
    return <div>
      <h1>Project Lucia</h1>
      <p>
        Lucia is derived from lux, the Latin word for light.
      </p>
      <input type="file" id="upload1" onChange={e => this.change(1)}/>
      <input type="file" id="upload2" onChange={e => this.change(2)}/>
      <hr/>
      <img id="display1" height="256px"/>
      <img id="display2" height="256px"/>
      <hr/>
      <img id="result" height="256px"/>
    </div>
  }

  change(index: number) {
    const element = document.getElementById(`upload${index}`) as HTMLInputElement;
    const file = element.files![0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      (document.getElementById(`display${index}`) as HTMLImageElement).src=`data:image/png;base64,${btoa(reader.result as string)}`;
      this.makeGif();
    };
  }

  makeGif() {
    const img1 = document.getElementById('display1') as HTMLImageElement;
    const img2 = document.getElementById('display2') as HTMLImageElement;
    if(img1.src !== '' && img2.src !== '') {
      gifshot.createGIF({
        images: [img1, img2],
        gifHeight: 256
      }, function(obj: any) {
        if(!obj.error) {
          (document.getElementById('result') as HTMLImageElement).src = obj.image;
        }
      });
    }
  }
}

export default App;
