(function() {
  const init = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const submitBtn = section.querySelector('.forgot-submit-btn');
      const resendBtn = section.querySelector('.resend-email-btn');
      const emailInput = section.querySelector('.forgot-email-input');
      const formView = section.querySelector('.forgot-password-form');
      const sentView = section.querySelector('.reset-email-sent');
      const emailDisplay = section.querySelector('.reset-email-display');

      if (!submitBtn || !formView || !sentView) return;

      submitBtn.addEventListener('click', () => {
        const email = emailInput ? emailInput.value.trim() : '';
        if (email === '') {
          emailInput.classList.add('ring-1', 'ring-red-400');
          return;
        }
        emailInput.classList.remove('ring-1', 'ring-red-400');
        if (emailDisplay) emailDisplay.textContent = email;
        formView.classList.add('hidden');
        sentView.classList.remove('hidden');
      });

      if (resendBtn) {
        resendBtn.addEventListener('click', () => {
          resendBtn.textContent = 'Email resent!';
          setTimeout(() => {
            resendBtn.textContent = 'Click to resend';
          }, 2000);
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