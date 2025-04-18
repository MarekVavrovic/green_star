import sliders, { testimony, mission, galleryData } from "./data.js";


const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

function hideIconsOnMobile() {
  if (window.innerWidth < 768) {
    document.querySelectorAll(".links li i").forEach((icon) => {
      icon.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  hideIconsOnMobile();

 
  const navLinks = document.querySelectorAll(".links a.green-bg");
  navLinks.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active-link");
    }
  });
});


// Toggle nav open/close
navToggle.addEventListener("click", function () {
  if (links.style.maxHeight) {
    links.style.maxHeight = null;
  } else {
    links.style.maxHeight = links.scrollHeight + "px";
    hideIconsOnMobile();
  }
});

// On resize
window.addEventListener("resize", function () {
  if (window.innerWidth >= 768) {
    links.style.maxHeight = null;

    // Show icons again
    document.querySelectorAll(".links li i").forEach((icon) => {
      icon.style.removeProperty("display");
    });
  } else {
    hideIconsOnMobile();
  }
});


//GSAP ANIMATION
const container = document.querySelector(".slider-container");
const nextBtn = document.querySelector(".next-btn-slider");
const prevBtn = document.querySelector(".prev-btn-slider");
const heartLeft = document.querySelector(".left-heart");
const heartRight = document.querySelector(".right-heart");
const sliderSection = document.querySelector("section.slider");

const runGsapAnimation = () => {
  const activeSlide = document.querySelector(".slide.active");
  if (!activeSlide) return;

  const greenStar = activeSlide.querySelector(".green-star, .green-star-next");
  const kidImage = activeSlide.querySelector(".kids img, .kids-next img");
  const skyElements = activeSlide.querySelectorAll(".sky-container img");
  const texts = activeSlide.querySelectorAll(
    ".text-1, .text-2, .text-2-next, .text-3, .text-3-next, .text-4"
  );
  const contactBtn = activeSlide.querySelector(".btn-contact");

  // 💡 RESET positions before animating (percent-based to preserve layout)
  if (greenStar) gsap.set(greenStar, { opacity: 0, yPercent: 30 });

  if (kidImage) gsap.set(kidImage, { opacity: 0, xPercent: -100 });

  gsap.set(skyElements, { opacity: 0, yPercent: 50 });

  if (texts.length > 0) gsap.set(texts, { opacity: 0, yPercent: 30 });

  if (contactBtn) gsap.set(contactBtn, { opacity: 0, scale: 0.8 });

  // 🔄 TIMELINE SEQUENCE
  const tl = gsap.timeline();

  // Step 1: green star
  if (greenStar) {
    tl.to(greenStar, {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }

  // Step 2: kids image slides from left to center
  if (kidImage) {
    tl.to(
      kidImage,
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5" // overlap slightly with previous
    );
  }

  // Step 3: clouds/stars come from bottom with bounce
  skyElements.forEach((el, i) => {
    tl.to(
      el,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        ease: "bounce.out",
      },
      `-=${0.4 - i * 0.02}`
    );
  });

  // Step 4: texts appear word-by-word
  texts.forEach((el, i) => {
    tl.to(
      el,
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      `+=${i === 0 ? 0.3 : 0.15}`
    );
  });

  // Step 5: contact button (for slide 2)
  if (contactBtn) {
    tl.to(
      contactBtn,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
  }
};




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
              : `<a href="kontakt.html"><button class="btn-contact">Kontaktujte nás &gt</button></a>`
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
    ? 'url("./img/hero/background-11.jpg")'
    : 'url("./img/hero/background-2.jpg")';
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

 
  setTimeout(() => {
    runGsapAnimation();
  }, 150); 
};





// Button events

// Manual button navigation (no reset needed anymore)
nextBtn.addEventListener("click", () => startSlider());
prevBtn.addEventListener("click", () => startSlider("prev"));
heartLeft.addEventListener("click", () => startSlider("prev"));
heartRight.addEventListener("click", () => startSlider());

// Initial background update
updateHeartColorsAndBackground();

// GSAP autoplay timeline
const autoPlayTimeline = gsap.timeline({ repeat: -1 });

// Call slide change
autoPlayTimeline.call(() => {
  startSlider();
});

// Wait for animation to finish (~3s), then delay next slide
// Assuming your GSAP animation lasts ~4s total
autoPlayTimeline.to({}, { duration: 7 + 4 }); // wait full time



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
            <img src="./img/gallery/photo.png" alt="icon" class="icon" />
          </div>
        </div>`;
    })
    .join("");

  // 2. Then instantiate Gallery AFTER images exist
  const gallery = new Gallery(getElement(".gallery"));
 
});




document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav.sticky-nav");

  window.addEventListener("scroll", function () {
    if (window.innerWidth >= 768) {
      if (window.scrollY > 100) {
        nav.classList.add("nav-shrink");
      } else {
        nav.classList.remove("nav-shrink");
      }
    } else {
      
      nav.classList.remove("nav-shrink");
    }
  });
});



// BACK TO THE TOP BUTTON

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 250 ) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


//FORM VALIDATION

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form[action*='formspree.io']");

  forms.forEach((form) => {
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    const messageTextarea = form.querySelector("textarea[name='message']");
    const errorTips = form.querySelectorAll(".not-valid-tip");
    const mainError = form.querySelector(".validation-error");

    form.addEventListener("submit", function (e) {
      let valid = true;

      // Reset error states
      errorTips.forEach((tip) => (tip.style.display = "none"));
      if (mainError) mainError.style.display = "none";

      if (!nameInput.value.trim()) {
        const tip = nameInput.nextElementSibling;
        if (tip) tip.style.display = "inline";
        valid = false;
      }

      if (
        !emailInput.value.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
      ) {
        const tip = emailInput.nextElementSibling;
        if (tip) tip.style.display = "inline";
        valid = false;
      }

      if (!messageTextarea.value.trim()) {
        if (mainError) mainError.style.display = "block";
        valid = false;
      }

      if (!valid) {
        e.preventDefault(); 
      }
    });
  });
});




