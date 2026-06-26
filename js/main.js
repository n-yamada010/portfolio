(() => {
  const title = document.querySelector('.hero__copy h1');
  const subtitle = document.querySelector('.hero__copy p');

  if (!title || !subtitle || !window.gsap) return;

  const gsap = window.gsap;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const splitText = (element, lineClassName) => {
    const lines = element.innerHTML.split(/<br\s*\/?>/i);
    const chars = [];

    element.innerHTML = '';
    element.setAttribute('aria-label', lines.join(' '));

    lines.forEach((line, lineIndex) => {
      const lineElement = document.createElement('span');
      lineElement.className = lineClassName;
      lineElement.setAttribute('aria-hidden', 'true');

      [...line].forEach((char) => {
        const charElement = document.createElement('span');
        charElement.className = 'char';
        charElement.textContent = char === ' ' ? '\u00A0' : char;
        lineElement.appendChild(charElement);
        chars.push(charElement);
      });

      element.appendChild(lineElement);

      if (lineIndex < lines.length - 1) {
        element.appendChild(document.createElement('br'));
      }
    });

    return chars;
  };

  const titleChars = splitText(title, 'hero-title__line');
  const subtitleChars = splitText(subtitle, 'hero-subtitle__line');

  if (reduceMotion.matches) {
    gsap.set([...titleChars, ...subtitleChars], { clearProps: 'all' });
    return;
  }

  gsap.from(titleChars, {
    duration: 0.8,
    yPercent: 120,
    opacity: 0,
    stagger: 0.03,
    ease: 'power4.out'
  });

  gsap.from(subtitleChars, {
    duration: 0.6,
    yPercent: 120,
    opacity: 0,
    stagger: 0.025,
    ease: 'power3.out',
    delay: 0.45
  });
})();

(() => {
  const topCloud = document.querySelector('.hero__cloud--top');
  const bottomCloud = document.querySelector('.hero__cloud--bottom');

  if (!topCloud || !bottomCloud || !window.gsap) return;

  const gsap = window.gsap;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotion.matches) return;

  gsap.set([topCloud, bottomCloud], {
    willChange: 'transform, opacity'
  });

  const floatCloud = (cloud, y, duration) => {
    gsap.to(cloud, {
      y,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  };

  gsap.timeline({
    delay: 0.2,
    onComplete: () => {
      floatCloud(topCloud, -14, 3.6);
      floatCloud(bottomCloud, 18, 4.4);
    }
  })
    .fromTo(topCloud, {
      x: -180,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, 0)
    .fromTo(bottomCloud, {
      x: 180,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1.35,
      ease: 'power3.out'
    }, 0.12);
})();

(() => {
  const header = document.querySelector('#mainNav');
  const regions = [...document.querySelectorAll('main > section, .footer')];

  if (!header || !regions.length) return;

  const navLinks = [...header.querySelectorAll('.header__nav a[href^="#"]')];
  const profileTarget = document.querySelector('#profile');
  let ticking = false;

  const updateNavigation = () => {
    const marker = header.offsetHeight + 1;
    let currentRegion = regions[0];

    regions.forEach((region) => {
      if (region.getBoundingClientRect().top <= marker) {
        currentRegion = region;
      }
    });

    const isBlueSection = currentRegion.matches('.works, .banners, .skills');
    let activeId = currentRegion.matches('.banners') ? 'works' : currentRegion.id;

    if (
      currentRegion.matches('.about') &&
      profileTarget?.getBoundingClientRect().top <= marker
    ) {
      activeId = 'profile';
    }

    header.classList.toggle('header--on-blue', isBlueSection);
    header.dataset.section = currentRegion.id || 'footer';

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${activeId}`;

      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    ticking = false;
  };

  const requestNavigationUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateNavigation);
  };

  window.addEventListener('scroll', requestNavigationUpdate, { passive: true });
  window.addEventListener('resize', requestNavigationUpdate);
  updateNavigation();
})();

(() => {
  const about = document.querySelector('.about');
  const content = document.querySelector('.about__content');

  if (!about || !content || !window.gsap) return;

  const gsap = window.gsap;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const heading = content.querySelector('h2');
  const name = content.querySelector('.about__name');
  const textLines = [...content.querySelectorAll('p span')];
  const targets = [heading, name, ...textLines].filter(Boolean);

  if (reduceMotion.matches) {
    gsap.set(targets, { clearProps: 'all' });
    return;
  }

  const timeline = gsap.timeline({ paused: true });

  timeline.from(targets, {
    duration: 0.72,
    x: -56,
    opacity: 0,
    stagger: 0.14,
    ease: 'power3.out',
    onStart: () => {
      gsap.set(targets, { willChange: 'transform, opacity' });
    },
    onComplete: () => {
      gsap.set(targets, { clearProps: 'transform,opacity,willChange' });
    }
  });

  const playAboutAnimation = () => {
    if (!timeline.isActive() && timeline.progress() === 0) {
      timeline.play();
    }
  };

  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.create({
      trigger: about,
      start: 'top 70%',
      once: true,
      onEnter: playAboutAnimation
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      playAboutAnimation();
      observer.disconnect();
    }
  }, { threshold: 0.35 });

  observer.observe(about);
})();

(() => {
  const slider = document.querySelector('#skillSlider');
  const track = document.querySelector('#skillTrack');
  const progress = document.querySelector('#skillProgress');
  const progressBar = document.querySelector('#skillProgressBar');
  const progressKnob = document.querySelector('#skillProgressKnob');
  const prev = document.querySelector('#skillPrev');
  const next = document.querySelector('#skillNext');
  const pause = document.querySelector('#skillPause');

  if (!slider || !track || !progress || !progressBar || !progressKnob || !prev || !next || !pause) return;
  if (!window.gsap) return;

  const gsap = window.gsap;
  const cards = [...track.querySelectorAll('.skill-card')];
  const cardCount = cards.length;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!cardCount) return;

  let hasClones = false;

  if (cardCount > 1) {
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cardCount - 1].cloneNode(true);

    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    track.prepend(lastClone);
    track.append(firstClone);
    hasClones = true;
  }

  const slides = [...track.querySelectorAll('.skill-card')];
  let current = 0;
  let trackIndex = hasClones ? 1 : 0;
  let timer;
  let isPaused = false;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragDistance = 0;
  const slideDuration = 0.9;
  const cardDuration = 0.55;
  const progressDuration = 0.45;

  const getGap = () => {
    const style = window.getComputedStyle(track);
    return Number.parseFloat(style.columnGap || style.gap) || 0;
  };

  const getLogicalIndex = (slideIndex) => {
    if (!hasClones) return slideIndex;
    if (slideIndex === 0) return cardCount - 1;
    if (slideIndex === slides.length - 1) return 0;
    return slideIndex - 1;
  };

  const prepareImages = () => {
    const images = [...track.querySelectorAll('img')];

    return Promise.all(images.map((image) => {
      image.loading = 'eager';
      image.decoding = 'sync';

      if (image.complete) {
        return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
      }

      return new Promise((resolve) => {
        const decode = () => {
          if (image.decode) {
            image.decode().catch(() => {}).finally(resolve);
          } else {
            resolve();
          }
        };

        image.addEventListener('load', decode, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    }));
  };

  const updateActiveSlide = (animate = true) => {
    const duration = animate && !reduceMotion.matches ? cardDuration : 0;

    slides.forEach((slide, index) => {
      const logicalIndex = getLogicalIndex(index);
      const isActive = logicalIndex === current;

      slide.classList.toggle('is-active', isActive);
      gsap.to(slide, {
        scale: isActive ? 1 : 0.9,
        duration,
        ease: 'power3.out',
        force3D: true,
        overwrite: 'auto'
      });
    });
  };

  const updateProgress = (animate = true) => {
    const percentage = cardCount <= 1 ? 0 : (current / (cardCount - 1)) * 100;
    const duration = animate && !reduceMotion.matches ? progressDuration : 0;

    gsap.to(progressBar, {
      width: `${percentage}%`,
      duration,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    gsap.to(progressKnob, {
      left: `${percentage}%`,
      duration,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    progress.setAttribute('aria-valuenow', String(current + 1));

    cards.forEach((card, index) => {
      if (index === current) {
        card.setAttribute('aria-current', 'true');
      } else {
        card.removeAttribute('aria-current');
      }
    });

    updateActiveSlide(animate);
  };

  const getTrackX = (dragOffset = 0) => {
    const activeSlide = slides[trackIndex];
    if (!activeSlide) return 0;

    const slideWidth = activeSlide.offsetWidth;
    const centerOffset = (slider.clientWidth - slideWidth) / 2;
    return centerOffset - trackIndex * (slideWidth + getGap()) + dragOffset;
  };

  const moveTrack = ({ animate = true, dragOffset = 0, onComplete } = {}) => {
    const duration = animate && !reduceMotion.matches ? slideDuration : 0;
    const x = getTrackX(dragOffset);

    gsap.killTweensOf(track);

    if (!duration) {
      gsap.set(track, { x, force3D: true });
      onComplete?.();
      return;
    }

    isAnimating = true;
    gsap.to(track, {
      x,
      duration,
      ease: 'power3.inOut',
      force3D: true,
      overwrite: 'auto',
      onComplete
    });
  };

  const jumpToEquivalentClone = (cloneIndex) => {
    trackIndex = cloneIndex;
    updateActiveSlide(false);
    moveTrack({ animate: false });
  };

  const normalizeLoop = () => {
    if (!hasClones) return;

    if (trackIndex === 0) {
      trackIndex = cardCount;
      updateActiveSlide(false);
      moveTrack({ animate: false });
    } else if (trackIndex === cardCount + 1) {
      trackIndex = 1;
      updateActiveSlide(false);
      moveTrack({ animate: false });
    }
  };

  const completeMove = () => {
    normalizeLoop();
    isAnimating = false;
  };

  const goTo = (index, animate = true) => {
    current = (index + cardCount) % cardCount;
    trackIndex = hasClones ? current + 1 : current;
    updateProgress(animate);
    moveTrack({ animate, onComplete: completeMove });
  };

  const showNext = ({ useSourceClone = true } = {}) => {
    if (isAnimating || cardCount <= 1) return;
    if (hasClones && useSourceClone && current === cardCount - 1) {
      jumpToEquivalentClone(0);
    }

    current = (current + 1) % cardCount;
    trackIndex += 1;
    if (hasClones && useSourceClone && current === 0) {
      trackIndex = 1;
    }

    updateProgress(true);
    moveTrack({ animate: true, onComplete: completeMove });
  };

  const showPrev = ({ useSourceClone = true } = {}) => {
    if (isAnimating || cardCount <= 1) return;
    if (hasClones && useSourceClone && current === 0) {
      jumpToEquivalentClone(cardCount + 1);
    }

    current = (current - 1 + cardCount) % cardCount;
    trackIndex -= 1;
    if (hasClones && useSourceClone && current === cardCount - 1) {
      trackIndex = cardCount;
    }

    updateProgress(true);
    moveTrack({ animate: true, onComplete: completeMove });
  };

  const startTimer = () => {
    window.clearInterval(timer);
    if (!isPaused && cardCount > 1 && !document.hidden) {
      timer = window.setInterval(showNext, 9000);
    }
  };

  const resetTimer = () => {
    startTimer();
  };

  prev.addEventListener('click', () => {
    showPrev();
    resetTimer();
  });

  next.addEventListener('click', () => {
    showNext();
    resetTimer();
  });

  pause.addEventListener('click', () => {
    isPaused = !isPaused;
    pause.classList.toggle('is-paused', isPaused);
    pause.setAttribute('aria-label', isPaused ? '自動再生を再開' : '自動再生を一時停止');
    startTimer();
  });

  progress.addEventListener('click', (event) => {
    const rect = progress.getBoundingClientRect();
    const percentage = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const index = Math.round(percentage * (cardCount - 1));
    goTo(index);
    resetTimer();
  });

  progress.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrev();
      resetTimer();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
      resetTimer();
    }
  });

  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrev();
      resetTimer();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
      resetTimer();
    }
  });

  slider.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (isAnimating) return;
    isDragging = true;
    dragStartX = event.clientX;
    dragDistance = 0;
    gsap.killTweensOf(track);
    slider.setPointerCapture?.(event.pointerId);
  });

  slider.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    dragDistance = event.clientX - dragStartX;
    moveTrack({ animate: false, dragOffset: dragDistance });
  });

  const finishDrag = (event) => {
    if (!isDragging) return;
    isDragging = false;
    slider.releasePointerCapture?.(event.pointerId);

    const threshold = Math.min(70, slider.clientWidth * 0.12);
    if (dragDistance <= -threshold) {
      showNext({ useSourceClone: false });
    } else if (dragDistance >= threshold) {
      showPrev({ useSourceClone: false });
    } else {
      moveTrack({
        animate: true,
        onComplete: () => {
          isAnimating = false;
        }
      });
    }

    dragDistance = 0;
    resetTimer();
  };

  slider.addEventListener('pointerup', finishDrag);
  slider.addEventListener('pointercancel', finishDrag);
  slider.addEventListener('dragstart', (event) => event.preventDefault());

  document.addEventListener('visibilitychange', startTimer);

  const resizeObserver = new ResizeObserver(() => moveTrack({ animate: false }));
  resizeObserver.observe(slider);

  requestAnimationFrame(() => {
    goTo(0, false);
    prepareImages().finally(startTimer);
  });
})();
