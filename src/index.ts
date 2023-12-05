document.addEventListener('DOMContentLoaded', () => {
   const addButton = document.getElementById('attr-add');

   if (addButton) {
      addButton.addEventListener('click', async () => {
         console.log('Add Attribute button clicked');

         const element = await webflow.getSelectedElement();

         if (element) {
            console.log('Selected element:', element);

            // Inputs
            const attributeNameInput = document.getElementById('Name') as HTMLInputElement;
            const attributeValueInput = document.getElementById('Value') as HTMLInputElement;

            if (element.customAttributes) {
               console.log('Custom attributes present');

               // Get attribute name and value from inputs
               const attributeName = attributeNameInput.value.trim();
               const attributeValue = attributeValueInput.value.trim();

               // Check if inputs are not empty
               if (attributeName !== '' && attributeValue !== '') {
                  console.log('Attribute Name:', attributeName);
                  console.log('Attribute Value:', attributeValue);

                  // Add the new attribute
                  element.setCustomAttribute(attributeName, attributeValue);

                  // Save changes to the element
                  await element.save();
                  console.log('Element saved');

                  // Notify success
                  webflow.notify({ type: 'Success', message: 'Attribute added successfully!' });
               } else {
                  console.log('Invalid input. Attribute Name and Value cannot be empty.');
               }
            } else {
               console.log('No custom attributes available');
            }
         } else {
            console.log('No element selected');
         }
      });
   } else {
      console.error('Add Attribute button not found.');
   }
});
