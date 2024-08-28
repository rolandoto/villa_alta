import { useState } from "react";

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="bg-gray-100 border ease-in duration-300  mb-4">
        <button
          className="w-full text-left px-4 py-2 flex  items-center justify-between"
          onClick={toggleAccordion}
        >
          <span className="font-" >{question}</span>
          <span className="text-xl">{isOpen ? '-' : '+'}</span>
        </button>
          {isOpen && (
            <div className=" ease-in duration-300 px-4 py-2 text-gray-600">
              {answer}
            </div>
          )}
      </div>
    );
  };


  export default AccordionItem