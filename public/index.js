var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('attr-add');
    if (addButton) {
        addButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Add Attribute button clicked');
            const element = yield webflow.getSelectedElement();
            if (element) {
                console.log('Selected element:', element);
                // Inputs
                const attributeNameInput = document.getElementById('Name');
                const attributeValueInput = document.getElementById('Value');
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
                        yield element.save();
                        console.log('Element saved');
                        // Notify success
                        webflow.notify({ type: 'Success', message: 'Attribute added successfully!' });
                    }
                    else {
                        console.log('Invalid input. Attribute Name and Value cannot be empty.');
                    }
                }
                else {
                    console.log('No custom attributes available');
                }
            }
            else {
                console.log('No element selected');
            }
        }));
    }
    else {
        console.error('Add Attribute button not found.');
    }
});
