(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const body = document.querySelector('body');
    const header = document.querySelector('#header');
    if (!header.classList.contains('scroll-up-sticky') && !header.classList.contains('sticky-top') && !header.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Slide-Out Mobile Nav Toggle
   */
  const navToggleBtn = document.getElementById('navToggle');
  const navCloseBtn = document.getElementById('navClose');
  const navmenu = document.getElementById('navmenu');

  if (navToggleBtn && navmenu) {
    navToggleBtn.addEventListener('click', () => {
      navmenu.classList.add('show');
      document.body.classList.add('mobile-nav-active');
    });
  }

  if (navCloseBtn && navmenu) {
    navCloseBtn.addEventListener('click', () => {
      navmenu.classList.remove('show');
      document.body.classList.remove('mobile-nav-active');
    });
  }

  // Close mobile nav when a link is clicked
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        navmenu.classList.remove('show');
        document.body.classList.remove('mobile-nav-active');
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
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
   * Animation on scroll
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
   * Swiper Initialization
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
   * Swiper Tabs
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

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  window.addEventListener("load", initSwiperTabs);

  /**
   * Initiate GLightbox
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Init isotope layout
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

  /**
   * PureCounter
   */
  new PureCounter();

})();
