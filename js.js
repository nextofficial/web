// Seleção de elementos
const sections = document.querySelectorAll('main section');
const audio = document.getElementById('intro-sound');
const portfolioLink = document.getElementById('portfolio-link');
const upArrow = document.querySelector('.up-arrow');
const navLinks = document.querySelectorAll('nav a');

// Navegação entre seções
function navigate() {
  const hash = location.hash || '#/';
  sections.forEach(sec => sec.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));

  if (hash === '#/portfolio') {
    document.querySelector('#portfolio').classList.add('active');
    portfolioLink.classList.add('active');
    upArrow.style.display = 'none';
  } else if (hash === '#/about') {
    document.querySelector('#about').classList.add('active');
    navLinks[2].classList.add('active');
    upArrow.style.display = 'block';
  } else if (hash === '#/contact') {
    document.querySelector('#contact').classList.add('active');
    navLinks[3].classList.add('active');
    upArrow.style.display = 'block';
  } else {
    document.querySelector('#home').classList.add('active');
    navLinks[0].classList.add('active');
    upArrow.style.display = 'block';
  }
}

window.addEventListener('hashchange', navigate);
navigate();

// Efeito de clique no logo da home
portfolioLink.addEventListener('click', () => {
  audio.volume = 0.3;
  audio.currentTime = 0;
  audio.play().catch(() => {
    document.addEventListener('click', () => audio.play(), { once: true });
  });

  const logo = document.querySelector('header img');
  const originalSrc = logo.src;
  logo.src = "brand logo2.png";
  logo.classList.add("logo-glow");
  setTimeout(() => {
    logo.src = originalSrc;
    logo.classList.remove("logo-glow");
  }, 200);
});

// Efeito máquina de escrever
const text = "Seja bem-vindo(a) querido(a), eu sou o Next!";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
typeWriter();

// Cursor customizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Ler mais sobre
const lerMaisBtn = document.querySelector('#about h3.mecolor');
const lerMaisContent = document.getElementById('lermais');
const aboutArrow = document.createElement('div');
aboutArrow.classList.add('about-arrow');
lerMaisBtn.style.position = 'relative';
lerMaisBtn.appendChild(aboutArrow);

lerMaisBtn.addEventListener('click', () => {
  lerMaisContent.classList.toggle('active');
  lerMaisBtn.classList.toggle('fade-out');

  if (lerMaisContent.classList.contains('active')) {
    aboutArrow.style.display = 'none';
    setTimeout(() => {
      lerMaisBtn.style.display = 'none';
    }, 300);
  } else {
    lerMaisBtn.style.display = 'block';
    aboutArrow.style.display = 'block';
  }
});
lerMaisContent.classList.remove('active');

// Popup do currículo
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.popup-close');
const curriculoBtn = document.getElementById('curriculoBtn');

curriculoBtn.addEventListener('click', () => {
  popup.classList.remove('hidden');
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
});

popup.addEventListener('click', e => {
  if (e.target === popup) popup.classList.add('hidden');
});


