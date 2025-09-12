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


document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".category-box");
  const icons = document.querySelectorAll(".catergory-icon .material-icons");
  

  // safety checks
  if (!box || icons.length < 2) return;

  const leftBtn = icons[0];
  const rightBtn = icons[1];

  // make icons look clickable
  leftBtn.style.cursor = "pointer";
  rightBtn.style.cursor = "pointer";

  const scrollAmount = 200; // px per move

  // Clone items once to simulate infinite loop
  if (!box.dataset.cloned) {
    box.innerHTML += box.innerHTML;
    box.dataset.cloned = "true";
  }

  // Reset scroll seamlessly by shifting by half the scrollWidth
  function resetScroll() {
    const half = box.scrollWidth / 2;
    if (box.scrollLeft >= half) {
      // move back by exactly half so the visual sequence is unchanged
      box.scrollLeft -= half;
    } else if (box.scrollLeft <= 0) {
      box.scrollLeft += half;
    }
  }

  // Prevent rapid-click issues by locking while a scroll is in progress
  let isScrolling = false;
  function safeScrollBy(amount) {
    if (isScrolling) return;
    isScrolling = true;
    box.scrollBy({ left: amount, behavior: "smooth" });
    // timeout should roughly match the smooth animation duration
    setTimeout(() => {
      resetScroll();
      isScrolling = false;
    }, 450);
  }

  rightBtn.addEventListener("click", () => safeScrollBy(scrollAmount));
  leftBtn.addEventListener("click", () => safeScrollBy(-scrollAmount));
});


const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

function syncInputs() {
  let minVal = parseInt(rangeMin.value);
  let maxVal = parseInt(rangeMax.value);
  if (minVal > maxVal) {
    [minVal, maxVal] = [maxVal, minVal];
  }
  minPrice.value = minVal;
  maxPrice.value = maxVal;
}

rangeMin.addEventListener("input", syncInputs);
rangeMax.addEventListener("input", syncInputs);