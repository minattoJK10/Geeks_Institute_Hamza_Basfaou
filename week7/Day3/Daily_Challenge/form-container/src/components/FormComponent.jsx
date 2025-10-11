import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            ✈️ Travel Form
          </h1>

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full"
            />
          </div>

          {/* Age */}
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={data.age}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full"
          />

          {/* Gender */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Gender</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={handleChange}
                  className="text-indigo-500 focus:ring-indigo-400"
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={handleChange}
                  className="text-indigo-500 focus:ring-indigo-400"
                />
                Female
              </label>
            </div>
          </div>

          {/* Destination */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">
              Select your destination
            </p>
            <select
              name="destination"
              value={data.destination}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="">-- Please Choose a destination --</option>
              <option value="Japan">Japan</option>
              <option value="Brazil">Brazil</option>
              <option value="France">France</option>
              <option value="USA">USA</option>
            </select>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">
              Dietary restrictions
            </p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="nutsFree"
                  checked={data.nutsFree}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                Nuts free
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="lactoseFree"
                  checked={data.lactoseFree}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                Lactose free
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  name="vegan"
                  checked={data.vegan}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                Vegan
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Submit
          </button>
        </form>

        {/* Display Data */}
        <div className="mt-8 bg-gray-50 rounded-lg p-5 shadow-inner border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Entered Information
          </h2>
          <p className="text-gray-700">
            <i>Your name:</i> {data.firstName} {data.lastName}
          </p>
          <p className="text-gray-700">
            <i>Your age:</i> {data.age}
          </p>
          <p className="text-gray-700">
            <i>Your gender:</i> {data.gender}
          </p>
          <p className="text-gray-700">
            <i>Your destination:</i> {data.destination}
          </p>
          <p className="text-gray-700">
            <i>Your dietary restrictions:</i>{" "}
            {[
              data.nutsFree && "Nuts free",
              data.lactoseFree && "Lactose free",
              data.vegan && "Vegan",
            ]
              .filter(Boolean)
              .join(", ") || "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
