import React from 'react';
import './App.css';
import { ImageProps } from './utils/types';
import {arr} from './data/data'
import MainPanel from './components/MainPanel';

function createData (
  id: string,
  setId: number,
  imageUrls: string[],
  createdAt: string,
): ImageProps {
  return {id, setId, imageUrls, createdAt};
 
}

var images: ImageProps[] = [];
var status: number[] =[];

function initData() {
  images = [];
  status = [];
  for (let i = 0; i < arr.length; i += 1) {
    const data = arr[i];
    var imageUrls:string[] = Object.values(data).filter(item => String(item).includes('https://')) as string [];
    images.push(createData(data.id, data.setId, imageUrls, data.createdAt));
    for (let j = 0; j<imageUrls.length; j++)
    status.push(0);
  }
  console.log(images);
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

