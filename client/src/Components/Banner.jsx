import { Box } from "@mui/material";
import { useContext } from "react";
import { userContext } from "../Context/context";

const Banner = () => {

    const {user,setUser} = useContext(userContext)
    
    return ( 
        <>
            {user == null ?
            <Box className='banner-box'>
                <Box>
                    <h1 className="banner-text">Welcome to MY WEB APP</h1>
                </Box>
            </Box>
            :
            <Box sx={{ textAlign:'center' }}>
                <img className="profile-image" src={user?.image ? `http://localhost:4000/public/images/${user?.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" />
                <h2>{user?.firstName + ' ' + user?.lastName}</h2>
                <h4>{user?.email}</h4>
                <h4>{user?.phoneNo}</h4>
            </Box>
            }
        </>
     );
}
 
export default Banner;