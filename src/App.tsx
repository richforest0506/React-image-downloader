import React from 'react';
import './App.css';
import { ImageProps } from './utils/types';
import {arr} from './data/data'
import MainPanel from './components/MainPanel';

function createData (
  id: string,
  setId: number,
  image_0: string,
  image_1: string,
  image_2: string,
  createdAt: string,
): ImageProps {
  return {id, setId, image_0, image_1, image_2, createdAt};
 
}

var images: ImageProps[] = [];
var status: number[] =[];

function initData() {
  images = [];
  status = [];
  for (let i = 0; i < arr.length; i += 1) {
    const data = arr[i];
    images.push(createData(data.id, data.setId, data.image_0, data.image_1, data.image_2, data.createdAt));
    status.push(0, 0, 0);
  }

}

function App() {

  initData();

  return (
    <div className="App">
      <MainPanel images={images} status={status}/>
    </div>
  );
}

export default App;
