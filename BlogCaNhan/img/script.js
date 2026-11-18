if (window.AOS) {
  AOS.init({
    duration: 800,
    once: false,
    easing: "ease-out-cubic"
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px'
  });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-copy > *", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: "power3.out"
  });

  gsap.from(".hero-card", {
    x: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
  });

  document.querySelectorAll(".section").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 88%"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });
}

if (window.Typed) {
  new Typed(".typing", {
    strings: ["đổi mới", "chia sẻ", "tạo dấu ấn"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
  });
}

if (window.Swiper) {
  new Swiper(".featured-posts", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
}

if (window.tsParticles) {
  const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;

  tsParticles.load("particles-js", {
    fullScreen: false,
    particles: {
      number: { value: isSmallScreen ? 28 : 70, density: { enable: true, area: 1200 } },
      color: { value: ["#69d27f", "#ffffff", "#3caf62", "#9be6a8"] },
      shape: { type: "circle" },
      opacity: { value: 0.45, random: { enable: true, minimumValue: 0.2 } },
      size: { value: { min: 1, max: 3 } },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.04,
          opacity: 0.5
        }
      },
      links: {
        enable: !isSmallScreen,
        distance: 130,
        color: "#69d27f",
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: isSmallScreen ? 0.6 : 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: !isSmallScreen, mode: "repulse" },
        onClick: { enable: !isSmallScreen, mode: "push" }
      }
    },
    detectRetina: true
  });
}

const timeEl = document.getElementById("clock-time");
const dateEl = document.getElementById("clock-date");

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit"
});

let clockTimer = null;

function updateClock() {
  if (!timeEl || !dateEl) return;

  const now = new Date();
  const timeString = timeFormatter.format(now);
  const dateString = dateFormatter.format(now).toUpperCase();

  if (timeEl.textContent !== timeString) {
    timeEl.textContent = timeString;
  }

  if (dateEl.textContent !== dateString) {
    dateEl.textContent = dateString;
  }
}

function startClock() {
  if (clockTimer) {
    return;
  }

  updateClock();
  clockTimer = window.setInterval(updateClock, 1000);
}

function stopClock() {
  if (clockTimer) {
    window.clearInterval(clockTimer);
    clockTimer = null;
  }
}

startClock();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    startClock();
  } else {
    stopClock();
  }
});

window.addEventListener("focus", startClock);
window.addEventListener("blur", stopClock);

// ===== ENHANCED EFFECTS =====

// Keep the hero card stable and prevent the tilt effect from moving it.
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  heroCard.style.transform = "none";
}

const scrollHint = document.getElementById("scroll-hint");
const academicsSection = document.getElementById("academics");
if (scrollHint && academicsSection) {
  scrollHint.addEventListener("click", () => {
    academicsSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
}

// Keep navigation buttons stable while the page is scrolling.
const linkButtons = document.querySelectorAll(".link-button");
linkButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

    if (href && !isModifiedClick) {
      e.preventDefault();

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        window.location.href = href;
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    }

    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple-out 0.6s ease-out;
    `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation keyframe dynamically
if (!document.querySelector('style[data-ripple]')) {
  const style = document.createElement("style");
  style.setAttribute("data-ripple", "true");
  style.textContent = `
    @keyframes ripple-out {
      from {
        opacity: 1;
        transform: scale(0);
      }
      to {
        opacity: 0;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}

// Auto-play the original background music and allow toggling from the button
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

if (music && musicToggle) {
  let isMusicEnabled = true;

  const updateMusicButton = () => {
    musicToggle.textContent = isMusicEnabled ? "🔊" : "🔈";
    musicToggle.setAttribute("aria-label", isMusicEnabled ? "Tắt nhạc" : "Bật nhạc");
    musicToggle.setAttribute("title", isMusicEnabled ? "Tắt nhạc" : "Bật nhạc");
  };

  const startMusic = async () => {
    if (!isMusicEnabled) {
      return;
    }

    try {
      music.currentTime = 0;
      await music.play();
    } catch {
      // Browser may block autoplay until the user interacts.
    }

    if (!music.paused) {
      updateMusicButton();
    }
  };

  musicToggle.addEventListener("click", async () => {
    if (!isMusicEnabled) {
      isMusicEnabled = true;
      await startMusic();
    } else {
      isMusicEnabled = false;
      music.pause();
      updateMusicButton();
    }
  });

  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  music.addEventListener("ended", () => {
    if (isMusicEnabled) {
      music.currentTime = 0;
      music.play().catch(() => {});
    }
  });

  const beginMusic = () => {
    startMusic().catch(() => {});
    setTimeout(() => {
      if (!music.paused) {
        updateMusicButton();
      }
    }, 250);
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    window.setTimeout(beginMusic, 300);
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(beginMusic, 300);
    }, { once: true });
  }

  window.addEventListener("pointerdown", beginMusic, { once: true, passive: true });
  window.addEventListener("keydown", beginMusic, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      beginMusic();
    }
  });

  updateMusicButton();
}
