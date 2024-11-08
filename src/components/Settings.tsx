import React from 'react';

const Settings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Site Name</label>
            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="My Admin Portal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Zone</label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span className="ml-2">Enable Dark Mode</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;