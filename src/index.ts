document.addEventListener('DOMContentLoaded', () => {
   const addButton = document.getElementById('attr-add');

   if (addButton) {
      addButton.addEventListener('click', async () => {
         const element = await webflow.getSelectedElement();

         if (element) {
            const attributeNameInput = document.getElementById('Name') as HTMLInputElement;
            const attributeValueInput = document.getElementById('Value') as HTMLInputElement;

            if (element.customAttributes) {
               const attributeName = attributeNameInput.value.trim();
               const attributeValue = attributeValueInput.value.trim();

               if (attributeName !== '' && attributeValue !== '') {
                  element.setCustomAttribute(attributeName, attributeValue);
                  await element.save();

                  webflow.notify({ type: 'Success', message: 'Attribute added successfully!' });

                  // Clear input values
                  attributeNameInput.value = '';
                  attributeValueInput.value = '';
               } else {
                  webflow.notify({ type: 'Error', message: 'Invalid input. Attribute Name and Value cannot be empty.' });
               }
            } else {
               webflow.notify({ type: 'Error', message: 'No custom attributes available' });
            }
         } else {
            webflow.notify({ type: 'Error', message: 'No element selected' });
         }
      });
   } else {
      webflow.notify({ type: 'Error', message: 'Add Attribute button not found' });
   }
});