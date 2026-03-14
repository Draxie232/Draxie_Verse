import "../styles/home.css";
import { useNavigate } from "react-router-dom";


function Home(){

  const navigate = useNavigate();
  return(
    <div className="home-container">

      <video autoPlay muted loop className="bg-video">
        <source src="/videos/bg-video.mp4" type="video/mp4"/>
      </video>

      <div className="overlay"></div>

      <div className="home-content">

        <h1 className="logo">DRAXIE VERSE</h1>
        <p className="tagline">Space for Creative Thinkers</p>

        <div className="buttons">
          <button onClick={()=>navigate("/login")}>Login</button>
          <button>Sign Up</button>
        </div>

      </div>

    </div>
  )
}

export default Home