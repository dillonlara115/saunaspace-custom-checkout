import React, { useState, useEffect } from 'react';
import {
  reactExtension,
  TextField,
  BlockStack,
  useApplyNoteChange,
  Checkbox,
} from '@shopify/ui-extensions-react/checkout';

// Set the entry point for the extension
export default reactExtension('purchase.checkout.shipping-option-list.render-after', () => <App />);

function App() {
  // Set up the checkbox state
  const [checked, setChecked] = useState(false);
  const [note, setNote] = useState('');

  // Set a function to handle updating the order note
  const applyNoteChange = useApplyNoteChange();

  // Handle the checkbox change event
  const handleChange = () => {
    setChecked(!checked);
  };

  // Handle the note change event
  const handleNoteChange = (newValue) => {
    setNote(newValue);
  
    if (newValue) {
      applyNoteChange({ type: 'updateNote', note: newValue });
    } else {
      applyNoteChange({ type: 'removeNote' });
    }
  }
  
  useEffect(() => {
   // console.log(note); // This will log the updated note after render
  }, [note]);
  

  // Render the extension components
  return (
    <BlockStack>
      <Checkbox checked={checked} onChange={handleChange}>
        Provide Order Notes
      </Checkbox>
      {checked && (
        <TextField
          label="Order Notes"
          multiline={3}
          onChange={handleNoteChange}
          value={note}
        />
      )}
    </BlockStack>
  );
}
