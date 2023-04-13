import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Context/context';

const theme = createTheme();

export default function LogIn() {

    const navigate = useNavigate()

    const {user,setUser} = React.useContext(userContext)

    const [ email, setEmail ] = React.useState(false)
    const [ emailError, setEmailError ] = React.useState('')
    const [ password, setPassword ] = React.useState(false)
    const [ passwordError, setPasswordError ] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
        phoneNo: data.get('email'),
        password: data.get('password'),
    }
    if (data.phoneNo && data.password) {
        setEmail(false)
        setEmailError('')
        setPassword(false)
        setPasswordError('')
        axios.post('http://localhost:4000/login', data).then((res)=>{
            if (res.data.status === 'success') {
                console.log(res.data);
                setUser(res.data.user)
                navigate('/')
            } else {
                if (res.data.phoneNo) {
                    setEmail(true)
                    setEmailError('PhoneNo is incorrect')
                } else {
                    setPassword(true)
                    setPasswordError('Password is incorrect')
                }
            }
        })
    }else{
        if (data.email === '') {
            setEmail(true)
            setEmailError('Please enter phoneNo')
        }
        if (data.password === '') {
            setPassword(true)
            setPasswordError('Please enter password')
        }
    }
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Phone Number"
              name="email"
              autoComplete="phoneNo"
              error={email}
              helperText={emailError}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={password}
              helperText={passwordError}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}