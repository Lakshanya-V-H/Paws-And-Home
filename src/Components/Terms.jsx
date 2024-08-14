import React from 'react';
import Footer from './Footer';
import './Terms.css';

class Terms extends React.Component{
    render()
    {
        return(
            <div className='TermsPage'>
                    <div class="heading">
                    <h1>Terms & Conditions</h1>
                </div>
                <section className="terms">
                    <div className="content">
                        <p>Welcome to PawsAndHome. By using our website www.pawsandhome.com, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
                        {/* You agree to use this website for lawful purposes only and in a manner consistent with all applicable laws, regulations, and these Terms and Conditions. You must not use the website in any way that may cause damage to the website or impair its availability or accessibility.</p> */}
                        {/* <span>Use of the Website</span> */}
                        By accessing and using this website, you accept and agree to be bound by these terms and conditions. If you do not agree, please do not use the website.
                        </p>
                        <span>User Accounts</span>
                        <p>To access certain features, you may need to register an account. You agree to provide accurate and current information and to keep it updated.</p>
                        <span>Acceptable Use</span>
                        <p>You agree not to use the website in any way that may cause damage or impair the website's availability. Prohibited activities include, but are not limited to, distributing malware, engaging in unlawful activities, or attempting to gain unauthorized access to the website.</p>
                        <span>Limitation of Liability</span>
                        <p>PawsAndHome is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the website, even if we have been advised of the possibility of such damages.</p>
                        <span>Changes to Terms</span>
                        <p>We may update these terms from time to time. The updated terms will be effective upon posting on the website. Please review these terms regularly to stay informed of any changes.</p>
                        {/* <span>Governing Law</span>
                        {/* <p>We reserve the right to revise and update these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any such changes will constitute your acceptance of the updated Terms and Conditions.</p> 
                        <p></p> */}
                    </div>
                </section>
                <Footer />
                {/* <section class="credit">PawsAndHome</section> */}
            </div>
        )
    }

}

export default Terms;