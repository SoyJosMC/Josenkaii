// Utilidades comunes
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Año en footer
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navegación móvil
const nav = $('[data-nav]');
const navToggle = $('.nav-toggle');
if (nav && navToggle) {
  const toggleNav = () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  };
  navToggle.addEventListener('click', toggleNav);
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && e.target !== navToggle) {
      nav.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Modal
const modal = $('#modal');
const closeBtns = $$('[data-close-modal]');
function openModal(title = 'Mensaje', body = 'Acción realizada correctamente') {
  if (!modal) return;
  $('#modal-title').textContent = title;
  $('#modal-body').textContent = body;
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}
closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

// Filtros de portafolio
const chips = $$('.chip');
const galleryItems = $$('.gallery .item');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    galleryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

// Validación del formulario de contacto
const form = $('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const setError = (input, msg) => {
      const small = input.parentElement.querySelector('.error');
      if (small) small.textContent = msg || '';
      input.classList.toggle('invalid', !!msg);
    };

    const nombre = form.nombre;
    if (!nombre.value || nombre.value.trim().length < 2) {
      setError(nombre, 'Ingresa un nombre válido.');
      valid = false;
    } else setError(nombre);

    const email = form.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setError(email, 'Ingresa un email válido.');
      valid = false;
    } else setError(email);

    const tipo = form.tipo;
    if (!tipo.value) {
      setError(tipo, 'Selecciona un tipo de proyecto.');
      valid = false;
    } else setError(tipo);

    const descripcion = form.descripcion;
    if (!descripcion.value || descripcion.value.trim().length < 20) {
      setError(descripcion, 'Describe tu proyecto (mínimo 20 caracteres).');
      valid = false;
    } else setError(descripcion);

    // Presupuesto opcional: si está, validar mínimo
    const presupuesto = form.presupuesto;
    if (presupuesto.value && Number(presupuesto.value) < 10) {
      setError(presupuesto, 'El presupuesto mínimo es 10 USD.');
      valid = false;
    } else setError(presupuesto);

    if (!valid) return;

    // Simulación de envío (sin backend)
    openModal('Formulario enviado', 'Gracias por tu mensaje. Te responderé en breve.');
    form.reset();
  });
}
