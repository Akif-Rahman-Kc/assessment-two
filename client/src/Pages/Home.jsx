import Banner from "../Components/Banner";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate()
    
    return (
        <>
            <Navbar/>
            <Banner/>
        </>
     );
}
 
export default Home;