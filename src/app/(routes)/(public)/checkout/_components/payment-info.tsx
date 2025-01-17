import React from "react";

const PaymentInfo = () => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Payment Information
        </h2>

        <p className="text-center text-gray-600 mb-4">
          You can send payments through the following methods:
        </p>

        <div className="space-y-4">
          {/* JazzCash */}
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600">JazzCash</h3>
            <p className="text-gray-700 mt-2">
              Account Number: <span className="font-mono">+92 306 3799841</span>
            </p>
            <p className="text-gray-700">
              Name: <span className="font-medium">Haseeb Ahmad</span>
            </p>
          </div>

          {/* Easypaisa */}
          <div className="bg-green-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-green-600">Easypaisa</h3>
            <p className="text-gray-700 mt-2">
              Account Number: <span className="font-mono">+92 306 3799841</span>
            </p>
            <p className="text-gray-700">
              Name: <span className="font-medium">Haseeb Ahmad</span>
            </p>
          </div>

          {/* Bank Card */}
          <div className="bg-yellow-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-yellow-600">Bank Card</h3>
            <p className="text-gray-700 mt-2">
              Card Number:{" "}
              <span className="font-mono">1234 5678 9012 3456</span>
            </p>
            <p className="text-gray-700">
              Bank: <span className="font-medium">ABC Bank</span>
            </p>
            <p className="text-gray-700">
              Name: <span className="font-medium">Adrian Venoin</span>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Please ensure to send payment via one of these secure methods. For
            any queries, contact us directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
