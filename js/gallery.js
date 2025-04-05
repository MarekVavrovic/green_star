import {  galleryDataTwo } from "../data.js";

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
  const galleryImages = document.querySelector(".galleryTwo");

  // 1. Render dynamic gallery items first
  galleryImages.innerHTML = galleryDataTwo
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
            <img src="./img/gallery/photo.png" alt="icon" class="icon" />
          </div>
        </div>`;
    })
    .join("");

  // 2. Then instantiate Gallery AFTER images exist
  const gallery = new Gallery(getElement(".galleryTwo"));

});
