window.addEventListener("scroll", function () {
  const header = document.getElementById("header"); // or your header ID/class
  if (window.scrollY > 100) {
    header.classList.add("fixed-header");
  } else {
    header.classList.remove("fixed-header");
  }
});

const myCarouselElement = document.querySelector("#carouselExampleDark");

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 112000,
  touch: false,
});
