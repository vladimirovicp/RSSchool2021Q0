import i18Obj from './translate.js';

const burger = document.querySelector('.burger');
const burgerList = document.querySelector('.burger-list');

if (burger) {
    burger.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        burger.classList.toggle('open');
        burgerList.classList.toggle('open');
    });
}

let burgerLinks = document.querySelectorAll('.burger-link');

if (burgerLinks.length > 0) {
    burgerLinks.forEach(burgerLink => {
        burgerLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        if (burger.classList.contains('open')) {

            document.body.classList.remove('_lock');
            burger.classList.remove('open');
            burgerList.classList.remove('open');

        }
    }

}

// section portfolio

function preloadSummerImages() {
    seasons.forEach((value) => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${value}/${i}.jpg`;
        }
    });
}

function changeClassActive(event) {
    portfolioBtn.forEach((value) => {
        if (value.classList.contains('active')) //проверяем, естьли класс актив у элемента
        {
            value.classList.remove('active'); //удаляем класс актив
        }
    });
    event.target.classList.add('active'); //добавили класс к меню по которому кликнули
}

function changeImage(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        portfolioImages.forEach((img, index) => img.src = "./assets/img/" + event.target.dataset.season + "/" + (index + 1) + ".jpg");
    }
}

function getTranslate(language) {
    const i18 = document.querySelectorAll('[data-i18]');
    i18.forEach((value) => {
        const text = value.dataset.i18;
        value.textContent = i18Obj[language][text];
    });
}




const seasons = ['winter', 'spring', 'summer', 'autumn'];
const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image');
const portfolioBtns = document.querySelector('.portfolio-btns');

preloadSummerImages();

portfolioBtns.addEventListener('click', (event) => {
    changeImage(event);
    changeClassActive(event);
});



/* Translate */
let currentlanguage = document.querySelector('.language');
currentlanguage.addEventListener('click', (e) => {
    getTranslate(e.target.innerText);
    localStorage.setItem('lang',e.target.innerText);
    //lang = e.target.innerText;
});



function themeСolorСhange(themeName) {

    const propertyRoot = [
        '--color-back',
        '--color-black',
        '--color-text',
        '--color-title',
        '--color-btn',     
        '--color-btn-back'
    ];

    const propertyLight = [
        '#fff',
        '#1c1c1c',
        '#1c1c1c',
        '#1c1c1c',
        '#fff',
        '#bdae82'
    ];

    const propertyDark = [
        '#000',
        '#000',
        '#fff',
        '#bdae82', 
        '#bdae82',
        '#fff'
    ];

    if(themeName === 'dark-theme'){

        document.body.classList.remove('light');
        propertyDark.forEach((element, index, array) => {
            document.documentElement.style.setProperty(propertyRoot[index], element);

            let dellClass = document.querySelectorAll('button');
            dellClass.forEach((index) => {
                index.classList.remove('light-theme');
            });
        });

    } else {
        document.body.classList.add('light');
        propertyLight.forEach((element, index, array) => {
            document.documentElement.style.setProperty(propertyRoot[index], element);

            let addClass = document.querySelectorAll('button');
            addClass.forEach((index) => {
                index.classList.add('light-theme');
            });
            
        });
    }
}

const themeSwitcher = document.querySelectorAll('.theme');

themeSwitcher.forEach(switcher => {
    switcher.addEventListener('click', function(){
        localStorage.setItem('theme', this.dataset.theme);
        themeСolorСhange(this.dataset.theme);

    });
});

let lang = localStorage.getItem('lang');
if(lang === null){
    getTranslate('en');
    
} else {
    getTranslate(lang);
}

let theme = localStorage.getItem('theme');
if(theme === null){
    themeСolorСhange('dark-theme');
} else {
    themeСolorСhange(theme);
}

function getLocalStorage() {
    let lang = localStorage.getItem('lang');
    if(lang === null){
        getTranslate('en');
        
    } else {
        getTranslate(lang);
    }
    
    let theme = localStorage.getItem('theme');
    if(theme === null){
        themeСolorСhange('dark-theme');
    } else {
        themeСolorСhange(theme);
    }
}

// window.addEventListener('beforeunload', getLocalStorage);
window.addEventListener('load', getLocalStorage);

//window.addEventListener('load', getLocalStorage)

//window.addEventListener('beforeunload', theme);

// window - объект окна браузера, с ним связана загрузка и перезагрузка страницы
// addEventListener - метод, который отлавливает событие элемента и выполняет переданную функцию
// localStorage.setItem - метод сохраняющий данные в localStorage. Два параметра метода: имя значения, которое сохраняется и само значение, которое сохраняется
// localStorage.getItem - метод получающий данные из localStorage. Параметр метода - имя, под которым сохраняется значение.