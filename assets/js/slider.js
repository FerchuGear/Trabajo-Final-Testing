document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector('.slider-track');
  const btnPrev = document.querySelector('.slider-btn-prev');
  const btnNext = document.querySelector('.slider-btn-next');

  if (!sliderTrack || !btnPrev || !btnNext) return;

  let currentIndex = 0;

  function updateSlider() {
    const items = sliderTrack.children;
    const itemWidth = items[0]?.offsetWidth || 0;
    // En mobile, muestra solo 1 producto a la vez
    if (window.innerWidth <= 768) {
      sliderTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    } else {
      sliderTrack.style.transform = '';
    }
  }

  btnPrev.addEventListener('click', () => {
    const items = sliderTrack.children;
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  btnNext.addEventListener('click', () => {
    const items = sliderTrack.children;
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    updateSlider();
  });

  // Si renderizas productos dinámicamente, llama a updateSlider() después de renderizarlos
  setTimeout(updateSlider, 500);
});