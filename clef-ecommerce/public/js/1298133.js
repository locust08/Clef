(function() {
  const init = () => {
    const sections = document.querySelectorAll('.favorites-grid');
    sections.forEach((grid) => {
      const container = grid.closest('section') || document;
      const emptyState = container.querySelector('.favorites-empty');
      const countLabel = container.querySelector('h1 + p') ||
            (container.querySelector('.text-rhino-300'));

      const updateCount = () => {
        const remaining = grid.querySelectorAll('.favorite-item').length;
        const label = container.querySelector('h1') ?
              container.querySelector('h1').parentElement.querySelector('.text-rhino-300') : null;
        if (label) {
          label.textContent = remaining + (remaining === 1 ? ' item saved' : ' items saved');
        }
        if (remaining === 0 && emptyState) {
          emptyState.classList.remove('hidden');
          grid.classList.add('hidden');
        }
      };

      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.favorite-remove');
        if (!btn) return;
        e.preventDefault();
        const item = btn.closest('.favorite-item');
        const wrapper = item ? item.parentElement : null;
        if (wrapper) {
          wrapper.style.transition = 'opacity 0.2s';
          wrapper.style.opacity = '0';
          setTimeout(() => {
            wrapper.remove();
            updateCount();
          }, 200);
        }
      });

      const clearBtn = container.querySelector('button');
      if (clearBtn && clearBtn.textContent.trim() === 'Clear all') {
        clearBtn.addEventListener('click', () => {
          const wrappers = grid.querySelectorAll('.favorite-item');
          wrappers.forEach((item) => {
            const wrapper = item.parentElement;
            if (wrapper) wrapper.remove();
          });
          updateCount();
        });
      }
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();