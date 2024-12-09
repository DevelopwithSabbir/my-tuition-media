import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Security settings coming soon</h3>
          <p className="mt-1 text-sm text-gray-500">
            Advanced security settings will be available here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;