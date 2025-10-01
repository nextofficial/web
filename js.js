const sections = document.querySelectorAll('main section');
const audio = document.getElementById('intro-sound');
const portfolioLink = document.getElementById('portfolio-link');
const upArrow = document.querySelector('.up-arrow');
const navLinks = document.querySelectorAll('nav a');

// SPA navigation
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
    navLinks[2].classList.add('active'); // Sobre
    upArrow.style.display = 'block';
  } else if (hash === '#/contact') {
    document.querySelector('#contact').classList.add('active');
    navLinks[3].classList.add('active'); // Contato
    upArrow.style.display = 'block';
  } else {
    document.querySelector('#home').classList.add('active');
    navLinks[0].classList.add('active'); // Início
    upArrow.style.display = 'block';
  }
}
window.addEventListener('hashchange', navigate);
navigate();

// Audio e logo
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

// Typewriter effect
const text = "Seja bem-vindo(a) querido(a), eu sou o VHY!";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Ler mais toggle
const lerMaisBtn = document.querySelector('#about h3.mecolor');
const lerMaisContent = document.getElementById('lermais');
lerMaisBtn.addEventListener('click', () => {
  lerMaisContent.classList.toggle('active');
  lerMaisBtn.classList.toggle('fade-out');
  setTimeout(() => {
    lerMaisBtn.style.display = lerMaisContent.classList.contains('active') ? 'none' : 'block';
  }, 300);
});
lerMaisContent.classList.remove('active');

// ------------------- PORTFOLIO VIDEOS -------------------
const API_KEY = 'AIzaSyB3Di73heLvjvrv1tDpW__qg0R2eZgzwU8';

const PLAYLIST_LONGOS   = '';
const PLAYLIST_SHORTS   = '';
const PLAYLIST_GAMEPLAY = 'PLBXuZM12Ec4wOYUSnSl-gVLar6TYC3BHu';
const PLAYLIST_GAMEPLAY2= 'PLBXuZM12Ec4z0XHrfDLDNAuJKTW73vc5m';
const PLAYLIST_GERAL    = 'PLBXuZM12Ec4zyKAFW2BFqBsSVNTTLJrPI';

async function fetchPlaylist(playlistId, containerId) {
  const container = document.getElementById(containerId);
  if (!playlistId) return; // se playlist vazia, não tenta
  const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${playlistId}&key=${API_KEY}`);
  const data = await res.json();
  if (!data.items) return;

  data.items.forEach(item => {
    const videoId = item.snippet.resourceId.videoId;
    const thumbnail = item.snippet.thumbnails.high.url;

    const card = document.createElement('div');
    card.classList.add('video-card-portfolio');
    card.innerHTML = `<img src="${thumbnail}" alt="Vídeo">`; // sem título
    card.addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    });
    container.appendChild(card);
  });
}

// Carregar todas as playlists
fetchPlaylist(PLAYLIST_LONGOS, 'long-videos');
fetchPlaylist(PLAYLIST_SHORTS, 'short-videos');
fetchPlaylist(PLAYLIST_GAMEPLAY, 'gameplay');
fetchPlaylist(PLAYLIST_GAMEPLAY2, 'gameplay2');
fetchPlaylist(PLAYLIST_GERAL, 'geral');
