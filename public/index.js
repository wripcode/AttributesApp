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
            const element = yield webflow.getSelectedElement();
            if (element) {
                const attributeNameInput = document.getElementById('Name');
                const attributeValueInput = document.getElementById('Value');
                if (element.customAttributes) {
                    const attributeName = attributeNameInput.value.trim();
                    const attributeValue = attributeValueInput.value.trim();
                    if (attributeName !== '' && attributeValue !== '') {
                        element.setCustomAttribute(attributeName, attributeValue);
                        yield element.save();
                        webflow.notify({ type: 'Success', message: 'Attribute added successfully!' });
                        // Clear input values
                        attributeNameInput.value = '';
                        attributeValueInput.value = '';
                    }
                    else {
                        webflow.notify({ type: 'Error', message: 'Invalid input. Attribute Name and Value cannot be empty.' });
                    }
                }
                else {
                    webflow.notify({ type: 'Error', message: 'No custom attributes available' });
                }
            }
            else {
                webflow.notify({ type: 'Error', message: 'No element selected' });
            }
        }));
    }
    else {
        webflow.notify({ type: 'Error', message: 'Add Attribute button not found' });
    }
});
