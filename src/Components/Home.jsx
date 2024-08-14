
import React from "react";
import { Link } from "react-router-dom";
import Homeimg1 from './images/home-pic3.jpg'
import B1 from './images/home-pic2.jpg'
import B2 from './images/home-pic1.jpg'
import B3 from './images/home-pic5.jpg'
import V1 from './Videos/video1.mp4';
import Footer from "./Footer";
import './Style.css';

class Home extends React.Component{
    render()
    {
        return(
            <div>
                <section class="home">
                    <div class ="slides-container">
                        <div class="slide active">
                            <div class="content">
                            <span>Your Perfect Furry Companion Awaits !!!</span>
                            <h3>Find your best friend and give them a forever home</h3>
                            <Link to={`/Pets`} class="btn">Adopt Pet</Link>
                            </div>
                            <div class="image">
                                <img src={Homeimg1} alt="Banner"></img>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="banner-container">
                    <div class="banner">
                        <img src={B1} alt="banner1"></img>
                        <div class="content">
                            {/* <span>Woof Wonders</span> */}
                            <h3>MeowMates</h3>
                            <Link to={`/Cat`} class="btn">Adopt now</Link>
                        </div>
                    </div>
                    <div class="banner">
                        <img src={B2} alt="kitchen-ware-banner"></img>
                        {/* <video src={V1} loop  muted alt="" /> */}
                        <div class="content">
                            {/* <span>Meow Mates</span> */}
                            <h3>WoofWonders</h3>
                            <Link to={`/Dog`} class="btn">Adopt now</Link>
                        </div>
                    </div>
                    <div class="banner">
                        <img src={B3} alt="toys-banner"></img>
                        <div class="content">
                            {/* <span>Bunny Buddies</span> */}
                            <h3>BunnyBuddies</h3>
                            <Link to={`/Rabbit`} class="btn">Adopt now</Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Home;