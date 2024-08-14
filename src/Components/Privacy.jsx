import React from "react";
import Navbar from './Navbar';
import './Privacy.css';
import Footer from "./Footer";


class Privacy extends React.Component{
    render()
    {
        return(
            <div className="PrivacyPage">
                <div class="heading">
                    <h1>Privacy Policy</h1>
                </div>
                <section className="privacy">
                    <div className="content">
                        <p>Welcome to PawsAndHome. We value your privacy and are committed to protecting your personal information. 
                           This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.pawsandhome.com.
                           Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                        <span>Information We Collect</span>
                        <p>When you visit our website, we may collect various types of information, including personal information such as your name, address, email address, and payment details. We collect this information when you place an order, sign up for an account, or interact with our website in other ways. Additionally, we may automatically collect certain non-personal information, such as your IP address, browser type, and device information.</p>
                        <span>How We Use Your Information</span>
                        <p>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</p>
                        <p>Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
                        <p>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you make payment or request information about our services from the Site.</p>
                        <span>Information Sharing and Security</span>
                        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary for the operation of our website and to provide you with our services. We take reasonable steps to protect the security of your information, but no data transmission over the internet is completely secure. Please be aware that you share your information with us at your own risk.</p>
                        <span>Your Choices</span>
                        <p>You have the right to access, correct, or delete your personal information. You can also opt-out of receiving marketing communications from us.</p>
                    </div>
                </section>
                <Footer />
                
            </div>
        )
    }
}
export default Privacy;