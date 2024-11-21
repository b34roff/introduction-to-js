// Récupère le formulaire du DOM
const form = document.querySelector("form");

// Function pour stocker les "todos" dans le localStorage
function storeTodos() {
  window.localStorage.todoList = list.innerHTML;
}

// Function pour stocker les "todos" dans le localStorage
function getTodos() {
  if (window.localStorage.todoList) {
    list.innerHTML = window.localStorage.todoList;
  } else {
    list.innerHTML = `<li>Cliquez sur un todo pour le supprimer</li>`;
  }
}

// Récupère les "todos" enregistré dans le local storage au chargement de la page
window.addEventListener("load", getTodos);

// A l’événement submit du formulaire, on ajoute un élément à la liste
form.addEventListener("submit", (e) => {
  // Annule le comportement par défaut du formulaire
  e.preventDefault();

  //  On affiche le contenu de l'input dans la liste, on vide l'input, et on stock la donnée dans le localStorage
  list.innerHTML += `<li>${item.value}</li>`;
  item.value = "";
  storeTodos();
});

// On écoute les clics sur la liste
list.addEventListener("click", (e) => {
  // Si l'élément cliqué a la classe "checked", on le supprime
  if (e.target.classList.contains("checked")) {
    e.target.remove();

    // Si l'élément cliqué n'a pas la classe "checked", on lui ajoute la classe "checked"
  } else {
    e.target.classList.add("checked");
  }

  // On stock la donnée dans le localStorage
  storeTodos();
});
