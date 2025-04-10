document.addEventListener("DOMContentLoaded", () => {
  const runGSAPAnimations = () => {
    const activeSlide = document.querySelector(".slide.active");
    if (!activeSlide) return;

    const greenStar = activeSlide.querySelector(
      ".green-star, .green-star-next"
    );
    const kidImage = activeSlide.querySelector(".kids img, .kids-next img");
    const skyElements = activeSlide.querySelectorAll(".sky-container img");
    const texts = activeSlide.querySelectorAll(
      ".text-1, .text-2, .text-2-next, .text-3, .text-3-next, .text-4"
    );
    const contactBtn = activeSlide.querySelector(".btn-contact");

    // Reset all before animating again
    gsap.set([greenStar, kidImage, ...skyElements, ...texts, contactBtn], {
      opacity: 0,
      y: 50,
    });

    const tl = gsap.timeline();

    // Step 1: green star
    if (greenStar) {
      tl.to(greenStar, { opacity: 1, duration: 0.8, ease: "power2.out" });
    }

    // Step 2: kid image slide in
    if (kidImage) {
      tl.to(
        kidImage,
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    // Step 3: clouds/stars float in from bottom
    skyElements.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "bounce.out",
        },
        "-=0.4"
      );
    });

    // Step 4: staggered text word-by-word
    if (texts.length) {
      texts.forEach((el, index) => {
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          `+=${index * 0.2}`
        );
      });
    }

    // Step 5 (optional): contact button for slide 2
    if (contactBtn) {
      tl.to(
        contactBtn,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }
  };

  // Run GSAP animations on load
  runGSAPAnimations();

  // Run GSAP on manual/automatic slide change
  document
    .querySelectorAll(
      ".next-btn-slider, .prev-btn-slider, .left-heart, .right-heart"
    )
    .forEach((btn) =>
      btn.addEventListener("click", () => {
        setTimeout(() => {
          runGSAPAnimations();
        }, 300); // allow DOM class switch to complete
      })
    );
});
