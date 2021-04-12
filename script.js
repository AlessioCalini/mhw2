var corsi=0;
for(let elemento of CONTENUTI){
    if(elemento.id!==''){
        corsi++;
    }
}
if(corsi===0){
    document.querySelector("section#corsi").classList.add("hide");
    document.querySelector("section#corsi").classList.remove("show");
} else{
    document.querySelector("section#corsi").classList.remove("hide");
    document.querySelector("section#corsi").classList.add("show");
}

for(let elemento of CONTENUTI){
    var sezione;
    if(elemento.id!==''){
         sezione=document.querySelector("section#corsi div.show-case");
    }
    crea_nodo(sezione,elemento,true);
}

const preferiti=[];
const ricerca=[];

function Descrizione(event){
    const button=event.currentTarget;
    const cards=document.querySelectorAll("div.card");
    for(card of cards){
        if(card.dataset.codice===button.dataset.codice){
            const descrizione=card.querySelector("p.hide");
            if(descrizione !== null){
            descrizione.classList.add("show");
            descrizione.classList.remove("hide");
        }
        else{
            const descrizione=card.querySelector("p.description");
            descrizione.classList.add("hide");
            descrizione.classList.remove("show");
        }
    }
}
}

function aggiungiPreferiti(event){
    const id=event.currentTarget.dataset.codice;
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("show");
        document.querySelector("section#preferiti").classList.remove("hide");
    }
    for(elemento of CONTENUTI){
        if(elemento.id==id){
            if(preferiti.indexOf(elemento)===-1){
                preferiti.push(elemento);
                sezione=document.querySelector("section#preferiti div.show-case");
                crea_nodo(sezione,elemento,false);
            }
        }
    }
}

function rimuoviPreferiti(event){
    const id=event.currentTarget.dataset.codice;
    const cards=document.querySelectorAll("section#preferiti div.card");
    const sezione=document.querySelector("section#preferiti div");
    for(card of cards){
        if(card.dataset.codice==id){
            sezione.removeChild(card);
        }
    }
    for(pref of preferiti){
        if(pref.id===id){
            preferiti.splice(preferiti.indexOf(pref),1);
        }
    }
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("hide");
        document.querySelector("section#preferiti").classList.remove("show");
    }
}

const info_button=document.querySelectorAll("div.card div img.info");
for(button of info_button){
    button.addEventListener("click",Descrizione);
}

const favourites=document.querySelectorAll("div.card div img img.preferiti");
for(button of favourites){
    button.addEventListener("click",aggiungiPreferiti);
}

function Ricerca(){
    ricerca.splice(0,ricerca.length);
    const barra_di_ricerca=document.querySelector("#search input#search");
    testo=barra_di_ricerca.value;
    const sezione_ricerca=document.querySelector("section#ricerca div.show-case");
    while(sezione_ricerca.firstChild){
        sezione_ricerca.removeChild(sezione_ricerca.firstChild);
    }
    if(testo!==""){
        for(let content of CONTENUTI){
            if(content.titolo.toLowerCase().includes(testo.toLowerCase())){
                ricerca.push(content);
                crea_nodo(sezione_ricerca,content,true);
            }
        }
        if(ricerca.length!==0){
            showsearch();
        } else{
            hidesearch();
        }
    }else{
        hidesearch();
    }
}

const barra_ricerca=document.querySelector("#search input#search");
barra_ricerca.addEventListener("keyup",Ricerca);

function hidesearch(){
    document.querySelector("section#ricerca").classList.add("hide");
    document.querySelector("section#ricerca").classList.remove("show");
    document.querySelector("section#corsi").classList.remove("hide");
    document.querySelector("section#corsi").classList.add("show");
    if(preferiti.length!==0){
    document.querySelector("section#preferiti").classList.remove("hide");
    document.querySelector("section#preferiti").classList.add("show");
    }
}

function showsearch(){
    document.querySelector("section#ricerca").classList.add("show");
    document.querySelector("section#ricerca").classList.remove("hide");
    document.querySelector("section#corsi").classList.remove("show");
    document.querySelector("section#corsi").classList.add("hide");
    document.querySelector("section#preferiti").classList.remove("show");
    document.querySelector("section#preferiti").classList.add("hide");
}

function crea_nodo(sezione,elemento,preferiti){
    if(preferiti===true){
        _pref='preferiti';
        _img='images1.png';
    } else{
        _pref='rimuovi';
        _img='images3.png';
    }
    const nodo=document.createElement("div");
    nodo.classList.add("card");
    const immagine=document.createElement("img");
    immagine.src=elemento.immagine;
    immagine.classList.add("image");
    const about=document.createElement("div");
    const titolo=document.createElement("h5");
    titolo.textContent=elemento.titolo;
    const descrizione=document.createElement("p");
    descrizione.textContent=elemento.descrizione;
    descrizione.classList.add("hide");
    descrizione.classList.add("description");
    const heart_plus=document.createElement("img");
    const info=document.createElement("img");
    heart_plus.src=_img;
    heart_plus.dataset.codice=elemento.id;
    info.src="images2.png";
    info.dataset.codice=elemento.id;
    heart_plus.classList.add(_pref);
    info.classList.add("info");
    about.appendChild(titolo);
    about.appendChild(descrizione);
    about.appendChild(heart_plus);
    about.appendChild(info);
    nodo.appendChild(immagine);
    nodo.appendChild(about);
    nodo.dataset.codice=elemento.id;
    sezione.appendChild(nodo);
    const not_favourites=document.querySelectorAll("div.card div img.rimuovi");
    for(pulsante of not_favourites){
        pulsante.addEventListener("click",rimuoviPreferiti);
    }
    const favourites=document.querySelectorAll("div.card div img.preferiti");
    for(pulsante of favourites){
        pulsante.addEventListener("click",aggiungiPreferiti);
    }
    const info_button=document.querySelectorAll("div.card div img.info");
    for(button of info_button){
        button.addEventListener("click",Descrizione);
    }
}