import React, { useState, useEffect } from 'react';
import { HotkeySection } from './components/HotkeySection';
import { getDefaultHotkeys, saveHotkeysConfig } from './utilities/configUtility';
import { hotkeySections } from './data/hotkeySections';


const CustomizeHotkeys: React.FC = () => {
  const [selectedHotkeys, setSelectedHotkeys] = useState<{ [key: string]: string }>({});
  const [resetCounter, setResetCounter] = useState(0); // dummy state to force HotkeySection re-render when clicking the reset defaults button

  const resetDefaults = async () => {
    const defaultHotkeys = getDefaultHotkeys();
    await saveHotkeysConfig(defaultHotkeys);
    setResetCounter(resetCounter + 1);
  };

  useEffect(() => {
    console.log('Reset counter incremented:', resetCounter);

  }, [resetCounter])


  return (
    <div className="flex flex-col justify-center gap-6 mb-10">
      <h1 className="text-3xl font-bold">Customize Hotkeys</h1>
      {hotkeySections.map((section, index) => (
        <HotkeySection
          key={index}
          title={section.title}
          actions={section.actions}
          selectedHotkeys={selectedHotkeys}
          setSelectedHotkeys={setSelectedHotkeys}
          resetCounter={resetCounter}
        />
      ))}
      <hr />
      <div className="flex justify-center">
        <button
          onClick={resetDefaults}
          className="inline-block w-28 bg-blue-500 text-white text-sm cursor-pointer transition-transform duration-200 ease-in h-[40px] rounded px-3 py-2 hover:bg-blue-400"
        >
          Reset Defaults
        </button>
      </div>
    </div>
  );
};

export default CustomizeHotkeys;
