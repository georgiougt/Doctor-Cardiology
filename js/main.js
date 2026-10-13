// Vanguard Cardiology - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Modal logic
  const modal = document.getElementById('screenModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const screenForm = document.getElementById('screenForm');
  const diagSelect = document.getElementById('diagSelect');

  const openModal = (screenName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (diagSelect && screenName) {
      for (let i = 0; i < diagSelect.options.length; i++) {
        if (diagSelect.options[i].text.includes(screenName) || diagSelect.options[i].value.includes(screenName)) {
          diagSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const screen = btn.getAttribute('data-screen') || '';
      openModal(screen);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (screenForm) {
    screenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = screenForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Scheduling Screening...
      `;

      setTimeout(() => {
        screenForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(225, 29, 72, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #E11D48;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-size: 1.8rem; color: #FFF; margin-bottom: 0.5rem; font-weight: 800;">Screening Scheduled</h3>
            <p style="color: #94A3B8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Your cardiovascular evaluation is registered. Our clinical nurse coordinator will contact you with pre-scan fasting instructions and appointment timing.
            </p>
            <button type="button" class="btn btn-crimson" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Clinical Overview
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
