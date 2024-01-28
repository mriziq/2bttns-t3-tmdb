"use client"

import React, { useState } from 'react';

const PhoneNumberForm = () => {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(['']);

    const handlePhoneNumberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newPhoneNumbers = phoneNumbers.map((phoneNumber, i) => {
            if (index === i) {
                return event.target.value;
            } else {
                return phoneNumber;
            }
        });

        setPhoneNumbers(newPhoneNumbers);
    };

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle the phone number submission logic here
        console.log('Submitted Phone Numbers:', phoneNumbers);
        // This is where you might send the phoneNumbers to a server or another function
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {phoneNumbers.map((phoneNumber, index) => (
                <input
                    key={index}
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => handlePhoneNumberChange(index, event)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-black"
                    placeholder="Enter phone number"
                />
            ))}
            <button type="button" onClick={addPhoneNumber} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Add Phone Number
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                Submit
            </button>
        </form>
    );
};

export default PhoneNumberForm;
