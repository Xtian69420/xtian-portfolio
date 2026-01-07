const projects = [
  {
    title: 'MOVIEIGUESS',
    description: 'movieIguess is a responsive movie and TV series streaming site with seamless browsing, server switching, and playback. It showcases my skills in full-stack development, UI design, and API integration.',
    link: 'https://xtian69420.github.io/movieIguess/'
  },
  {
    title: 'OCR AI SCANNER',
    description: 'OCR AI Scanner is a powerful tool that extracts text from images, scanned documents, and handwritten notes using advanced machine learning. It supports multiple languages, delivers fast and accurate results, and simplifies digital data processing.',
    link: 'https://xtian69420.github.io/ocr-test/'
  },
  {
    title: 'HAPAG',
    description: 'Is a mobile app for sharing and discovering recipes within a vibrant food-loving community. Users can upload their own dishes, explore others\' creations, and connect with fellow home cooks. Cook, share, and inspire—anytime, anywhere.',
    link: 'https://github.com/Xtian69420/HAPAG-FOOD-ENTHUSIAST-COMMUNITY'
  },
  {
    title: 'BETCHA API',
    description: 'This Server API is a robust backend system powering the Betcha Booking app. Built with Node.js and MongoDB, it handles user authentication, booking management, image uploads, and Google Drive...',
    link: 'https://betcha-booking.vercel.app/'
  },
  {
    title: 'HELP HEALTH',
    description: 'Is a donation-focused mobile app designed for hospitals and healthcare centers. Users can contribute through cash or material donations, making it easy to support medical needs, improve patient care, and assist facilities in real-time.',
    link: 'https://github.com/Xtian69420/HELP-HEALTH-PROTOTYPE'
  },
  {
    title: 'IMAGE GENERATOR',
    description: 'Is a clone that has advanced image generator that uses AI to create hyper-realistic visuals based on user input. Ideal for avatars, concepts, and design mockups, it offers fast rendering, customizable styles, and stunning creative output.',
    link: 'https://xtian69420.github.io/Image-generator/'
  }
];

const leftItems = document.querySelectorAll('.leftItems');
const imgId = document.getElementById('imgId');
const titleId = document.getElementById('titleId');
const descId = document.getElementById('descId');
const linkBtn = document.getElementById('linkId');



// Automatically trigger click on the first leftItems element on page load and enable autoplay
let currentIndex = 0;
const AUTOPLAY_INTERVAL = 1500; // ms
let autoplayId = null;

// Description truncation: limit characters shown and append ellipsis
const MAX_DESC_CHARS = 200; // change this number to adjust visible character limit
function truncateText(str, max) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str;
} 

function selectProjectByIndex(index) {
  // Programmatic selection (not user-initiated) should NOT toggle the locked state
  applySelection(index, false);
}

function nextProject() {
  currentIndex = (currentIndex + 1) % leftItems.length;
  selectProjectByIndex(currentIndex);
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = setInterval(nextProject, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}

// Lock state: when true, hover/select won't change selection until unlocked
let isLocked = false;

function applySelection(index, userInitiated = false) {
  if (index < 0 || index >= leftItems.length) return;
  // update UI
  leftItems.forEach(i => i.classList.remove('highlight'));
  const item = leftItems[index];
  item.classList.add('highlight');

  currentIndex = index;

  const project = projects[index];
  const img = item.querySelector('img');
  const p = item.querySelector('p');

  if (!img || !p) return;

  imgId.src = img.src;
  titleId.textContent = project.title;
  descId.textContent = truncateText(project.description, MAX_DESC_CHARS);
  // keep full description available on hover (tooltip)
  descId.title = project.description;

  linkBtn.onclick = () => {
    window.open(project.link, '_blank');
  };

  if (userInitiated) {
    // A user click on a left item locks selection
    isLocked = true;
    stopAutoplay();
  }
}

leftItems.forEach(item => {
  const index = parseInt(item.id, 10) - 1;

  // Click selects and locks selection
  item.addEventListener('click', (e) => {
    applySelection(index, true);
  });

  // Hover/pointer: only select if not locked
  item.addEventListener('mouseenter', () => {
    if (!isLocked) {
      stopAutoplay();
      applySelection(index, false);
    }
  });
  item.addEventListener('mouseleave', () => {
    if (!isLocked) startAutoplay();
  });

  item.addEventListener('pointerenter', () => {
    if (!isLocked) {
      stopAutoplay();
      applySelection(index, false);
    }
  });
  item.addEventListener('pointerleave', () => {
    if (!isLocked) startAutoplay();
  });

  // Touch support
  item.addEventListener('touchstart', () => {
    if (!isLocked) {
      stopAutoplay();
      applySelection(index, false);
    }
  }, { passive: true });
  item.addEventListener('touchend', () => {
    if (!isLocked) setTimeout(startAutoplay, 500);
  }, { passive: true });
});

if (leftItems.length > 0) {
  // initial selection
  selectProjectByIndex(0);
  // start autoplay
  startAutoplay();
}

// Pause autoplay while hovering or touching the project container (respect lock state)
const projCont = document.querySelector('.projCont');
if (projCont) {
  projCont.addEventListener('mouseenter', () => { if (!isLocked) stopAutoplay(); });
  projCont.addEventListener('mouseleave', () => { if (!isLocked) startAutoplay(); });
  projCont.addEventListener('touchstart', () => { if (!isLocked) stopAutoplay(); }, { passive: true });
  projCont.addEventListener('touchend', () => { if (!isLocked) startAutoplay(); }, { passive: true });
}

// Clicking anywhere outside the left items unlocks and resumes autoplay
document.addEventListener('click', (e) => {
  if (!isLocked) return;
  if (!e.target.closest('.leftItems')) {
    isLocked = false;
    startAutoplay();
  }
});
