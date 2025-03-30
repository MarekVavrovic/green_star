import sliders, { testimony, mission, galleryData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".links a");

  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.parentElement.parentElement.classList.add("active-link");
    }
  });
});

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  if (links.style.maxHeight) {
    links.style.maxHeight = null; // Close menu
  } else {
    links.style.maxHeight = links.scrollHeight + "px"; // Expand menu
  }
});

//  menu is visible on larger screens
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    links.style.maxHeight = null; // Remove height restriction
  }
});

const container = document.querySelector(".slider-container");
const nextBtn = document.querySelector(".next-btn-slider");
const prevBtn = document.querySelector(".prev-btn-slider");
const heartLeft = document.querySelector(".left-heart");
const heartRight = document.querySelector(".right-heart");
const sliderSection = document.querySelector("section.slider");

if (sliders.length !== 2) {
  console.error("This slider is designed for exactly 2 slides.");
}

container.innerHTML = sliders
  .map((data, slideIndex) => {
    const {
      img_1,
      img_2,
      img_3,
      img_4,
      img_5,
      img_6,
      img_7,
      img_8,
      img_9,
      img_10,
      text_1,
      green_star,
      text_2,
      text_3,
      text_4,
      crocodile,
    } = data;

    let position = slideIndex === 0 ? "active" : "next";

    return `<article class="slide ${position}">
      <div class="sky-container">
        <img src=${img_1} class="cloud" alt="cloud" />
        <img src=${img_2} class="star" alt="star" />
        ${
          slideIndex === 0
            ? `<img src=${img_3} class="cloud" alt="cloud" />`
            : `<img src=${img_3} class="cloud cloud-next" alt="cloud" />`
        }
        
        <img src=${img_4} class="star" alt="star" />
        <img src=${img_5} class="rocket" alt="rocket" />
        <img src=${img_6} class="star" alt="star" />
        <img src=${img_7} class="cloud" alt="cloud" />
        <img src=${img_8} class="star" alt="star" />
        <img src=${img_9} class="star" alt="star" />
      </div>
      <div class="kids-text-crocodile">
      ${
        slideIndex === 0
          ? ` <div class="kids">
          <img src=${img_10} alt="kids" />
        </div>`
          : ` <div class="kids-next">
          <img src=${img_10} alt="kids" />
        </div>`
      }
       
        <div class="text-crocodile">
          <h2 class="text-1">${text_1}</h2>
          ${
            slideIndex === 0
              ? `<img src=${green_star} class="green-star" alt="star" />`
              : `<img src=${green_star} class="green-star-next" alt="star" />`
          }
          ${
            slideIndex === 0
              ? `<h2 class="text-2">${text_2}</h2>`
              : `<h2 class="text-2-next">${text_2}</h2>`
          }
          ${
            slideIndex === 0
              ? `<h2 class="text-3">${text_3}</h2>`
              : `<h2 class="text-3-next">${text_3}</h2>`
          }
          
          <h2 class="text-4">${text_4}</h2>
          ${
            slideIndex === 0
              ? `<img src=${crocodile} class="crocodile" alt="crocodile" />`
              : `<button class="btn-contact">Kontaktujte nás &gt</button>`
          }
          
        </div>
      </div>
    </article>`;
  })
  .join("");

const updateHeartColorsAndBackground = () => {
  const activeSlide = document.querySelector(".active");
  const isFirstSlideActive = activeSlide === container.firstElementChild;

  heartLeft.style.color = isFirstSlideActive
    ? "#f25141"
    : "rgba(242, 81, 65, 0.6)";
  heartRight.style.color = isFirstSlideActive
    ? "rgba(242, 81, 65, 0.6)"
    : "#f25141";

  sliderSection.style.backgroundImage = isFirstSlideActive
    ? 'url("/img/hero/background-11.jpg")'
    : 'url("/img/hero/background-2.jpg")';
};

const startSlider = (type) => {
  const active = document.querySelector(".active");
  const next = document.querySelector(".next");

  active.classList.remove("active");
  next.classList.remove("next");

  if (type === "prev") {
    active.classList.add("next");
    next.classList.add("active");
  } else {
    active.classList.add("next");
    next.classList.add("active");
  }
  updateHeartColorsAndBackground();
};

// Button events
nextBtn.addEventListener("click", () => startSlider());
prevBtn.addEventListener("click", () => startSlider("prev"));
heartLeft.addEventListener("click", () => startSlider("prev"));
heartRight.addEventListener("click", () => startSlider());

updateHeartColorsAndBackground();

// heart-slider

const testimonyWrapper = document.querySelector(".testimony-wrapper");

testimonyWrapper.innerHTML = testimony
  .map((data, slideIndex) => {
    const { icon, text, author_status, author_name } = data;

    let position = "next-item";
    if (slideIndex === 0) {
      position = "active-item";
    }

    return `<div class="item ${position}">
            <div class="testimony-icon">
              <img src=${icon} />
            </div>
            <div class="testimony-content">
              <h6>
               ${text}
              </h6>
              <div class="deliminer"></div>
              <div class="author"><strong> ${author_status} </strong>${author_name}</div>
            </div>
          </div>`;
  })
  .join("");

const items = document.querySelectorAll(".item");
const hearts = document.querySelectorAll(".item-heart");

function heartSlider(index) {
  // Remove active classes
  items.forEach((item) => item.classList.remove("active-item", "next-item"));

  hearts.forEach((heart) => heart.classList.remove("active-heart"));

  // Add active class to current
  items[index].classList.add("active-item");
  hearts[index].classList.add("active-heart");

  // Calculate next

  const nextIndex = index === items.length - 1 ? 0 : index + 1;

  items[nextIndex].classList.add("next-item");
}

// Attach event listeners to each heart
hearts.forEach((heart, index) => {
  heart.addEventListener("click", () => {
    heartSlider(index);
  });
});

//Gallery

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(`${selection} not found`);
};

class Gallery {
  constructor(element) {
    this.container = element;
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.modalImages = getElement(".modal-images");
    this.closeBtn = getElement(".btn-close");

    this.nextBtns = [
      ...document.querySelectorAll(".btn-next-control, .next-btn"),
    ];
    this.prevBtns = [
      ...document.querySelectorAll(".btn-prev-control, .prev-btn"),
    ];
    this.playBtn = getElement(".btn-play");
    this.counter = getElement(".img-counter");

    this.autoPlayInterval = null;

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.toggleAutoPlay = this.toggleAutoPlay.bind(this);

    this.container.addEventListener("click", (e) => {
      const target = e.target;

      const clickedImage = target.closest(".img-gallery");
      const clickedOverlay = target.closest(".overlay");
      const clickedIcon = target.closest(".icon");

      if (clickedImage || clickedOverlay || clickedIcon) {
        const imgElement = target
          .closest(".img-wrapper")
          .querySelector(".img-gallery");
        this.list = [...this.container.querySelectorAll(".img-gallery")];
        this.openModal(imgElement);
      }
    });
  }

  openModal(selectedImage) {
    this.setMainImage(selectedImage);

    this.modalImages.innerHTML = this.list
      .map(
        (image) => `
      <img
        src="${image.src}"
        data-id="${image.dataset.id}"
        class="${
          selectedImage.dataset.id === image.dataset.id
            ? "modal-img selected"
            : "modal-img"
        }"
        alt="img"
      />
    `
      )
      .join("");

    this.modal.classList.add("open");

    this.closeBtn.addEventListener("click", this.closeModal);
    this.modalImages.addEventListener("click", this.chooseImage);
    this.nextBtns.forEach((btn) =>
      btn.addEventListener("click", this.nextImage)
    );
    this.prevBtns.forEach((btn) =>
      btn.addEventListener("click", this.prevImage)
    );
    this.playBtn.addEventListener("click", this.toggleAutoPlay);

    this.updateCounter();
  }

  closeModal() {
    this.modal.classList.remove("open");
    this.stopAutoPlay();

    this.closeBtn.removeEventListener("click", this.closeModal);
    this.modalImages.removeEventListener("click", this.chooseImage);
    this.nextBtns.forEach((btn) =>
      btn.removeEventListener("click", this.nextImage)
    );
    this.prevBtns.forEach((btn) =>
      btn.removeEventListener("click", this.prevImage)
    );
    this.playBtn.removeEventListener("click", this.toggleAutoPlay);
  }

  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;

    // Update counter
    this.updateCounter();
  }

  updateCounter() {
    const selected = this.modalImages.querySelector(".selected");
    const index = [...this.modalImages.children].indexOf(selected) + 1;
    const total = this.modalImages.children.length;
    this.counter.textContent = `${index}/${total}`;
  }

  nextImage() {
    const selected = this.modalImages.querySelector(".selected");
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;

    selected.classList.remove("selected");
    next.classList.add("selected");

    this.setMainImage(next);
  }

  prevImage() {
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;

    selected.classList.remove("selected");
    prev.classList.add("selected");

    this.setMainImage(prev);
  }

  chooseImage(e) {
    if (e.target.classList.contains("modal-img")) {
      const selected = this.modalImages.querySelector(".selected");
      selected.classList.remove("selected");
      e.target.classList.add("selected");

      this.setMainImage(e.target);
    }
  }

  toggleAutoPlay() {
    if (this.autoPlayInterval) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(this.nextImage, 3000);
    this.playBtn.classList.remove("btn-play");
    this.playBtn.classList.add("btn-pause");
    this.playBtn.title = "Pause";
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = null;
    this.playBtn.classList.remove("btn-pause");
    this.playBtn.classList.add("btn-play");
    this.playBtn.title = "Play";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelector(".gallery");

  // 1. Render dynamic gallery items first
  galleryImages.innerHTML = galleryData
    .map(({ src, id, alt }) => {
      return `
        <div class="img-wrapper">
          <img
            src="${src}"
            class="img-gallery"
            data-id="${id}"
            alt="${alt}"
          />
          <div class="overlay">
            <img src="/img/gallery/photo.png" alt="icon" class="icon" />
          </div>
        </div>`;
    })
    .join("");

  // 2. Then instantiate Gallery AFTER images exist
  const gallery = new Gallery(getElement(".gallery"));
});
