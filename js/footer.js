fetch("/partials/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });


  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav.sticky-nav");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        nav.classList.add("nav-shrink");
      } else {
        nav.classList.remove("nav-shrink");
      }
    });
  });


  //BACK TO THE TOP
  document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.querySelector(".back-to-top");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });


  //Form validation
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
          e.preventDefault(); // Stop form submission
        }
      });
    });
  });