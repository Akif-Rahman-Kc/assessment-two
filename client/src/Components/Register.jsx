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
import axios from 'axios'
import { userContext } from '../Context/context';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

export default function Register() {

    const navigate = useNavigate()

    const [otpBox, setOtpBox] = React.useState(false)
    const [ firstNameErr, setFirstNameErr ] = React.useState(false)
    const [ firstNameError, setFirstNameError ] = React.useState('')
    const [ emailErr, setEmailErr ] = React.useState(false)
    const [ emailError, setEmailError ] = React.useState('')
    const [ passwordErr, setPasswordErr ] = React.useState(false)
    const [ passwordError, setPasswordError ] = React.useState('')
    const [ imageErr, setImageErr ] = React.useState(false)
    const [ imageError, setImageError ] = React.useState('')
    const [ totalRequired, setTotalRequired ] = React.useState('')
    const [ phoneNoErr, setPhoneNoErr ] = React.useState(false)
    const [ phoneNoError, setPhoneNoError ] = React.useState('')
    const [ otpErr, setOtpErr ] = React.useState(false)
    const [ otpError, setOtpError ] = React.useState('')
    const [ data, setData ] = React.useState({
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      image:'',
      phoneNo:'',
      otp:''
    })

    const {user,setUser} = React.useContext(userContext)


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(data.firstName && data.email && data.password && data.phoneNo){
        let regName =/^[a-zA-Z]+$/;
        let regPhone =/^[0-9]+$/;
        let regImage = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        setTotalRequired('')
        if(regName.test(data.firstName)){
          setFirstNameErr(false)
          setFirstNameError('')
          if(regEmail.test(data.email)){
            setEmailErr(false)
            setEmailError('')
            if( data.password.length >= 6 ){
              setPasswordErr(false)
              setPasswordError('')
              if(regPhone.test(data.phoneNo)){
                setPhoneNoErr(false)
                setPhoneNoError('')
                if(data.phoneNo.length === 10){
                    setPhoneNoErr(false)
                    setPhoneNoError('')
                    if (data.image.name) {
                      if (!regImage.exec(data.image.name)) {
                        setImageErr(true)
                        setImageError('Please choose correct format')
                      } else {
                        setImageErr(false)
                        setImageError('')
                        // const toBase64 = (image) =>
                        // new Promise((resolve, reject) => {
                        //     const reader = new FileReader();
                        //     reader.readAsDataURL(image);
                        //     reader.onload = () => resolve(reader.result);
                        //     reader.onerror = (error) => reject(error);
                        // }).catch((err) => {
                        //     console.log(err);
                        // });
                        // const imgBase = await toBase64(data.image);
                      }
                    }
                    if(!otpBox){
                        axios.post('http://localhost:4000/get_otp', {phoneNo:data.phoneNo}).then((res)=>{
                            if (res.data.status === 'success') {
                                setOtpBox(true)
                            }else{
                                setPhoneNoErr(true)
                                setPhoneNoError('This phone no is already registered')
                            }
                        })
                    }else{
                        const formdata = new FormData();
                        formdata.append('myFile',data.image,data.image.name)
                        formdata.append('firstName',data.firstName)
                        formdata.append('lastName',data.lastName)
                        formdata.append('email',data.email)
                        formdata.append('password',data.password)
                        formdata.append('phoneNo',data.phoneNo)
                        formdata.append('otp',data.otp)
                        axios.post('http://localhost:4000/verify_otp', formdata).then((res)=>{
                            if (res.data.status === 'success') {
                                setUser(res.data.user)
                                setOtpBox(false)
                                navigate('/login')
                            }else{
                                setOtpErr(true)
                                setOtpError('Otp number in incorrect')
                            }
                        })
                    }
                  }else{
                    setPhoneNoErr(true)
                    setPhoneNoError('Please enter 10 digit')
                  }
              }else{
                setPhoneNoErr(true)
                setPhoneNoError('Enter valid phone no')
              }
            }else{
              setPasswordErr(true)
              setPasswordError('Minimum 6 character')
            }
          }else{
            setEmailErr(true)
            setEmailError('Please enter valid Email')
          }
       }else{
        setFirstNameErr(true)
        setFirstNameError('Please enter valid Name')
       }
      }else{
        setTotalRequired('Please enter your Details')
      }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            REGISTER
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ backgroundColor:'#ffc5c5' , borderRadius:'3px' , pl:2 }}>
            <p style={{ color:'red' }}>{totalRequired}</p>
          </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                  error={firstNameErr}
                  helperText={firstNameError}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                  error={emailErr}
                  helperText={emailError}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                  error={passwordErr}
                  helperText={passwordError}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="myFile"
                  label="Photo (optional)"
                  type="file"
                  id="file"
                  onChange={(e)=>setData({...data,image:e.target.files[0]})}
                  error={imageErr}
                  helperText={imageError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNo"
                label="Phone No"
                type="phoneNo"
                id="phoneNo"
                onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                error={phoneNoErr}
                helperText={phoneNoError}
                />
              </Grid>
              { otpBox &&
                <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="OTP"
                type="otp"
                id="otp"
                onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}
                error={otpErr}
                helperText={otpError}
                />
              </Grid>
              }
            </Grid>
            {otpBox ? 
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
            :
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Send otp
                </Button>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}