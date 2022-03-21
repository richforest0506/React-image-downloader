import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { TransitionProps } from '@mui/material/transitions';

import TableImages from './TableImages'

import {ImageProps} from '../../utils/types'
import { DialogActions } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props: LinearProgressProps & { value: number , amount: number}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' , mt:3}}>
      <Box sx={{ width: '100%', mr: 2 , ml: 2}}>
        <LinearProgress variant="determinate" value = { (props.value / props.amount) * 100} />
      </Box>
      <Box sx={{ minWidth: 60 }}>
        <Typography>
          {props.value + " / " + props.amount}
        </Typography>        
      </Box>
    </Box>
  );
}

export default function StatusDialog(
    props: {
      openDialog:boolean, 
      setOpenDialog:any, 
      startDownload:any, 
      retryDownload:any, 
      images: ImageProps[], 
      status:number[],
      progress:number
    }
  ) {
  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const handleStart = () => {
    props.startDownload();
  }
  const handleRetry = () => {
    props.retryDownload();
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={props.openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Downloading Status
            </Typography>
            
          </Toolbar>
        </AppBar>
        
        <TableImages images={props.images} status={props.status}/>
        <LinearProgressWithLabel value={props.progress} amount={props.images.length} />
        <DialogActions>
            <Button autoFocus variant="contained" onClick={handleStart}>
              Start
            </Button>
            <Button variant="contained" onClick={handleRetry}>
              Retry failed items
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
