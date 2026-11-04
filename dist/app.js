'use strict';
const CATALOG_BASE = new URL('.', document.currentScript.src);
const WHATSAPP_NUMBER = '5547997707312';
const INSTAGRAM = 'https://www.instagram.com/edemaisconcept/';
const products = [
  { id:'anjo', name:'Anjo de Luz', category:'Decoração em 3D', filters:['decoracao','natal'], image:'assets/63cb8999b4acc1ab.jpg', position:'50% 67%', badge:'Um detalhe de afeto', description:'Um anjo com asas delicadas e detalhes vazados para dar um toque de carinho à decoração ou a um presente especial.', post:'reel/DfC2xVKRNt6/', photos:[{src:'assets/63cb8999b4acc1ab.jpg',label:'Detalhes do anjo'},{src:'assets/70eec8aab26af878.webp',label:'Composição da coleção de anjos'}] },
  { id:'nome', name:'Seu nome, seu encanto', category:'Personalizados em 3D', filters:['personalizados','decoracao'], image:'assets/63e750750036950e.jpg', position:'50% 60%', badge:'Com a sua personalidade', description:'Uma inicial que ganha significado com um nome. A peça do perfil combina a letra G com o nome Gabriel. Consulte as possibilidades para o nome que você quer criar.', post:'reel/DfA_pd-sHwA/', photos:[{src:'assets/63e750750036950e.jpg',label:'Detalhe do nome Gabriel'},{src:'assets/cd3de88a10252ed2.webp',label:'Outros ângulos do nome personalizado'}] },
  { id:'elefantes', name:'Elefantes da Sorte', category:'Decoração em 3D', filters:['decoracao'], image:'assets/a80b1a488cb34b69.webp', fit:'contain', position:'50% 50%', description:'Formas alongadas e texturas que chamam a atenção. Os elefantes decorativos trazem personalidade para compor um cantinho da casa ou presentear.', post:'p/DfHzixQRYTJ/' },
  { id:'bolsa', name:'Bolsa Bicolor', category:'Crochê artesanal', filters:['bolsas'], image:'assets/bolsa-detalhe.png', position:'50% 54%', badge:'Feita à mão', description:'O encontro do marrom com o branco, a textura do crochê e o brilho do fecho dourado. Uma bolsa artesanal cheia de detalhes para acompanhar o seu estilo.', post:null, photos:[{src:'assets/bolsa-detalhe.png',label:'Pontos, textura e fecho dourado'},{src:'assets/bolsa-editorial.png',label:'A bolsa no dia a dia'}] },
  { id:'arvores', name:'Natal em cada detalhe', category:'Coleção de Natal · 3D', filters:['natal','decoracao'], image:'assets/052e7dcf2fbd197c.webp', fit:'contain', position:'50% 50%', description:'Enfeites de árvore de Natal com formas e camadas que trazem a criatividade da impressão 3D para a decoração de fim de ano.', post:'p/DfFZ-0pxA8m/' },
  { id:'laco', name:'Cachepô Laço', category:'Decoração em 3D', filters:['decoracao','natal'], image:'assets/2694b61a1df4ca47.jpg', position:'50% 55%', description:'Um laço marcante, textura delicada e vermelho cheio de presença. Uma peça decorativa que transforma a composição e a apresentação de um presente.', post:'reel/DfAKK0bRbWi/' },
  { id:'chaveiro', name:'Fé para levar com você', category:'Presentes em 3D', filters:['decoracao'], image:'assets/1590b5466572a04e.jpg', position:'50% 58%', description:'Um pequeno gesto com muito significado. A miniatura de Jesus com coração aparece no perfil como uma ideia de presente em formato de chaveiro.', post:'reel/DfNy6wLugzP/' },
  { id:'cortadores', name:'Criatividade à mesa', category:'Especial de Natal · 3D', filters:['natal'], image:'assets/5b64e038e7cde7f2.webp', fit:'contain', position:'50% 50%', description:'Um conjunto de cortadores com formas natalinas para inspirar novas criações. Consulte os detalhes da peça e as orientações de uso diretamente com a Ed&+ Concept.', post:'p/DfH1qlaR2iM/' }
];

// Both visual proposals use the same catalog and original product photos.
products.forEach(product => {
  product.image = new URL(product.image, CATALOG_BASE).href;
  product.photos?.forEach(photo => { photo.src = new URL(photo.src, CATALOG_BASE).href; });
});

function whatsappUrl(message) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
// Integration point for future analytics; no advertising trackers or personal data are sent.
function recordInteraction(name, detail) { window.dispatchEvent(new CustomEvent('edemais:interaction', { detail:{ name, ...detail } })); }
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappUrl(link.dataset.whatsapp);
  link.addEventListener('click', () => recordInteraction('whatsapp_click',{placement:link.dataset.placement}));
});

const grid = document.querySelector('#product-grid');
products.forEach(product => {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.categories = product.filters.join(' ');
  // Catalog fields are fixed local editorial content, never user input.
  card.innerHTML = `<button class="product-image-button" data-product="${product.id}" aria-label="Ver detalhes: ${product.name}"><img class="product-image" src="${product.image}" alt="${product.name} — peça real da Ed&+ Concept" loading="lazy" width="360" height="440" style="object-position:${product.position};object-fit:${product.fit || 'cover'}">${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}<span class="product-plus" aria-hidden="true">+</span></button><p class="product-category">${product.category}</p><h3 class="product-title"><button data-product="${product.id}">${product.name}</button></h3><div class="product-bottom"><span>Valor sob consulta</span><button class="product-link" data-product="${product.id}" aria-label="Ver detalhes de ${product.name}">Ver detalhes <span aria-hidden="true">↗</span></button></div>`;
  grid.append(card);
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active',active);
      item.setAttribute('aria-pressed',String(active));
    });
    let visibleCount = 0;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = selected !== 'todos' && !card.dataset.categories.split(' ').includes(selected);
      if (!card.hidden) visibleCount++;
    });
    document.querySelector('.product-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'peça para descobrir' : 'peças para descobrir'}`;
    recordInteraction('collection_filter',{category:selected});
  });
});

const productDialog = document.querySelector('#product-dialog');
const productNote = document.querySelector('#product-note');
const productWhatsapp = document.querySelector('#dialog-whatsapp');
const photoDialog = document.querySelector('#photo-dialog');
const photoThumbs = document.querySelector('#photo-thumbs');
let currentProduct;
let currentPhotoIndex = 0;
function productPhotos() {
  return currentProduct.photos || [{src:currentProduct.image,label:currentProduct.name}];
}
function selectPhoto(index) {
  const photos = productPhotos();
  currentPhotoIndex = Math.max(0,Math.min(index,photos.length - 1));
  const photo = photos[currentPhotoIndex];
  const image = document.querySelector('#dialog-image');
  image.src = photo.src;
  image.alt = `${currentProduct.name}: ${photo.label}`;
  const enlarged = document.querySelector('#photo-image');
  enlarged.src = photo.src;
  enlarged.alt = image.alt;
  document.querySelector('#photo-title').textContent = currentProduct.name;
  document.querySelector('#photo-caption').textContent = photo.label;
  document.querySelector('#photo-counter').textContent = `Foto ${currentPhotoIndex + 1} de ${photos.length}`;
  document.querySelector('#photo-previous').disabled = currentPhotoIndex === 0;
  document.querySelector('#photo-next').disabled = currentPhotoIndex === photos.length - 1;
  photoThumbs.querySelectorAll('button').forEach((button,i) => button.setAttribute('aria-pressed',String(i === currentPhotoIndex)));
}
function renderPhotos() {
  photoThumbs.replaceChildren();
  productPhotos().forEach((photo,index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label',`Foto ${index + 1}: ${photo.label}`);
    button.setAttribute('aria-pressed',String(index === 0));
    const thumb = document.createElement('img');
    thumb.src = photo.src;
    thumb.alt = '';
    thumb.width = 52;
    thumb.height = 60;
    button.append(thumb);
    button.addEventListener('click',() => selectPhoto(index));
    photoThumbs.append(button);
  });
  photoThumbs.hidden = productPhotos().length < 2;
  selectPhoto(0);
}
function refreshProductMessage() {
  if (!currentProduct) return;
  let message = `Olá! Conheci a Ed&+ Concept pelo site e me encantei pela peça “${currentProduct.name}”. Gostaria de saber as cores, medidas, valor, disponibilidade e prazo.`;
  if (productNote.value.trim()) message += `\n\nMinha ideia: ${productNote.value.trim()}`;
  productWhatsapp.href = whatsappUrl(message);
}
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  currentProduct = products.find(product => product.id === button.dataset.product);
  renderPhotos();
  document.querySelector('#dialog-category').textContent = currentProduct.category;
  document.querySelector('#dialog-title').textContent = currentProduct.name;
  document.querySelector('#dialog-description').textContent = currentProduct.description;
  const source = document.querySelector('#dialog-source');
  source.href = currentProduct.post ? `${INSTAGRAM}${currentProduct.post}` : INSTAGRAM;
  source.textContent = currentProduct.post ? 'Ver a publicação original ↗' : 'Conhecer mais no Instagram ↗';
  productNote.value = '';
  refreshProductMessage();
  productDialog.showModal();
  productDialog.querySelector('.dialog-layout').scrollTop = 0;
  document.body.classList.add('dialog-open');
  recordInteraction('view_product',{product:currentProduct.id});
}));
productNote.addEventListener('input',refreshProductMessage);
productWhatsapp.addEventListener('click',() => recordInteraction('whatsapp_click',{placement:'produto',product:currentProduct?.id}));
document.querySelector('#photo-open').addEventListener('click',() => {
  photoDialog.showModal();
  document.body.classList.add('dialog-open');
  recordInteraction('view_photo',{product:currentProduct.id,photo:currentPhotoIndex + 1});
});
document.querySelector('#photo-previous').addEventListener('click',() => selectPhoto(currentPhotoIndex - 1));
document.querySelector('#photo-next').addEventListener('click',() => selectPhoto(currentPhotoIndex + 1));
photoDialog.addEventListener('keydown',event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    selectPhoto(currentPhotoIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
document.querySelector('#privacy-open').addEventListener('click',() => {
  document.querySelector('#privacy-dialog').showModal();
  document.body.classList.add('dialog-open');
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.toggle('dialog-open',Boolean(document.querySelector('dialog[open]'))));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

document.querySelector('#idea-form').addEventListener('submit', event => {
  event.preventDefault();
  const interest = document.querySelector('#interest').value;
  const idea = document.querySelector('#idea').value.trim();
  const message = `Olá! Vim pelo site da Ed&+ Concept e quero conversar sobre: ${interest}.${idea ? `\n\nMinha ideia: ${idea}` : ''}\n\nPodemos falar sobre as possibilidades, valor e prazo?`;
  recordInteraction('whatsapp_click',{placement:'formulario',category:interest});
  window.location.assign(whatsappUrl(message));
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Abrir menu'); mobileNav.hidden = true; }
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded',String(!expanded));
  menuToggle.setAttribute('aria-label',expanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown',event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuToggle.focus(); } });
document.addEventListener('click',event => { if (!mobileNav.hidden && !event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 861px)').addEventListener('change',event => { if (event.matches) closeMenu(); });

// Keep the contact shortcut away from the opening photos and the order form.
if ('IntersectionObserver' in window) {
  const floatingContact = document.querySelector('.floating-whatsapp');
  let heroVisible = true;
  let orderVisible = false;
  floatingContact.classList.add('is-hidden');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target.id === 'inicio') heroVisible = entry.isIntersecting;
      if (entry.target.id === 'encomenda') orderVisible = entry.isIntersecting;
    });
    floatingContact.classList.toggle('is-hidden',heroVisible || orderVisible);
  });
  observer.observe(document.querySelector('#inicio'));
  observer.observe(document.querySelector('#encomenda'));
}
document.querySelector('#year').textContent = new Date().getFullYear();
