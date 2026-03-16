const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const revealItems = document.querySelectorAll(".reveal");
const slider = document.querySelector("[data-slider]");
const slides = document.querySelectorAll("[data-slide]");
const dots = document.querySelectorAll("[data-slide-to]");
const arrows = document.querySelectorAll("[data-slide-dir]");
const contactForm = document.querySelector("[data-contact-form]");

if (navToggle && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (header) {
  const syncHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 32);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

if (slider && slides.length > 1) {
  let activeIndex = 0;
  let autoplayId;

  const setSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  };

  const restartAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      setSlide(activeIndex + 1);
    }, 5500);
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setSlide(Number(dot.dataset.slideTo));
      restartAutoplay();
    });
  });

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      setSlide(activeIndex + Number(arrow.dataset.slideDir));
      restartAutoplay();
    });
  });

  setSlide(0);
  restartAutoplay();
}

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = contactForm.querySelector("[data-contact-status]");
  const targetName = contactForm.getAttribute("target");
  const submitFrame = targetName ? document.querySelector(`iframe[name="${targetName}"]`) : null;
  const defaultButtonLabel = submitButton ? submitButton.textContent : "";
  let awaitingSubmission = false;

  const setStatus = (message, type) => {
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    status.classList.add(type === "error" ? "is-error" : "is-success");
  };

  contactForm.addEventListener("submit", () => {
    awaitingSubmission = true;

    if (status) {
      status.hidden = true;
      status.textContent = "";
      status.classList.remove("is-success", "is-error");
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });

  if (submitFrame) {
    submitFrame.addEventListener("load", () => {
      if (!awaitingSubmission) return;

      awaitingSubmission = false;

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonLabel;
      }

      contactForm.reset();
      setStatus(
        "Thank you. Your inquiry was submitted for processing. If you do not receive a response, please email info@airovia.io directly.",
        "success"
      );
    });
  } else {
    contactForm.addEventListener("submit", () => {
      window.setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonLabel;
        }
      }, 2500);
    });
  }
}
