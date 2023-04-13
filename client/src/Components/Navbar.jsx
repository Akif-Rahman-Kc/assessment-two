import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/context';

export default function Navbar() {

    const navigate = useNavigate()

    const {user,setUser} = React.useContext(userContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Web App
          </Typography>
          {
            user ? '' : <>
              <Button onClick={()=>navigate('/register')} color="inherit">Register</Button>/
              <Button onClick={()=>navigate('/login')} color="inherit">Login</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}