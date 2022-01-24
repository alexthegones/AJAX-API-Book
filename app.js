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
      //* si la requete est terminée et que la réponse est prête||Status OK
      let dataBooks = JSON.parse(this.response); //Objet JSON de données[Tableau de données]/This Objet XHR
      console.log(dataBooks);
      for (i = 0; i < dataBooks.items.length; i++) {
        if (dataBooks.totalItems.length === 0) {
          alert("Bouquin introuvable..");
        }
        aff_books(dataBooks);
      }
    } else if (this.readyState == 4 && this.status == 404) {
      //* Affichage message d'alert erreur si status invalide(404)
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
  livre.className = "mobile-layout";

  let cover = document.createElement("img");
  cover.className = "book-cover";

  if (dataSearch.items[i].volumeInfo.imageLinks) {
    cover.src = dataSearch.items[i].volumeInfo.imageLinks.thumbnail;
  } else {
    cover.src = "https://via.placeholder.com/150";
  }

  let preface = document.createElement("div");
  preface.className = "preface";

  let content = document.createElement("div");
  content.className = "content";

  let header = document.createElement("div");
  header.className = "header";

  let title = document.createElement("div");
  title.className = "title";
  title.innerText = dataSearch.items[i].volumeInfo.title;

  let author = document.createElement("div");
  author.className = "author";
  author.innerText = dataSearch.items[i].volumeInfo.authors;

  let body = document.createElement("div");
  body.className = "body";

  var description = dataSearch.items[i].volumeInfo.description;
  if (description !== undefined) {
    body.innerText = description.slice(0, 150);
  } else {
    body.innerText = "Pas de description disponible..";
  }

  // var publish = dataSearch.items[i].volumeInfo.publishedDate;
  // let info = document.createElement("p");
  // info.className = "card-text";
  // info.innerText = "Publié le " + publish;

  // let categorie = document.createElement("span");
  // categorie.className = "card-text";
  // categorie.innerText = dataSearch.items[i].volumeInfo.categories;

  var div = document.createElement("div");

  div.appendChild(livre);
  livre.appendChild(cover);
  livre.appendChild(preface);
  preface.appendChild(content);
  content.appendChild(header);
  header.appendChild(title);
  content.appendChild(author);
  content.appendChild(body);

  affichage.appendChild(livre);

  var b = -100;
  affichage.style.left = b + "%";
  affichage.style.position = "relative";
  var time = setInterval(function () {
    affichage.style.left = b + "%";
    b += 10;
    if (b >= 10) {
      clearInterval(time);
    }
  }, 100);
}
