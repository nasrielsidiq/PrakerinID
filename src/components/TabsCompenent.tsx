import { SetStateAction } from "react";

interface TabsComponentProps<T> {
  data: T[];
  activeTab: T;
  setActiveTab: (value: SetStateAction<T>) => void;
  getKey?: (item: T) => string | number;
}

const TabsComponent = <T,>({
  data,
  activeTab,
  setActiveTab,
  getKey,
}: TabsComponentProps<T>) => {
  return (
    <>
      {data.map((tab) => (
        <button
          key={getKey ? getKey(tab) : String(tab)}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
            activeTab === tab
              ? "bg-accent text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:text-gray-800"
          }`}
        >
          {String(tab)}
        </button>
      ))}
    </>
  );
};

export default TabsComponent;
