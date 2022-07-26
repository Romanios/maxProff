//tabs

const tabsBtn = document.querySelectorAll(".tabs__nav-btn"); //Получение кнопки таба по классу
const tabsItems = document.querySelectorAll(".tabs__item");  //Получение контента таба по классу

tabsBtn.forEach(function(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if(! currentBtn.classList.contains('active')) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
        
        tabsBtn.forEach(function(item) {
            item.classList.remove('active');
        });

        tabsItems.forEach(function(item) {
            item.classList.remove('active');
        });

        currentBtn.classList.add('active');
        currentTab.classList.add('active');
        }
    });
});

document.querySelector('.tabs__nav-btn:nth-child(2)').click();