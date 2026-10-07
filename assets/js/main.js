/**
 * Legalize.idn - Main Application JavaScript
 * Bootstrap 5.3 + Custom Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. Destination Portfolio Carousel (Slick) ---
  if (window.jQuery && jQuery.fn.slick && jQuery('.portfolio-cards-grid').length) {
    jQuery('.portfolio-cards-grid').slick({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: jQuery('.portfolio-nav-btn.prev-btn'),
      nextArrow: jQuery('.portfolio-nav-btn.next-btn'),
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  } else {
    // Fallback native scroll
    const portfolioGrid = document.querySelector('.portfolio-cards-grid');
    const prevBtn = document.querySelector('.portfolio-nav-btn.prev-btn');
    const nextBtn = document.querySelector('.portfolio-nav-btn.next-btn');

    if (portfolioGrid && prevBtn && nextBtn) {
      const scrollAmount = 300;

      nextBtn.addEventListener('click', function () {
        portfolioGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', function () {
        portfolioGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  }

  // --- 2. Testimonials Slider (Slick) ---
  if (window.jQuery && jQuery.fn.slick && jQuery('.testimonial-slider-grid').length) {
    jQuery('.testimonial-slider-grid').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: jQuery('.testimonial-nav-btn.prev-btn'),
      nextArrow: jQuery('.testimonial-nav-btn.next-btn'),
      autoplay: true,
      autoplaySpeed: 4500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    });
  }

  // --- 3. Active Navbar State on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Default to beranda if at top
    if (scrollY < 200) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#beranda') {
          link.classList.add('active');
        }
      });
    }
  });

  // --- 3. Consultation Form WhatsApp Handler ---
  const consultForm = document.getElementById('consultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('waNumber').value.trim();
      const visaType = document.getElementById('visaType').value;

      if (!name || !phone) {
        alert('Mohon lengkapi Nama dan No. WhatsApp Anda.');
        return;
      }

      // Format WhatsApp message
      const textMessage = `Halo Legalize.idn, saya ${name} (${phone}) ingin berkonsultasi mengenai pengurusan visa: ${visaType || 'Konsultasi Umum'}.`;
      const encodedMsg = encodeURIComponent(textMessage);
      const waUrl = `https://wa.me/6282225258761?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
    });
  }

  // --- 4. Presentation Slide Mode Toggle ---
  const toggleFullBtn = document.getElementById('btnViewFull');
  const toggleSlideBtn = document.getElementById('btnViewSlide');
  const slideControls = document.getElementById('slideControlsBar');
  const slideIndicator = document.getElementById('slideIndicator');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');

  const slides = document.querySelectorAll('.slide-section');
  let currentSlideIndex = 0;

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    currentSlideIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentSlideIndex) {
        slide.classList.add('slide-active');
      } else {
        slide.classList.remove('slide-active');
      }
    });

    if (slideIndicator) {
      slideIndicator.textContent = `Halaman ${currentSlideIndex + 1} / ${slides.length}`;
    }

    if (window.jQuery && jQuery.fn.slick) {
      jQuery('.testimonial-slider-grid, .portfolio-cards-grid').slick('setPosition');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (toggleFullBtn && toggleSlideBtn) {
    toggleFullBtn.addEventListener('click', function () {
      document.body.classList.remove('slide-mode');
      toggleFullBtn.classList.add('active');
      toggleSlideBtn.classList.remove('active');
      slides.forEach(s => s.classList.remove('slide-active'));
      if (window.jQuery && jQuery.fn.slick) {
        jQuery('.testimonial-slider-grid, .portfolio-cards-grid').slick('setPosition');
      }
    });

    toggleSlideBtn.addEventListener('click', function () {
      document.body.classList.add('slide-mode');
      toggleSlideBtn.classList.add('active');
      toggleFullBtn.classList.remove('active');
      showSlide(0);
    });

    if (prevSlideBtn && nextSlideBtn) {
      prevSlideBtn.addEventListener('click', function () {
        if (currentSlideIndex > 0) {
          showSlide(currentSlideIndex - 1);
        }
      });

      nextSlideBtn.addEventListener('click', function () {
        if (currentSlideIndex < slides.length - 1) {
          showSlide(currentSlideIndex + 1);
        }
      });
    }

    // Keyboard arrow keys for slide navigation
    document.addEventListener('keydown', function (e) {
      if (!document.body.classList.contains('slide-mode')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        showSlide(currentSlideIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        showSlide(currentSlideIndex - 1);
      }
    });
  }
});
