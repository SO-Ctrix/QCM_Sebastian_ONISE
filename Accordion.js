// components/Accordion.js
import { useState, createContext, useContext } from 'react';

const AccordionContext = createContext();

const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggleIndex }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ children, index }) => {
  const { openIndex } = useContext(AccordionContext);
  return <div>{children(openIndex === index)}</div>;
};

const AccordionHeader = ({ children, index }) => {
  const { openIndex, toggleIndex } = useContext(AccordionContext);

  return (
    <button
      onClick={() => toggleIndex(index)}
      aria-expanded={openIndex === index}
      aria-controls={`section-content-${index}`}
      id={`section-header-${index}`}
    >
      {children}
    </button>
  );
};

const AccordionPanel = ({ children, index }) => {
  const { openIndex } = useContext(AccordionContext);

  return (
    <div
      id={`section-content-${index}`}
      role="region"
      aria-labelledby={`section-header-${index}`}
      hidden={openIndex !== index}
    >
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };