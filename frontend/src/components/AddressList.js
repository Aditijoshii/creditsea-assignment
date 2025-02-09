import React from "react";

const AddressList = ({ addresses }) => {
  if (!addresses?.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registered Addresses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div key={index} className="border p-4 rounded">
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            {address.line3 && <p>{address.line3}</p>}
            <p>
              {address.city}, {address.state} - {address.pinCode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressList;
