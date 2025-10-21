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


  const zoomContainer = document.getElementById("zoomBox");
  const zoomImage = document.getElementById("zoomImage");

  // Create magnifier
  const magnifier = document.createElement("div");
  magnifier.classList.add("magnifier");
  const magnifierImg = document.createElement("img");
  magnifierImg.src = zoomImage.src;
  magnifier.appendChild(magnifierImg);
  zoomContainer.appendChild(magnifier);

  const zoomLevel = 2; // Magnification level

  zoomContainer.addEventListener("mousemove", (e) => {
    magnifier.style.display = "block";

    const rect = zoomContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glassSize = magnifier.offsetWidth / 2;

    // Position the magnifier glass
    magnifier.style.left = `${x - glassSize}px`;
    magnifier.style.top = `${y - glassSize}px`;

    // Move the background image inside magnifier
    magnifierImg.style.width = `${zoomImage.width * zoomLevel}px`;
    magnifierImg.style.height = `${zoomImage.height * zoomLevel}px`;
    magnifierImg.style.left = `${-x * (zoomLevel - 1) + glassSize}px`;
    magnifierImg.style.top = `${-y * (zoomLevel - 1) + glassSize}px`;
  });

  zoomContainer.addEventListener("mouseleave", () => {
    magnifier.style.display = "none";
  });
