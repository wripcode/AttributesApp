var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(this, void 0, void 0, function* () {
    try {
        const allElements = yield webflow.getAllElements();
        const attrWrapper = document.getElementById("attr-wrapper");
        if (!attrWrapper) {
            console.error("Error: Could not find the wrapper element.");
            return;
        }
        for (const element of allElements) {
            const customAttributes = element.customAttributes;
            if (customAttributes && Object.keys(customAttributes).length > 0) {
                createAttributeListing(attrWrapper, element.id, customAttributes);
            }
            if ("getAllCustomAttributes" in element) {
                const allCustomAttributes = element.getAllCustomAttributes();
                if (allCustomAttributes.length !== 0) {
                    createAttributeListing(attrWrapper, element.id, allCustomAttributes);
                }
            }
        }
        webflow.notify({ type: "Success", message: "Custom attributes retrieved successfully!" });
        // Adding attribute with inputes
        document.addEventListener("keydown", (event) => __awaiter(this, void 0, void 0, function* () {
            if (event.key === "Enter") {
                try {
                    const element = yield webflow.getSelectedElement();
                    if (element) {
                        const attributeNameInput = document.getElementById("Name");
                        const attributeValueInput = document.getElementById("Value");
                        if (element.customAttributes) {
                            const attributeNameInput = document.getElementById("Name");
                            const attributeValueInput = document.getElementById("Value");
                            const attributeName = attributeNameInput.value.trim();
                            const attributeValue = attributeValueInput.value.trim();
                            console.log(`Adding attribute: ${attributeName} = ${attributeValue}`); // Debugging
                            if (attributeName !== "" && attributeValue !== "") {
                                element.setCustomAttribute(attributeName, attributeValue);
                                yield element.save();
                                webflow.notify({ type: "Success", message: "Attribute added successfully!" });
                                attributeNameInput.value = "";
                                attributeValueInput.value = "";
                                refreshAttributeListings();
                            }
                            else {
                                webflow.notify({ type: "Error", message: "Invalid input. Attribute Name and Value cannot be empty." });
                            }
                        }
                        else {
                            webflow.notify({ type: "Error", message: "No custom attributes available" });
                        }
                    }
                    else {
                        webflow.notify({ type: "Error", message: "No element selected" });
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                    webflow.notify({ type: "Error", message: "An error occurred while adding the attribute" });
                }
            }
        }));
    }
    catch (error) {
        console.error("Error:", error);
        webflow.notify({ type: "Error", message: "An error occurred while fetching custom attributes" });
    }
}));
// create attribute listing
function createAttributeListing(attrWrapper, elementId, attributes) {
    if (Array.isArray(attributes)) {
        for (const { name, value } of attributes) {
            console.log(`Attribute - Name: ${name}, Value: ${value}`);
            const attrListing = document.createElement("div");
            attrListing.classList.add("attribute-listing");
            const flexHorizontal = document.createElement("div");
            flexHorizontal.classList.add("flex-horizontal");
            const attrName = document.createElement("p");
            attrName.classList.add("attr-list-item", "attr-name");
            attrName.textContent = `${name} =`;
            const attrValue = document.createElement("p");
            attrValue.classList.add("attr-list-item", "attr-value");
            attrValue.textContent = `"${value}"`;
            const delBtn = createDeleteButton(elementId, name);
            attrListing.appendChild(flexHorizontal);
            flexHorizontal.appendChild(attrName);
            flexHorizontal.appendChild(attrValue);
            attrListing.appendChild(delBtn);
            attrWrapper.appendChild(attrListing);
        }
    }
}
function createDeleteButton(elementId, attributeName) {
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "12");
    svg.setAttribute("viewBox", "0 0 10 12");
    svg.setAttribute("fill", "none");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7.33333 4V10.6667H2V4H7.33333ZM6.33333 0H3L2.33333 0.666667H0V2H9.33333V0.666667H7L6.33333 0ZM8.66667 2.66667H0.666667V10.6667C0.666667 11.4 1.26667 12 2 12H7.33333C8.06667 12 8.66667 11.4 8.66667 10.6667V2.66667Z");
    path.setAttribute("fill", "white");
    svg.appendChild(path);
    delBtn.appendChild(svg);
    delBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const element = document.getElementById(elementId);
            if (element) {
                element.removeAttribute(attributeName);
                yield element.save();
                refreshAttributeListings();
                webflow.notify({ type: "Success", message: "Attribute deleted successfully!" });
            }
            else {
                console.error("Error: Element not found.");
                webflow.notify({ type: "Error", message: "Element not found" });
            }
        }
        catch (error) {
            console.error("Error:", error);
            webflow.notify({ type: "Error", message: "An error occurred while deleting the attribute" });
        }
    }));
    return delBtn;
}
function refreshAttributeListings() {
    const attrWrapper = document.getElementById("attr-wrapper");
    attrWrapper.innerHTML = "";
    // Re-fetch all elements and their attributes
    webflow
        .getAllElements()
        .then((allElements) => {
        allElements.forEach((element) => {
            const customAttributes = element.customAttributes;
            if (customAttributes && Object.keys(customAttributes).length > 0) {
                createAttributeListing(attrWrapper, element.id, customAttributes);
            }
            if ("getAllCustomAttributes" in element) {
                const allCustomAttributes = element.getAllCustomAttributes();
                if (allCustomAttributes.length !== 0) {
                    createAttributeListing(attrWrapper, element.id, allCustomAttributes);
                }
            }
        });
    })
        .catch((error) => {
        console.error("Error:", error);
        webflow.notify({ type: "Error", message: "An error occurred while refreshing attributes" });
    });
}
