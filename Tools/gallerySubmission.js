import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getStorage, ref as sref, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjMBUC1EhrOSzzgId-sglmdmJJ4kCyV5Q",
  authDomain: "club-central-2af6e.firebaseapp.com",
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com",
  projectId: "club-central-2af6e",
  storageBucket: "club-central-2af6e.appspot.com",
  messagingSenderId: "578174084496",
  appId: "1:578174084496:web:13f92682f267332f62ff15",
  measurementId: "G-FKR7SRZ915"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


document.getElementById("sign-out").addEventListener('click', signOut);

function signOut() {
  sessionStorage.setItem("currentUser", "");
}
getDownloadURL(sref(storage, 'users/' + sessionStorage.getItem("currentUser")))
.then((url) => {

  // Or inserted into an <img> element
  const img = document.getElementById('profile-pic');
  img.setAttribute('src', url);
});



var selectedImage = null;
var images = [];
var descriptions = [];
var currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.querySelector(".grid");

  var plus = document.querySelector("#plus");

  document.addEventListener("mousemove", function (event) {
    var rect = plus.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2 - window.pageXOffset;
    var centerY = rect.top + rect.height / 2 - window.pageYOffset;

    var mouseX = event.pageX;
    var mouseY = event.pageY;

    var radians = Math.atan2(mouseY - centerY, mouseX - centerX);
    var degree = radians * (180 / Math.PI);

    plus.style.transform = "rotate(" + degree + "deg)";
  });

  function adicionarBotaoFechar(gridCell) {
    var closeButton = gridCell.querySelector(".close-button");
    if (!closeButton) {
      closeButton = document.createElement("div");
      closeButton.classList.add("close-button");
      closeButton.innerText = "X";
      closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        var image = gridCell.querySelector("img");
        var index = images.indexOf(image);
        if (index !== -1) {
          images.splice(index, 1);
          descriptions.splice(index, 1);
        }
        gridCell.parentNode.removeChild(gridCell);
      });

      gridCell.appendChild(closeButton);
    }
  }

  function adicionarBotaoEditar(gridCell) {
    var editButton = gridCell.querySelector(".edit-button");
    if (!editButton) {
      editButton = document.createElement("div");
      editButton.classList.add("edit-button");
      editButton.innerText = "E";
      editButton.addEventListener("click", function (event) {
        event.stopPropagation();
        var index = Array.from(gridCell.parentNode.children).indexOf(gridCell);
        var description = descriptions[index];
        abrirAlertDescricao(gridCell, description);
      });

      gridCell.appendChild(editButton);
    }
  }

  function adicionarArquivo(url) {
    Swal.fire({
      title: "Informações da imagem",
      html: `
            <input id="preco" class="swal2-input" placeholder="Preço" type="text">
            <input id="autor" class="swal2-input" placeholder="Autor" type="text">
            <input id="descricao" class="swal2-input" placeholder="Descrição" type="text">
          `,
      showCancelButton: true,
      confirmButtonText: "Adicionar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        var preco = document.getElementById("preco").value;
        var autor = document.getElementById("autor").value;
        var descricao = document.getElementById("descricao").value;

        if (
          preco.trim() === "" ||
          autor.trim() === "" ||
          descricao.trim() === ""
        ) {
          Swal.fire({
            icon: "error",
            title: "Preencha todas as informações da descrição!",
            showConfirmButton: false,
            timer: 1500
          });
          return false;
        }

        var gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.addEventListener("click", function () {
          selecionarImagem(this);
        });

        var image = new Image();
        image.onload = function () {
          gridCell.appendChild(image);

          var description = document.createElement("div");
          description.classList.add("image-description");
          description.style.display = "none";
          gridCell.appendChild(description);

          if (document.getElementById("change-positions").checked) {
            adicionarBotaoFechar(gridCell);
            adicionarBotaoEditar(gridCell);
          }
        };
        image.src = url;
        image.style.width = "100%";
        image.style.height = "auto";

        grid.appendChild(gridCell);

        adicionarDescricao(gridCell, descricao, preco, autor);

        images.push(image);
        descriptions.push({
          descricao: descricao,
          preco: preco,
          autor: autor
        });

        Swal.fire({
          icon: "success",
          title: "Arquivo adicionado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });

        return true;
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Adição de arquivo cancelada!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  var changePositionsCheckbox = document.getElementById("change-positions");
  changePositionsCheckbox.addEventListener("change", function () {
    var gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(function (gridCell) {
      if (changePositionsCheckbox.checked) {
        adicionarBotaoFechar(gridCell);
        adicionarBotaoEditar(gridCell);
      } else {
        var closeButton = gridCell.querySelector(".close-button");
        if (closeButton) {
          closeButton.parentNode.removeChild(closeButton);
        }
        var editButton = gridCell.querySelector(".edit-button");
        if (editButton) {
          editButton.parentNode.removeChild(editButton);
        }
      }
    });
  });

  function abrirAlertDescricao(gridCell, description) {
    Swal.fire({
      title: "Editar Descrição",
      html: `
            <input id="edit-preco" class="swal2-input" placeholder="Preço" type="text" value="${description.preco}">
            <input id="edit-autor" class="swal2-input" placeholder="Autor" type="text" value="${description.autor}">
            <input id="edit-descricao" class="swal2-input" placeholder="Descrição" type="text" value="${description.descricao}">
          `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        var preco = document.getElementById("edit-preco").value;
        var autor = document.getElementById("edit-autor").value;
        var descricao = document.getElementById("edit-descricao").value;

        if (
          preco.trim() === "" ||
          autor.trim() === "" ||
          descricao.trim() === ""
        ) {
          Swal.fire({
            icon: "error",
            title: "Preencha todas as informações da descrição!",
            showConfirmButton: false,
            timer: 1500
          });
          return false;
        }

        description.preco = preco;
        description.autor = autor;
        description.descricao = descricao;

        var index = Array.from(gridCell.parentNode.children).indexOf(gridCell);
        var descriptionContent = gridCell.querySelector(".description-content");
        descriptionContent.innerHTML = `
              <p><strong>Preço:</strong> R$ ${preco}</p>
              <p><strong>Autor:</strong> ${autor}</p>
              <p><strong>Descrição:</strong> ${descricao}</p>
            `;

        Swal.fire({
          icon: "success",
          title: "Descrição atualizada com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });

        return true;
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Edição de descrição cancelada!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  function selecionarImagem(gridCell) {
    var changePositionsCheckbox = document.getElementById("change-positions");
    if (!changePositionsCheckbox.checked) {
      if (gridCell.classList.contains("expanded")) {
        fecharImagem(gridCell);
      } else {
        expandirImagem(gridCell);
      }
    } else {
      if (selectedImage === gridCell) {
        gridCell.classList.remove("selected");
        selectedImage = null;
      } else {
        if (selectedImage) {
          trocarImagens(selectedImage, gridCell);
        } else {
          gridCell.classList.add("selected");
          selectedImage = gridCell;
        }
      }
    }
  }

  function expandirImagem(gridCell) {
    if (!gridCell.classList.contains("expanded")) {
      var image = gridCell.querySelector("img");
      gridCell.classList.add("expanded");
      image.style.maxWidth = "100%";
      image.style.maxHeight = "100%";

      var buttonContainer = document.createElement("div");
      buttonContainer.classList.add("button-container");

      var nextButton = document.createElement("button");
      nextButton.innerText = "Próxima";
      nextButton.addEventListener("click", avancarImagem);
      buttonContainer.appendChild(nextButton);

      var prevButton = document.createElement("button");
      prevButton.innerText = "Anterior";
      prevButton.addEventListener("click", retrocederImagem);
      buttonContainer.appendChild(prevButton);

      gridCell.appendChild(buttonContainer);

      var index = Array.from(gridCell.parentNode.children).indexOf(gridCell);
      var description = gridCell.querySelector(".image-description");
      if (description) {
        var descricao = descriptions[index].descricao;
        var preco = descriptions[index].preco;
        var autor = descriptions[index].autor;

        description.innerHTML = `
          <div class="description-content">
            <p><strong>Preço:</strong> R$ ${preco}</p>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Descrição:</strong> ${descricao}</p>
          </div>
        `;
        description.style.display = "block";
      }

      setTimeout(function () {
        gridCell.classList.add("active");
      }, 10);
    }
  }

  function fecharImagem(gridCell) {
    if (gridCell.classList.contains("expanded")) {
      gridCell.classList.remove("active");

      var buttonContainer = gridCell.querySelector(".button-container");
      if (buttonContainer) {
        buttonContainer.parentNode.removeChild(buttonContainer);
      }

      setTimeout(function () {
        gridCell.classList.remove("expanded");
        var image = gridCell.querySelector("img");
        if (image) {
          image.style.maxWidth = "300px";
          image.style.maxHeight = "200px";
        }
      }, 300);

      var description = gridCell.querySelector(".image-description");
      if (description) {
        description.style.display = "none";
      }
    }
  }

  function trocarImagens(gridCell1, gridCell2) {
    var changePositionsCheckbox = document.getElementById("change-positions");
    if (changePositionsCheckbox.checked) {
      var image1 = gridCell1.querySelector("img");
      var image2 = gridCell2.querySelector("img");

      var description1 = gridCell1.querySelector(".image-description");
      var description2 = gridCell2.querySelector(".image-description");

      image1.parentNode.removeChild(image1);
      image2.parentNode.removeChild(image2);
      gridCell1.appendChild(image2);
      gridCell2.appendChild(image1);

      var index1 = Array.from(gridCell1.parentNode.children).indexOf(gridCell1);
      var index2 = Array.from(gridCell2.parentNode.children).indexOf(gridCell2);

      var tempDescription = descriptions[index1];
      descriptions[index1] = descriptions[index2];
      descriptions[index2] = tempDescription;

      description1.innerHTML = `
        <div class="description-content">
          <p><strong>Preço:</strong> R$ ${descriptions[index1].preco}</p>
          <p><strong>Autor:</strong> ${descriptions[index1].autor}</p>
          <p><strong>Descrição:</strong> ${descriptions[index1].descricao}</p>
        </div>
      `;

      description2.innerHTML = `
        <div class="description-content">
          <p><strong>Preço:</strong> R$ ${descriptions[index2].preco}</p>
          <p><strong>Autor:</strong> ${descriptions[index2].autor}</p>
          <p><strong>Descrição:</strong> ${descriptions[index2].descricao}</p>
        </div>
      `;

      gridCell1.classList.toggle("selected");
      gridCell2.classList.toggle("selected");

      selectedImage = gridCell2;
    }
  }

  var icon = document.querySelector(".sidebar-icon");

  icon.addEventListener("click", function () {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;

    fileInput.addEventListener("change", function (event) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file.type.startsWith("image/")) {
          var url = URL.createObjectURL(file);
          adicionarArquivo(url);
        }
      }
    });

    fileInput.click();
  });

  function avancarImagem() {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    expandirImagem(images[currentIndex].parentNode);
  }

  function retrocederImagem() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    expandirImagem(images[currentIndex].parentNode);
  }

  function adicionarDescricao(gridCell, descricao, preco, autor) {
    var description = document.createElement("div");
    description.style.display = "none";

    description.innerHTML = `
      <div class="description-content">
        <p><strong>Preço:</strong> R$ ${preco}</p>
        <p><strong>Autor:</strong> ${autor}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
      </div>
    `;

    gridCell.appendChild(description);
  }
});
