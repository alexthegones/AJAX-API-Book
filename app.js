var key = "AIzaSyAOUm7anq0-KZ-hsWOZODkBFR-5dS8--CM";

var saisie = document.getElementById("saisie");
var send = document.getElementById("search");

var xhr = new XMLHttpRequest(); //Nouvel objet xhr [Envoi de requête avec AJAX]
var baseURL = " https://www.googleapis.com/books/v1";
var book = "&printType=books";
GetBooks();

function GetBooks() {
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //si la requete est terminée et que la réponse est prête||Status OK
      var dataBooks = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      console.log(dataBooks);
      for (i = 0; i < dataBooks.items.length; i++) {
        aff_books(dataBooks);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //Affichage message d'alert erreur si status invalide(404)
      alert("Erreur 404 :/");
    }
  };

  xhr.open("GET", baseURL + "/volumes?q=" + saisie.value + "&key=" + key, true); //Initialisation de l'objet avant de l'envoyé | Asynchrone
  xhr.send(); //Envoi de la requête vers serveur
}

var affichage = document.getElementById("cardg");

saisie.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    GetBooks();
    affichage.innerHTML = "";
  }
});

send.addEventListener("click", function () {
  GetBooks();
  affichage.innerHTML = "";
});

var refresh = document.getElementById("refresh");
refresh.addEventListener("click", function () {
  window.location.reload();
  saisie.value = "";
});


function aff_books(dataSearch) {
  let livre = document.createElement("div");
  livre.className = "card m-3";

  let row = document.createElement("div");
  row.className = "row no-gutters";

  let col4 = document.createElement("div");
  col4.className = "col-md-4";

  var couverture = document.createElement("img");
  couverture.className = "card-img";
  if (dataSearch.items[i].volumeInfo.imageLinks) {
    couverture.src = dataSearch.items[i].volumeInfo.imageLinks.thumbnail;
  } else {
    couverture.src = "https://via.placeholder.com/150";
  }

  var col8 = document.createElement("div");
  col8.className = "col-md-8";

  let body = document.createElement("div");
  body.className = "card-body";

  let titre = document.createElement("h3");
  titre.className = "card-title book-title";
  titre.innerText = dataSearch.items[i].volumeInfo.title;

  var description = dataSearch.items[i].volumeInfo.description;
  let résumé = document.createElement("p");
  résumé.className = "card-text";
  if (description !== undefined) {
    résumé.innerText = description;
  } else {
    résumé.innerText = "Pas de description disponible..";
  }

  var publish = dataSearch.items[i].volumeInfo.publishedDate;
  let info = document.createElement("p");
  info.className = "card-text";
  info.innerText = "Publié le " + publish;

  let btnPlus = document.createElement("a");
  btnPlus.className = "btn btn-outline-info btn-sm";
  btnPlus.type = "button";
  btnPlus.id = "btnPlus";
  btnPlus.innerHTML = "Afficher plus..";

  let plus = document.createElement("div");
  plus.id = "plus";
  plus.className = "card-text";

  let voirplus = document.createElement("p");

  btnPlus.addEventListener("click", function () {
    if (plus.style.display == "none") {
      voirplus.innerText = description.slice(250, description.length - 1);
      plus.style.display = "block";
    } else {
      plus.style.display = "none";
      plus.innerHTML = "";
    }
    résumé.appendChild(plus);
    plus.appendChild(voirplus);
  });

  var div = document.createElement("div");

  div.appendChild(livre);
  livre.appendChild(row);
  row.appendChild(col4);
  col4.appendChild(couverture);
  row.appendChild(col8);
  col8.appendChild(body);
  col8.appendChild(titre);
  col8.appendChild(résumé);
  col8.appendChild(info);
  body.appendChild(titre);
  body.appendChild(résumé);
  résumé.appendChild(btnPlus);
  body.appendChild(info);

  affichage.appendChild(livre);

  var b = -100;
  affichage.style.left = b + "%";
  affichage.style.position = "relative";
  // var a = 0
  // div.style.opacity = a
  var time = setInterval(function () {
    affichage.style.left = b + "%";
    b += 10;
    // div.style.opacity = a
    // a = a + 0.1
    if (b >= 10) {
      clearInterval(time);
    }
  }, 100);
}