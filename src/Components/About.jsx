import React from 'react';
import Footer from './Footer';
import Aboutpic from './images/home-pic1.jpg';
import './About.css';
class About extends React.Component{

    render()
    {
        return(
            <div className='AboutPage'>
                <div class="heading">
                    <h1>about us</h1>
                </div>
                <section class="about">
                <div class="image">
                    <br></br>
                    <br></br>
                    <img src={Aboutpic} alt="Happy Shopping Hub" />
                </div>
                <div class="content">
                    <span>Welcome to PawsAndHome</span>
                    <h3>your destination for finding and adopting your new furry friend.</h3>
                    <p>Our mission is to connect loving homes with pets in need, ensuring a seamless, transparent, and enjoyable adoption process. We believe every pet deserves a loving home, and we are committed to making this a reality through our user-friendly platform and dedicated support.</p>
                    <p>At PawsAndHome, you can browse detailed profiles of pets available for adoption, complete with photos and essential information. Our streamlined adoption application process allows you to submit your application online easily, making the experience smooth and hassle-free. Our team of pet care experts is here to guide you through every step of the adoption process, from choosing the right pet to settling them into your home. We also offer secure online payment options for adoption fees, ensuring a safe transaction process.</p>
                    <p>PawsAndHome was created out of a passion for animals and a desire to improve the pet adoption landscape. Since our inception, we have successfully connected numerous pets with their forever homes. Our team comprises dedicated animal lovers and professionals united by our love for animals and commitment to making pet adoption accessible and efficient.</p>
                </div>
            </section>
            <Footer />
            </div>
        )
    }

}

export default About;