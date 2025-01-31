import React from 'react';
import { Accordion, AccordionItem } from '@heroui/accordion';

const firstArray = [
  { id: '1', title: 'Item 1', content: 'Content 1' },
  { id: '2', title: 'Item 2', content: 'Content 2' },
];

const secondArray = [
  { id: '3', title: 'Item 3', content: 'Content 3' },
  { id: '4', title: 'Item 4', content: 'Content 4' },
];

const array = [...firstArray, ...secondArray];

const AccordionExample: React.FC = () => {
  return (
    <Accordion>
      {[...firstArray, ...secondArray].map(item => (
        <AccordionItem key={item.id} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionExample;
