import React from "react";
import ConfigurationForm from "./ConfigurationForm";



const ConfigurationContent = () => {
  return (
    <main className="flex-grow">
      
      <div className="w-full max-w-2xl mx-auto  flex justify-center items-start">
        <div className="w-full">
          <ConfigurationForm/>
        </div>
      </div>

    </main>
  );
};

export default ConfigurationContent;