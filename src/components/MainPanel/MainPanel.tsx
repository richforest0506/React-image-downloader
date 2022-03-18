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

export default function MainPanel(props: {images: ImageProps[], status: number[]}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [status, setStatus] = React.useState([0]);
  var images = props.images;  
  
  updatedStatus = props.status;

  async function download(image: ImageProps, num: number, i : number) {
    let url = num === 0? image.image_0: num === 1? image.image_1:image.image_2;
    let filename = image.id + "_image_" + num + url.slice(url.lastIndexOf('/'));
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res : any) => {
        fileDownload(res.data, filename);
        updatedStatus[i] = 2;
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
    for (let i=0; i<images.length; i++) {
      for (let j=0; j<3; j++) {       
        if (updatedStatus[i * 3 + j] === 2)
          continue;
        updatedStatus[i * 3 + j] = 1;
        setStatus({...status, ...updatedStatus});
        await download(images[i], j, i * 3 + j);
      }
    }
  };

  async function handleRetryDownloadImages() {
    for (let i=0; i<images.length; i++) {
      for (let j=0; j<3; j++) {       
        if (updatedStatus[i * 3 + j] === 2)
          continue;
        updatedStatus[i * 3 + j] = 1;
        setStatus({...status, ...updatedStatus});
        await download(images[i], j, i * 3 + j);
      }
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
        retryDownload={handleRetryDownloadImages}
        images={props.images}
        status={props.status}
      />
    </div>
  );
}
