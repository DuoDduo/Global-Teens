(function () {
  "use strict";
 const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const navMenu = document.getElementById('navmenu');
  const navLinks = document.querySelectorAll('#navmenu .nav-link');
  const body = document.body;

  // Function to close the menu
  function closeMenu() {
    body.classList.remove('mobile-nav-active');
    navMenu.style.transform = 'translateX(100%)';
  }

  // Open menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      body.classList.add('mobile-nav-active');
      navMenu.style.transform = 'translateX(0)';
    });
  }

  // Close menu via close button
  if (navClose) {
    navClose.addEventListener('click', closeMenu);
  }

  // Close menu when any nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });


   //Remove preloader once the page loads
   
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  //Scroll-to-top button visibility and behavior
   
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Web3Forms submission handler
   */
  const form = document.getElementById("contact-form");
  const result = document.getElementById("result");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
          result.innerHTML = `<div class="alert alert-success">✅ Message sent successfully!</div>`;
          form.reset();
        } else {
          result.innerHTML = `<div class="alert alert-danger">❌ ${json.message}</div>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<div class="alert alert-danger">❌ Something went wrong!</div>`;
      });
    });
  }

  /**
   * Initialize AOS (Animate On Scroll)
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initialize Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Initialize Swiper sliders with custom dot pagination
   */
  function initSwiperTabs() {
    document.querySelectorAll(".init-swiper-tabs").forEach(function (swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      const dotsContainer = swiperElement.closest("section").querySelector(".js-custom-dots");
      if (!dotsContainer) return;

      const customDots = dotsContainer.querySelectorAll("a");
      delete config.pagination;

      const swiperInstance = new Swiper(swiperElement, config);

      swiperInstance.on("slideChange", function () {
        updateSwiperTabsPagination(swiperInstance, customDots);
      });

      customDots.forEach((dot, index) => {
        dot.addEventListener("click", function (e) {
          e.preventDefault();
          swiperInstance.slideToLoop(index);
          updateSwiperTabsPagination(swiperInstance, customDots);
        });
      });

      updateSwiperTabsPagination(swiperInstance, customDots);
    });
  }

  /**
   * Update Swiper tab pagination styling
   */
  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  window.addEventListener("load", initSwiperTabs);

  /**
   * Initialize GLightbox for lightbox functionality
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Initialize Isotope for filterable grid layouts
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filterEl) {
      filterEl.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      });
    });
  });

})();
