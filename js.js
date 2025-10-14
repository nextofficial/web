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

// ===========================
// CONFIGURAÇÃO DA API
// ===========================
const API_KEY = 'AIzaSyB3Di73heLvjvrv1tDpW__qg0R2eZgzwU8';

const playlists = {
  gameplay: { id: 'PLBXuZM12Ec4wOYUSnSl-gVLar6TYC3BHu', container: 'gameplay' },
  corporativos: { id: 'PLBXuZM12Ec4z0XHrfDLDNAuJKTW73vc5m', container: 'corporativos' },
  geral: { id: 'PLBXuZM12Ec4zyKAFW2BFqBsSVNTTLJrPI', container: 'geral' }
};

// ===========================
// FUNÇÃO PARA BUSCAR VÍDEOS
// ===========================
async function fetchVideos(playlistKey) {
  const playlist = playlists[playlistKey];
  const container = document.getElementById(playlist.container);
  if (!playlist || !container) return;

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist.id}&key=${API_KEY}`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) return;

    container.innerHTML = ''; // limpa antes de renderizar a playlist inteira

    // ===== ALTERAÇÃO: Ordem invertida =====
    data.items.reverse().forEach(item => {
      const snippet = item.snippet;
      if (!snippet || !snippet.resourceId || !snippet.resourceId.videoId) return;

      const videoId = snippet.resourceId.videoId;
      const title = snippet.title;

      // Ignora vídeos privados ou deletados
      if (title === "Private video" || title === "Deleted video") return;

      const thumbnail = snippet.thumbnails?.high?.url || '';

      const card = document.createElement('div');
      card.classList.add('video-card-portfolio'); // CSS controla grid e estilo
      card.innerHTML = `
        ${thumbnail ? `<img src="${thumbnail}" alt="${title}">` : `<div style="height:100px; background:#222; display:flex; align-items:center; justify-content:center; color:#fff;">Sem thumbnail</div>`}
        <p>${title}</p>
      `;

      card.addEventListener('click', () => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      });

      container.appendChild(card);
      console.log(`Adicionado vídeo: ${title} no container: ${playlist.container}`);
    });

  } catch (err) {
    console.error('Erro ao buscar vídeos da playlist', playlistKey, err);
  }
}

// ===========================
// CHAMADAS DAS PLAYLISTS
// ===========================
fetchVideos('gameplay');
fetchVideos('corporativos');
fetchVideos('geral');

// ===========================
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
