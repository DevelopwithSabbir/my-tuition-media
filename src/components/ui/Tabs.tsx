import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  value,
  children,
  className = '',
  activeTab,
  setActiveTab
}) => {
  const isActive = activeTab === value;
  
  return (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        isActive 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({
  value,
  children,
  activeTab
}) => {
  if (activeTab !== value) return null;
  return <div>{children}</div>;
};