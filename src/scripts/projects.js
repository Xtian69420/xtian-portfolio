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
    description: 'This Server API is a robust backend system powering the Betcha Booking app. Built with Node.js and MongoDB, it handles user authentication, booking management, image uploads, and Google Drive integration for a seamless and secure experience.',
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

leftItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove highlight from all
    leftItems.forEach(i => i.classList.remove('highlight'));
    
    // Highlight clicked
    item.classList.add('highlight');

    const index = parseInt(item.id, 10) - 1;
    if (index < 0 || index >= projects.length) return;

    const project = projects[index];
    const img = item.querySelector('img');
    const p = item.querySelector('p');

    if (!img || !p) return;

    imgId.src = img.src;
    titleId.textContent = project.title;  
    descId.textContent = project.description;

    linkBtn.onclick = () => {
      window.open(project.link, '_blank');
    };
  });
});

// Automatically trigger click on the first leftItems element on page load and enable autoplay
let currentIndex = 0;
const AUTOPLAY_INTERVAL = 1500; // ms
let autoplayId = null;

function selectProjectByIndex(index) {
  if (index < 0 || index >= leftItems.length) return;
  leftItems[index].click();
  currentIndex = index;
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

// Keep click handler in sync with currentIndex
leftItems.forEach(item => {
  const index = parseInt(item.id, 10) - 1;

  function selectThisItem() {
    // Remove highlight from all
    leftItems.forEach(i => i.classList.remove('highlight'));
    // Highlight this one
    item.classList.add('highlight');

    if (index < 0 || index >= projects.length) return;
    currentIndex = index; // update current index so autoplay resumes from here

    const project = projects[index];
    const img = item.querySelector('img');
    const p = item.querySelector('p');

    if (!img || !p) return;

    imgId.src = img.src;
    titleId.textContent = project.title;  
    descId.textContent = project.description;

    linkBtn.onclick = () => {
      window.open(project.link, '_blank');
    };
  }

  // Click selects item
  item.addEventListener('click', selectThisItem);

  // Hover/pointer: select and pause autoplay while hovering this item
  item.addEventListener('mouseenter', () => {
    stopAutoplay();
    selectThisItem();
  });
  item.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  // Pointer events (better cross-device support)
  item.addEventListener('pointerenter', () => {
    stopAutoplay();
    selectThisItem();
  });
  item.addEventListener('pointerleave', () => {
    startAutoplay();
  });

  // Touch support: stop when touching the item, resume after touch ends
  item.addEventListener('touchstart', () => {
    stopAutoplay();
    selectThisItem();
  }, { passive: true });
  item.addEventListener('touchend', () => {
    // Slight delay before resuming to avoid accidental resume during quick taps
    setTimeout(startAutoplay, 500);
  }, { passive: true });
});

if (leftItems.length > 0) {
  // initial selection
  selectProjectByIndex(0);
  // start autoplay
  startAutoplay();
}

// Pause autoplay while hovering or touching the project container
const projCont = document.querySelector('.projCont');
if (projCont) {
  projCont.addEventListener('mouseenter', stopAutoplay);
  projCont.addEventListener('mouseleave', startAutoplay);
  projCont.addEventListener('touchstart', stopAutoplay, { passive: true });
  projCont.addEventListener('touchend', startAutoplay, { passive: true });
}
