import i18Obj from './translate.js';

function getTranslate(language) {
    const i18 = document.querySelectorAll('[data-i18]');
    i18.forEach((value) => {
        const text = value.dataset.i18;
        value.textContent = i18Obj[language][text];
    });
}

async function getData2(lang) {
    const link = lang === 'ru' ? 'asset/json/quotes.json' : 'https://type.fit/api/quotes';
    const res = await fetch(link);
    const data = await res.json();
    return data;
}
const max = 100
const min = 1;
let count = Math.floor(Math.random() * (max - min)) + min;
let maxCount = 0; 

async function go(i,lang){
    const data = await getData2(lang);

    setTimeout(() => { 
        document.getElementById("neon").classList.add('effect');
    }, 200);

    maxCount = data.length;

    setTimeout(() => { 
        document.getElementById("text").textContent = data[i].text;
        document.getElementById("autor").textContent = data[i].author;
    }, 500);

    maxCount >= count ? count++ : count = 0;

    setTimeout(() => { 
        document.getElementById("neon").classList.remove('effect');
    }, 800);

    
}

/* Translate */
let currentlanguage = document.querySelector('.language');
let languageLink = currentlanguage.querySelectorAll('a');


let lang = 'ru'


currentlanguage.addEventListener('click', (e) => {
    if(e.target.className !== 'active'){
        languageLink.forEach(link => {
            link.classList.toggle('active');

        });

    }
    //getTranslate(e.target.innerText);
    getTranslate(e.target.innerText);
    //localStorage.setItem('lang',e.target.innerText);

    

    lang = e.target.innerText;


    count = 0;
    go(count,lang);
});

//console.log(lang)
go(count,lang);


const btn = document.querySelector('.btn');

if (btn) {

    btn.addEventListener("click", function (e) {      
        go(count,lang);
    });
    
}


