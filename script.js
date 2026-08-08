/* ==============================
   MENÚ MÓVIL
   ============================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});


/* Cerrar menú al seleccionar una opción */

document.querySelectorAll(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* ==============================
   AÑO AUTOMÁTICO DEL FOOTER
   ============================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


/* ==============================
   ANIMACIONES AL HACER SCROLL
   ============================== */

const revealItems = document.querySelectorAll(
  `
  .about-card,
  .skill-card,
  .timeline-item,
  .project-slide,
  .contact
  `
);


/* Agregar clase inicial */

revealItems.forEach((item) => {
  item.classList.add("reveal");
});


/* Intersection Observer */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add(
          "visible"
        );

        observer.unobserve(
          entry.target
        );

      }

    });

  },

  {
    threshold: 0.12
  }
);


/* Observar elementos */

revealItems.forEach((item) => {
  observer.observe(item);
});


/* ==============================
   CARRUSEL PRINCIPAL DE PROYECTOS
   ============================== */

const projectsTrack =
  document.querySelector(
    ".projects-track"
  );

const projectSlides =
  document.querySelectorAll(
    ".project-slide"
  );

const previousProjectButton =
  document.querySelector(
    ".carousel-prev"
  );

const nextProjectButton =
  document.querySelector(
    ".carousel-next"
  );

const projectDots =
  document.querySelectorAll(
    ".carousel-dot"
  );

let currentProject = 0;


/* ==============================
   ACTUALIZAR CARRUSEL
   ============================== */

function updateProjectsCarousel() {

  if (!projectsTrack) {
    return;
  }


  projectsTrack.style.transform =
    `translateX(-${currentProject * 100}%)`;


  projectDots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === currentProject
      );

    }
  );

}


/* ==============================
   SIGUIENTE PROYECTO
   ============================== */

nextProjectButton?.addEventListener(
  "click",
  () => {

    currentProject++;


    if (
      currentProject >=
      projectSlides.length
    ) {

      currentProject = 0;

    }


    updateProjectsCarousel();

  }
);


/* ==============================
   PROYECTO ANTERIOR
   ============================== */

previousProjectButton?.addEventListener(
  "click",
  () => {

    currentProject--;


    if (currentProject < 0) {

      currentProject =
        projectSlides.length - 1;

    }


    updateProjectsCarousel();

  }
);


/* ==============================
   NAVEGACIÓN CON LOS PUNTOS
   ============================== */

projectDots.forEach(
  (dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        currentProject = index;

        updateProjectsCarousel();

      }
    );

  }
);


/* ==============================
   NAVEGACIÓN CON TECLADO
   ============================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      projectSlides.length === 0
    ) {
      return;
    }


    /*
     * Si el usuario está usando una
     * miniatura de Functional Training,
     * no cambiamos de proyecto.
     */

    if (
      document.activeElement?.classList
        .contains("gallery-thumb")
    ) {
      return;
    }


    /* Flecha derecha */

    if (
      event.key === "ArrowRight"
    ) {

      currentProject++;


      if (
        currentProject >=
        projectSlides.length
      ) {

        currentProject = 0;

      }


      updateProjectsCarousel();

    }


    /* Flecha izquierda */

    if (
      event.key === "ArrowLeft"
    ) {

      currentProject--;


      if (currentProject < 0) {

        currentProject =
          projectSlides.length - 1;

      }


      updateProjectsCarousel();

    }

  }
);


/* ==============================
   SWIPE DEL CARRUSEL PRINCIPAL
   ============================== */

let touchStartX = 0;

let touchEndX = 0;

let touchStartedInsideGallery = false;

const projectsCarousel =
  document.querySelector(
    ".projects-carousel"
  );


projectsCarousel?.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.changedTouches[0].screenX;


    /*
     * Comprobar si el usuario empezó
     * el gesto dentro de la galería.
     */

    touchStartedInsideGallery =
      Boolean(
        event.target.closest(
          ".functional-gallery"
        )
      );

  },

  {
    passive: true
  }
);


projectsCarousel?.addEventListener(
  "touchend",
  (event) => {

    touchEndX =
      event.changedTouches[0].screenX;


    /*
     * Si el gesto empezó dentro de
     * la galería, no mover el
     * carrusel principal.
     */

    if (
      touchStartedInsideGallery
    ) {

      touchStartedInsideGallery =
        false;

      return;

    }


    handleProjectSwipe();

  },

  {
    passive: true
  }
);


/* ==============================
   PROCESAR SWIPE
   ============================== */

function handleProjectSwipe() {

  const swipeDistance =
    touchStartX - touchEndX;


  const minimumSwipeDistance =
    50;


  /* Swipe izquierda */

  if (
    swipeDistance >
    minimumSwipeDistance
  ) {

    currentProject++;


    if (
      currentProject >=
      projectSlides.length
    ) {

      currentProject = 0;

    }


    updateProjectsCarousel();

  }


  /* Swipe derecha */

  if (
    swipeDistance <
    -minimumSwipeDistance
  ) {

    currentProject--;


    if (currentProject < 0) {

      currentProject =
        projectSlides.length - 1;

    }


    updateProjectsCarousel();

  }

}


/* ==============================
   INICIALIZAR CARRUSEL
   ============================== */

if (
  projectSlides.length > 0
) {

  updateProjectsCarousel();

}


/* =====================================================
   GALERÍA DE MINIATURAS
   FUNCTIONAL TRAINING
   ===================================================== */

const functionalMainImage =
  document.getElementById(
    "functionalMainImage"
  );

const functionalThumbnails =
  document.querySelectorAll(
    ".functional-gallery .gallery-thumb"
  );


/* ==============================
   CAMBIAR IMAGEN PRINCIPAL
   ============================== */

function changeFunctionalImage(
  thumbnail
) {

  if (!functionalMainImage) {
    return;
  }


  const newImage =
    thumbnail.dataset.image;

  const newAlt =
    thumbnail.dataset.alt;


  /*
   * Si ya está activa,
   * no hacemos nada.
   */

  if (
    thumbnail.classList.contains(
      "active"
    )
  ) {
    return;
  }


  /*
   * Comprobar que exista
   * una imagen configurada.
   */

  if (!newImage) {
    return;
  }


  /*
   * Animación de salida
   */

  functionalMainImage.classList.add(
    "gallery-changing"
  );


  setTimeout(() => {

    /*
     * Cambiar imagen
     */

    functionalMainImage.src =
      newImage;


    /*
     * Cambiar texto alternativo
     */

    functionalMainImage.alt =
      newAlt ||
      "Captura de Functional Training";


    /*
     * Quitar animación
     */

    functionalMainImage.classList.remove(
      "gallery-changing"
    );

  }, 150);


  /*
   * Eliminar estado activo
   * de todas las miniaturas.
   */

  functionalThumbnails.forEach(
    (item) => {

      item.classList.remove(
        "active"
      );

      item.setAttribute(
        "aria-pressed",
        "false"
      );

    }
  );


  /*
   * Activar miniatura seleccionada.
   */

  thumbnail.classList.add(
    "active"
  );

  thumbnail.setAttribute(
    "aria-pressed",
    "true"
  );

}


/* ==============================
   EVENTOS DE MINIATURAS
   ============================== */

functionalThumbnails.forEach(
  (thumbnail) => {

    thumbnail.addEventListener(
      "click",
      (event) => {

        /*
         * Evita que cualquier evento
         * pueda afectar al carrusel
         * principal.
         */

        event.stopPropagation();


        changeFunctionalImage(
          thumbnail
        );

      }
    );

  }
);


/* ==============================
   NAVEGACIÓN DE MINIATURAS
   CON TECLADO
   ============================== */

functionalThumbnails.forEach(
  (thumbnail, index) => {

    thumbnail.addEventListener(
      "keydown",
      (event) => {

        let nextIndex = index;


        /*
         * Flecha derecha
         */

        if (
          event.key === "ArrowRight"
        ) {

          event.preventDefault();

          nextIndex =
            index + 1;


          if (
            nextIndex >=
            functionalThumbnails.length
          ) {

            nextIndex = 0;

          }

        }


        /*
         * Flecha izquierda
         */

        else if (
          event.key === "ArrowLeft"
        ) {

          event.preventDefault();

          nextIndex =
            index - 1;


          if (
            nextIndex < 0
          ) {

            nextIndex =
              functionalThumbnails.length - 1;

          }

        }


        /*
         * Si cambió de posición.
         */

        if (
          nextIndex !== index
        ) {

          const nextThumbnail =
            functionalThumbnails[
              nextIndex
            ];


          nextThumbnail.focus();

          changeFunctionalImage(
            nextThumbnail
          );

        }

      }
    );

  }
);


/* ==============================
   ESTADO INICIAL DE LA GALERÍA
   ============================== */

functionalThumbnails.forEach(
  (thumbnail, index) => {

    thumbnail.setAttribute(
      "aria-pressed",
      index === 0
        ? "true"
        : "false"
    );

  }
);