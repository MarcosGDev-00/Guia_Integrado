document.addEventListener('DOMContentLoaded', function () {
  const content = document.getElementById('content');

  function loadContent(href) {
    fetch(href)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;
        attachLinkEvents();
        initializeSteps();
        initScrollSuave();
      })
      .catch(error => console.error('Error loading content:', error));
  }

  function attachLinkEvents() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('data-href');
        loadContent(href);
      });
    });
  }

  attachLinkEvents();
});

function toggleAccordion(element) {
  const item = element.parentNode;
  const body = item.querySelector('.accordion-item-body');
  const isOpen = item.classList.toggle('open');

  body.style.height = isOpen ? `${body.scrollHeight}px` : '0';
}

function toggleAccordionPerguntas(element) {
  const itemPerguntas = element.parentNode;
  const bodyPerguntas = itemPerguntas.querySelector('.accordion-item-bodyPerguntas');
  const isOpenPerguntas = itemPerguntas.classList.toggle('open');

  bodyPerguntas.style.height = isOpenPerguntas ? `${bodyPerguntas.scrollHeight}px` : '0';
}

let counter = 1;
setInterval(() => {
  document.getElementById(`radio${counter}`).checked = true;
  counter = counter > 9 ? 1 : counter + 1;
}, 5000);

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = 'active';

    this.handleClick = this.handleClick.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation = link.style.animation 
        ? '' 
        : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;

      const zIndexValue = this.mobileMenu.classList.contains(this.activeClass) ? 1 : 2;
      link.style.zIndex = zIndexValue;
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  closeNavigation() {
    this.navList.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener('click', this.handleClick);

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeNavigation();
      });
    });

    document.body.addEventListener('click', (event) => {
      const isNavListClicked = this.navList.contains(event.target) || 
        Array.from(this.navLinks).some(link => link.contains(event.target));
      const isMobileMenuClicked = this.mobileMenu.contains(event.target);

      if (!isNavListClicked && !isMobileMenuClicked) {
        this.closeNavigation();
      }
    });
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-list', '.nav-list li');
mobileNavbar.init();

function initializeSteps() {
  const steps = document.querySelectorAll('.step');
  const stepActions = [
    { className: 'step01', progressWidth: '3%', activeClass: 'discovery' },
    { className: 'step02', progressWidth: '25%', activeClass: 'strategy' },
    { className: 'step03', progressWidth: '50%', activeClass: 'creative' },
    { className: 'step04', progressWidth: '75%', activeClass: 'production' },
    { className: 'step05', progressWidth: '100%', activeClass: 'analysis' }
  ];

  steps.forEach(step => {
    step.addEventListener('click', function () {
      this.classList.add('active');
      getPrevSiblings(this).forEach(el => el.classList.add('active'));
      getNextSiblings(this).forEach(el => el.classList.remove('active'));
    });
  });

  stepActions.forEach(action => {
    const step = document.querySelector(`.${action.className}`);
    if (step) {
      step.addEventListener('click', () => {
        document.getElementById('line-progress').style.width = action.progressWidth;
        const activeElement = document.querySelector(`.${action.activeClass}`);
        if (activeElement) {
          activeElement.classList.add('active');
          getSiblings(activeElement).forEach(sibling => sibling.classList.remove('active'));
        }
      });
    }
  });
}

function getPrevSiblings(elem) {
  const siblings = [];
  while (elem = elem.previousElementSibling) {
    siblings.push(elem);
  }
  return siblings;
}

function getNextSiblings(elem) {
  const siblings = [];
  while (elem = elem.nextElementSibling) {
    siblings.push(elem);
  }
  return siblings;
}

function getSiblings(elem) {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
}

function initScrollSuave() {
  const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  linksInternos.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
}

initScrollSuave();

function voltarAoTopo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}