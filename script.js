/* ==============================
   MENÚ MÓVIL
   ============================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

/* Cerrar menú al seleccionar una opción */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ==============================
   AÑO AUTOMÁTICO DEL FOOTER
   ============================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
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
  `,
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
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

/* Observar elementos */

revealItems.forEach((item) => {
  observer.observe(item);
});

/* ==============================
   CARRUSEL DE PROYECTOS
   ============================== */

const projectsTrack = document.querySelector(".projects-track");

const projectSlides = document.querySelectorAll(".project-slide");

const previousProjectButton = document.querySelector(".carousel-prev");

const nextProjectButton = document.querySelector(".carousel-next");

const projectDots = document.querySelectorAll(".carousel-dot");

let currentProject = 0;

/* ==============================
   ACTUALIZAR CARRUSEL
   ============================== */

function updateProjectsCarousel() {
  if (!projectsTrack) {
    return;
  }

  /* Mover carrusel */

  projectsTrack.style.transform = `translateX(-${currentProject * 100}%)`;

  /* Actualizar indicadores */

  projectDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentProject);
  });
}

/* ==============================
   SIGUIENTE PROYECTO
   ============================== */

nextProjectButton?.addEventListener("click", () => {
  currentProject++;

  /* Volver al primer proyecto */

  if (currentProject >= projectSlides.length) {
    currentProject = 0;
  }

  updateProjectsCarousel();
});

/* ==============================
   PROYECTO ANTERIOR
   ============================== */

previousProjectButton?.addEventListener("click", () => {
  currentProject--;

  /* Ir al último proyecto */

  if (currentProject < 0) {
    currentProject = projectSlides.length - 1;
  }

  updateProjectsCarousel();
});

/* ==============================
   NAVEGACIÓN CON LOS PUNTOS
   ============================== */

projectDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentProject = index;

    updateProjectsCarousel();
  });
});

/* ==============================
   NAVEGACIÓN CON TECLADO
   ============================== */

document.addEventListener("keydown", (event) => {
  /* Evitar comportamiento si no existe carrusel */

  if (projectSlides.length === 0) {
    return;
  }

  /* Flecha derecha */

  if (event.key === "ArrowRight") {
    currentProject++;

    if (currentProject >= projectSlides.length) {
      currentProject = 0;
    }

    updateProjectsCarousel();
  }

  /* Flecha izquierda */

  if (event.key === "ArrowLeft") {
    currentProject--;

    if (currentProject < 0) {
      currentProject = projectSlides.length - 1;
    }

    updateProjectsCarousel();
  }
});

/* ==============================
   SOPORTE PARA SWIPE EN CELULAR
   ============================== */

let touchStartX = 0;

let touchEndX = 0;

const projectsCarousel = document.querySelector(".projects-carousel");

projectsCarousel?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },

  {
    passive: true,
  },
);

projectsCarousel?.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;

    handleProjectSwipe();
  },

  {
    passive: true,
  },
);

/* ==============================
   PROCESAR SWIPE
   ============================== */

function handleProjectSwipe() {
  const swipeDistance = touchStartX - touchEndX;

  /* Distancia mínima para considerar swipe */

  const minimumSwipeDistance = 50;

  /* Swipe hacia izquierda */

  if (swipeDistance > minimumSwipeDistance) {
    currentProject++;

    if (currentProject >= projectSlides.length) {
      currentProject = 0;
    }

    updateProjectsCarousel();
  }

  /* Swipe hacia derecha */

  if (swipeDistance < -minimumSwipeDistance) {
    currentProject--;

    if (currentProject < 0) {
      currentProject = projectSlides.length - 1;
    }

    updateProjectsCarousel();
  }
}

/* ==============================
   INICIALIZAR CARRUSEL
   ============================== */

if (projectSlides.length > 0) {
  updateProjectsCarousel();
}
