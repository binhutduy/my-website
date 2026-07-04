AOS.init({
  duration: 800,
  once: false,
  easing: "ease-out-cubic"
});

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
  tsParticles.load("particles-js", {
    fullScreen: false,
    particles: {
      number: { value: 140, density: { enable: true, area: 1200 } },
      color: { value: ["#4ade80", "#ffffff", "#22c55e", "#86efac"] },
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
        enable: true,
        distance: 130,
        color: "#4ade80",
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" }
      }
    },
    detectRetina: true
  });
}

function updateClock() {
  const timeEl = document.getElementById("clock-time");
  const dateEl = document.getElementById("clock-date");
  if (!timeEl || !dateEl) return;

  const now = new Date();
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const timeString = now.toLocaleTimeString("vi-VN", { hour12: false });
  const dateString = now.toLocaleDateString("en-US", options).toUpperCase();

  timeEl.textContent = timeString;
  dateEl.textContent = dateString;
}

updateClock();
setInterval(updateClock, 1000);

// ===== ENHANCED EFFECTS =====

// Create single orbital particle around main blocks
function createOrbitalParticle(element, radiusOffset, speed, isReverse) {
  const container = document.createElement("div");
  container.className = "orbit-container";
  container.style.position = "absolute";
  container.style.inset = "0";
  container.style.width = element.offsetWidth + radiusOffset * 2 + "px";
  container.style.height = element.offsetHeight + radiusOffset * 2 + "px";
  container.style.left = -radiusOffset + "px";
  container.style.top = -radiusOffset + "px";
  container.style.pointerEvents = "none";
  
  const particle = document.createElement("div");
  particle.className = "orbit-particle";
  
  const keyframeName = `orbit-single-${Math.random().toString(36).substr(2, 9)}`;
  
  const style = document.createElement("style");
  const animationDir = isReverse ? "reverse" : "normal";
  
  style.textContent = `
    @keyframes ${keyframeName} {
      0% {
        transform: rotate(0deg) translateX(${radiusOffset}px) rotate(0deg);
        opacity: 0.9;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: rotate(360deg) translateX(${radiusOffset}px) rotate(-360deg);
        opacity: 0.9;
      }
    }
    
    .particle-${keyframeName} {
      animation: ${keyframeName} ${speed}s linear infinite;
      animation-direction: ${animationDir};
    }
  `;
  
  particle.classList.add(`particle-${keyframeName}`);
  document.head.appendChild(style);
  container.appendChild(particle);
  
  element.style.position = "relative";
  element.insertBefore(container, element.firstChild);
}

// Add single orbital particle to hero card
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  createOrbitalParticle(heroCard, 120, 12, false);
}

// Add single orbital particle to academics card
const academicsCard = document.querySelector(".academics-card");
if (academicsCard) {
  createOrbitalParticle(academicsCard, 140, 15, false);
}

// Add single orbital particle to clock card
const clockCard = document.querySelector(".clock-card");
if (clockCard) {
  createOrbitalParticle(clockCard, 140, 18, true);
}

// Mouse parallax effect on hero card
if (heroCard) {
  document.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const distance = 8;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    heroCard.style.transform = `perspective(1000px) rotateX(${y * 0.5}deg) rotateY(${-x * 0.5}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}

// Stagger animation for link buttons
const linkButtons = document.querySelectorAll(".link-button");
linkButtons.forEach((btn, index) => {
  btn.style.animation = `float-up ${2 + index * 0.2}s ease-in-out infinite`;
  btn.style.animationDelay = `${index * 0.1}s`;
});

// Ripple effect on button click
linkButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
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

// Music toggle
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
if (music && musicToggle) {
  music.volume = 0.45;
  music.muted = false;

  function updateMusicButton() {
    musicToggle.textContent = music.paused ? "🔈" : "🔊";
    musicToggle.title = music.paused ? "Bật nhạc" : "Tắt nhạc";
  }

  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {
        // Nếu vẫn bị chặn, người dùng đã bấm và sẽ cần bấm lại
      });
    } else {
      music.pause();
    }
  });

  music.addEventListener("play", updateMusicButton);
  music.addEventListener("pause", updateMusicButton);
  music.addEventListener("ended", updateMusicButton);

  updateMusicButton();
}
