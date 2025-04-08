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