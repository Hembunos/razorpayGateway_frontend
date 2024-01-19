import React, {  useState } from 'react';

const Form = ({ handleChange, handleSubmit, formData }) => {

  const [payButtonVisible, setPayButtonVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);


  const handlePayClick = () => {
    setPayButtonVisible(false);
    setShowForm(true);
  };

  return (
    <div className="form-container">
      {payButtonVisible && <button className='pay-button' onClick={handlePayClick}>DONATE</button>}

      {showForm && (
        <div>
          <form className="submit-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <br />

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <br />

            <label>
              Amount:
              <input
                type="text"
                name="money"
                value={formData.money}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <br />

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
