import React, { useState, useEffect } from 'react';

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  // Example: Load offers from an API or some data source
  useEffect(() => {
    // Simulated offers data
    const offersData = [
      { id: 1, name: 'OFFER 2', description: 'Two Time.. Lunch  & Dinner', startDate: new Date('2024-02-01'), endDate: new Date('2024-02-15'), price: 1999 },
      { id: 2, name: 'OFFER 1', description: 'Two Time.. Lunch  & Dinner', startDate: new Date('2024-02-10'), endDate: new Date('2024-02-28'), price: 1499 },
      { id: 3, name: 'OFFER 2', description: 'One Time Lunch + Patiala Lassi', startDate: new Date('2024-02-20'), endDate: new Date('2024-03-10'), price: 999 }
    ];

    setOffers(offersData);
  }, []);

  // Function to filter active offers based on current date
  const getActiveOffers = () => {
    const currentDate = new Date();
    return offers.filter(offer => currentDate >= offer.startDate && currentDate <= offer.endDate);
  };

  return (
    <div>
      <h2 style={{color:"#070F2B"}}>Student Pass Active Offers</h2>

      <ul >
        {getActiveOffers().map(offer => (
          <li key={offer.id}>
            <hr/>
            <h3 style={{color:"#3D3B40"}}>{offer.name}</h3>
            <hr/>
            <i><b><p style={{color:"#3E3232"}}>{offer.description}</p></b></i>
            <p><b style={{color:"black"}}>Price :</b> RS.{offer.price}</p>
            <p style={{color:"#000000"}}>Start Date : {offer.startDate.toLocaleDateString()}</p>
            <p style={{color:"#000000"}}>End Date : {offer.endDate.toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferList;
