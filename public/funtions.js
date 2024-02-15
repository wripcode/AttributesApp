// Tab functionality
const tabsNav = document.querySelector(".tabs__nav");
const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

if (!tabsNav || tabsBtn.length === 0 || tabsItems.length === 0) {
  console.error("Error: Could not find the required elements for tabs functionality.");
} else {
  tabsNav.addEventListener("click", function (event) {
    const targetButton = event.target.closest(".tabs__nav-btn");

    if (targetButton) {
      const tabId = targetButton.getAttribute("data-tab");
      const currentTab = document.querySelector(tabId);

      if (currentTab) {
        tabsBtn.forEach((btn) => btn.classList.toggle("active", btn === targetButton));
        tabsItems.forEach((item) => item.classList.toggle("active", item === currentTab));
      }
    }
  });

  tabsBtn[0].click();
}
