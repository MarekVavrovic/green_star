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