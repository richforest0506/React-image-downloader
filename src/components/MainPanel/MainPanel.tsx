import * as React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';

import Button from '@mui/material/Button';

import StatusDialog from '../TableImages/StatusDialog';
import {ImageProps} from '../../utils/types'

async function delay(milliseconds: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

var updatedStatus: number[];

export default function MainPanel(
    props: {
      images: ImageProps[], 
      status: number[]
    }
  ) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [status, setStatus] = React.useState([0]);
  const [progress, setProgress] = React.useState(0);
  var images = props.images;  
  
  updatedStatus = props.status;

  async function download(image: ImageProps, num: number, i : number) {
    let url = image.imageUrls[num];
    let filename = image.id + "_image_" + num + url.slice(url.lastIndexOf('/'));
    if (localStorage.getItem(filename) == "downloaded") {
      updatedStatus[i] = 2;
      setStatus({...status, ...updatedStatus});
      return;
    }      
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res : any) => {
        fileDownload(res.data, filename);
        updatedStatus[i] = 2;
        localStorage.setItem(filename, "downloaded");
        setStatus({...status, ...updatedStatus});
    })
    .catch(function (error: any) {
      updatedStatus[i] = 3;
      setStatus({...status, ...updatedStatus});
    });
    await delay(500);    
  }

  async function handleDownloadImages() {
    setOpenDialog(true);
  };

  async function handleStartDownloadImages() {
    for (let i=0; i<images.length; i++) {
      for (let j=0; j<images[i].imageUrls.length; j++) {       
        if (updatedStatus[i * images[i].imageUrls.length + j] === 2)
          continue;
        updatedStatus[i * images[i].imageUrls.length + j] = 1;
        setStatus({...status, ...updatedStatus});
        await download(images[i], j, i * images[i].imageUrls.length + j);
      }
      setProgress(i + 1);
    }
  };

  async function handleRetryDownloadImages() {
    for (let i=0; i<images.length; i++) {
      for (let j=0; j<images[i].imageUrls.length; j++) {       
        if (updatedStatus[i * images[i].imageUrls.length + j] === 2)
          continue;
        updatedStatus[i * images[i].imageUrls.length + j] = 1;
        setStatus({...status, ...updatedStatus});
        await download(images[i], j, i * images[i].imageUrls.length + j);
      }
      setProgress(i + 1);
    }
  };

  return (
    <div>
      <Button variant="contained" className='pushbutton' sx={{margin: '30px'}}
        onClick={handleDownloadImages}
      >
        Download
      </Button>
      <StatusDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        startDownload={handleStartDownloadImages}
        retryDownload={handleRetryDownloadImages}
        images={props.images}
        status={props.status}
        progress = {progress}
      />
    </div>
  );
}
