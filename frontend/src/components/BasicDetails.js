import React from "react";

const BasicDetails = ({ details }) => {
  if (!details) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Basic Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name</p>
          <p className="font-medium">{`${details.name.firstName} ${details.name.lastName}`}</p>
        </div>
        <div>
          <p className="text-gray-600">Mobile</p>
          <p className="font-medium">{details.mobilePhone}</p>
        </div>
        <div>
          <p className="text-gray-600">PAN</p>
          <p className="font-medium">{details.pan}</p>
        </div>
        <div>
          <p className="text-gray-600">Credit Score</p>
          <p className="font-medium">{details.creditScore}</p>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
