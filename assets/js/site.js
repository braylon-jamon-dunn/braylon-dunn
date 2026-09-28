const navigationLinks = [...document.querySelectorAll('.navigation a')];
const sections = navigationLinks.map(link => document.querySelector(link.hash));
let scrollScheduled = false;
function updateNavigation() {
  const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 200);
  let active = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= marker) active = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
    active = sections[sections.length - 1];
  }
  for (const link of navigationLinks) {
    const selected = link.hash === `#${active.id}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollScheduled = false;
}
function scheduleNavigationUpdate() {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', updateNavigation);
updateNavigation();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(pointer: fine)');
const spotlight = document.querySelector('.spotlight');
let pointerScheduled = false;
let pointerX = 0;
let pointerY = 0;
window.addEventListener('pointermove', event => {
  if (motion.matches || !pointer.matches) return;
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (pointerScheduled) return;
  pointerScheduled = true;
  requestAnimationFrame(() => {
    spotlight.style.setProperty('--pointer-x', `${pointerX}px`);
    spotlight.style.setProperty('--pointer-y', `${pointerY}px`);
    pointerScheduled = false;
  });
}, { passive: true });

document.querySelector("#year").textContent = new Date().getFullYear();
