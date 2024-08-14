// import React, { useState } from 'react';
// import './Payment.css';

// const PaymentPage = ({ adoptionFee }) => {
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [paymentDetails, setPaymentDetails] = useState({});

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//     setPaymentDetails({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails({ ...paymentDetails, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Payment Details:', paymentDetails);
//     // Add your form submission logic here
//   };

//   return (
//     <div className="payment-page">
//       <h1>Payment Page</h1>
//       <p className="adoption-fee">Adoption Fee: ₹3000{adoptionFee}</p>

//       <h2>Select Payment Method</h2>
//       <div className="payment-methods">
//         <button onClick={() => handlePaymentMethodChange('UPI')}>UPI</button>
//         <button onClick={() => handlePaymentMethodChange('Card')}>Card</button>
//         <button onClick={() => handlePaymentMethodChange('NetBanking')}>Net Banking</button>
//         {/* <button onClick={() => handlePaymentMethodChange('PayOnMeet')}>Pay on Meet</button> */}
//       </div>

//       {paymentMethod && (
//         <form onSubmit={handleSubmit} className="payment-form">
//           {paymentMethod === 'UPI' && (
//             <div className="payment-details">
//               <label>UPI ID:</label>
//               <input type="text" name="upiId" value={paymentDetails.upiId || ''} onChange={handleInputChange} required />
//               <button type="submit">Submit Payment</button>
//             </div>
//           )}

//           {paymentMethod === 'Card' && (
//             <div className="payment-details">
//               <label>Card Number:</label>
//               <input type="text" name="cardNumber" value={paymentDetails.cardNumber || ''} onChange={handleInputChange} required />
//               <label>Expiry Date:</label>
//               <input type="text" name="expiryDate" value={paymentDetails.expiryDate || ''} onChange={handleInputChange} required />
//               <label>CVV:</label>
//               <input type="text" name="cvv" value={paymentDetails.cvv || ''} onChange={handleInputChange} required />
//               <button type="submit">Submit Payment</button>
//             </div>
//           )}

//           {paymentMethod === 'NetBanking' && (
//             <div className="payment-details">
//               <label>Bank:</label>
//               <select name="bank" value={paymentDetails.bank || ''} onChange={handleInputChange} required>
//                 <option value="">Select Bank</option>
//                 <option value="BankA">Bank A</option>
//                 <option value="BankB">Bank B</option>
//                 <option value="BankC">Bank C</option>
//               </select>
//               <label>Account Number:</label>
//               <input type="text" name="accountNumber" value={paymentDetails.accountNumber || ''} onChange={handleInputChange} required />
//               <label>IFSC Code:</label>
//               <input type="text" name="ifsc" value={paymentDetails.ifsc || ''} onChange={handleInputChange} required />
//               <button type="submit">Submit Payment</button>
//             </div>
//           )}

//           {paymentMethod === 'PayOnMeet' && (
//             <div className="payment-details">
//               <p>You have chosen to pay on meet. Please bring the necessary amount to the visit.</p>
//               <button type="submit">Confirm</button>
//             </div>
//           )}


//         </form>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;
import { useLocation, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import './Payment.css';
import Sunnny from './images/Paymentpage/payment-page-image-3.jpg';
import axios from 'axios';

const PaymentPage = ({ adoptionFee }) => {
  // const location = useLocation();
  // const { fee, applicationId } = location.state || {};
  // console.log({fee});
  // console.log({applicationId});
  const appData =JSON.parse(localStorage.getItem('app-data'));
  console.log(appData);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    amount:'',
    adoptionApplication:null,
  });

  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentDetails({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const adoptionData = await axios.get(`http://localhost:8080/adoptionDetails/fetchById/${appData.id}`)
    console.log(adoptionData.data);

    const formData = {
      amount:appData.fee,
      adoptionApplication:adoptionData.data
    }

    try{
    const response = await axios.post("http://localhost:8080/paymnetDetails/insertPayment" , formData);
    console.log(response.data);
    }
    catch(error)
    {
      console.log("Errror occured while posting payment details ", error);
    }

    console.log('Payment Details:', paymentDetails);
    navigate('/Thankyou');
    
    // Add your form submission logic here
  };

  return (
    <div className="payment-background" style={{ backgroundImage: `url(${Sunnny})` }}>
      <div className='payment-module'>
        <div className="payment-page">
          <div className="payment-container">
            <h1>Payment</h1>
            <p className="adoption-fee">Adoption Fee: {appData.fee}</p>

            <h2>Select Payment Method</h2>
            <div className="payment-methods">
              <button onClick={() => handlePaymentMethodChange('UPI')}>UPI</button>
              <button onClick={() => handlePaymentMethodChange('Card')}>Card</button>
              <button onClick={() => handlePaymentMethodChange('NetBanking')}>Net Banking</button>
              {/* <button onClick={() => handlePaymentMethodChange('PayOnMeet')}>Pay on Meet</button> */}
            </div>

            {paymentMethod && (
              <form onSubmit={handleSubmit} className="payment-form">
                {paymentMethod === 'UPI' && (
                  <div className="payment-details">
                    <label>UPI ID:</label>
                    <input type="text" name="upiId" value={paymentDetails.upiId || ''} onChange={handleInputChange} required />
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="payment-details">
                    <label>Card Number:</label>
                    <input type="text" name="cardNumber" value={paymentDetails.cardNumber || ''} onChange={handleInputChange} required />
                    <label>Expiry Date:</label>
                    <input type="text" name="expiryDate" value={paymentDetails.expiryDate || ''} onChange={handleInputChange} required />
                    <label>CVV:</label>
                    <input type="text" name="cvv" value={paymentDetails.cvv || ''} onChange={handleInputChange} required />
                  </div>
                )}

                {paymentMethod === 'NetBanking' && (
                  <div className="payment-details">
                    <label>Bank:</label>
                    <select name="bank" value={paymentDetails.bank || ''} onChange={handleInputChange} required>
                      <option value="">Select Bank</option>
                      <option value="BankA">Bank A</option>
                      <option value="BankB">Bank B</option>
                      <option value="BankC">Bank C</option>
                    </select>
                    <label>Account Number:</label>
                    <input type="text" name="accountNumber" value={paymentDetails.accountNumber || ''} onChange={handleInputChange} required />
                    <label>IFSC Code:</label>
                    <input type="text" name="ifsc" value={paymentDetails.ifsc || ''} onChange={handleInputChange} required />
                  </div>
                )}

                {paymentMethod === 'PayOnMeet' && (
                  <div className="payment-details">
                    <p>You have chosen to pay on meet. Please bring the necessary amount to the meeting.</p>
                  </div>
                )}

                <button type="submit">Submit Payment</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;