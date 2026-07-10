(function () {
  const init = () => {
    document.querySelectorAll(".mobile-menu-trigger").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const nav = trigger.closest("nav");
        const menu = nav ? nav.querySelector(".mobile-menu") : null;
        if (menu) {
          menu.classList.toggle("hidden");
        }
      });
    });

    document.querySelectorAll(".dropdown-wrapper").forEach((wrapper) => {
      const trigger = wrapper.querySelector(".dropdown-trigger");
      const menu = wrapper.querySelector(".dropdown-menu");
      const chevron = wrapper.querySelector(".dropdown-chevron");
      if (!trigger || !menu) return;

      trigger.addEventListener("click", () => {
        const isOpen = !menu.classList.contains("invisible");
        menu.classList.toggle("opacity-0", isOpen);
        menu.classList.toggle("invisible", isOpen);
        menu.classList.toggle("translate-y-2", isOpen);
        if (chevron) chevron.classList.toggle("rotate-180", !isOpen);
      });

      document.addEventListener("click", (event) => {
        if (!wrapper.contains(event.target)) {
          menu.classList.add(
            "opacity-0",
            "invisible",
            "translate-y-2",
          );
          if (chevron) chevron.classList.remove("rotate-180");
        }
      });
    });

    const revealItems = document.querySelectorAll(".reveal-item");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove(
                "opacity-0",
                "translate-y-6",
              );
              entry.target.classList.add(
                "opacity-100",
                "translate-y-0",
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14 },
      );

      revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
        observer.observe(item);
      });
    } else {
      revealItems.forEach((item) => {
        item.classList.remove("opacity-0", "translate-y-6");
      });
    }

    document.querySelectorAll(".grade-option").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.closest("section");
        const grade = button.getAttribute("data-grade");
        if (!section || !grade) return;

        section.querySelectorAll(".grade-option").forEach((option) => {
          option.classList.remove(
            "active-grade",
            "bg-white",
            "text-blue-900",
            "border-white",
          );
          option.classList.add(
            "bg-white/10",
            "text-white",
            "border-white/20",
          );
        });

        button.classList.add(
          "active-grade",
          "bg-white",
          "text-blue-900",
          "border-white",
        );
        button.classList.remove(
          "bg-white/10",
          "text-white",
          "border-white/20",
        );

        section.querySelectorAll(".grade-panel").forEach((panel) => {
          const isTarget = panel.getAttribute("data-panel") === grade;
          panel.classList.toggle("hidden", !isTarget);
          if (isTarget) {
            panel.classList.add("opacity-0", "translate-y-3");
            window.requestAnimationFrame(() => {
              panel.classList.remove(
                "opacity-0",
                "translate-y-3",
              );
              panel.classList.add(
                "transition-all",
                "duration-300",
              );
            });
          }
        });
      });
    });

    document.querySelectorAll(".free-trial-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputs = Array.from(
          form.querySelectorAll(".trial-input"),
        );
        const error = form.querySelector(".trial-error");
        const success = form.querySelector(".trial-success");
        const isValid = inputs.every(
          (input) => input.value.trim() !== "",
        );

        if (!isValid) {
          if (success) success.classList.add("hidden");
          if (error) error.classList.remove("hidden");
          inputs.forEach((input) => {
            input.classList.toggle(
              "border-red-300",
              input.value.trim() === "",
            );
            input.classList.toggle(
              "bg-red-50",
              input.value.trim() === "",
            );
          });
          return;
        }

        inputs.forEach((input) => {
          input.classList.remove("border-red-300", "bg-red-50");
        });
        if (error) error.classList.add("hidden");
        if (success) success.classList.remove("hidden");
        form.reset();
      });
    });

    document.querySelectorAll(".faq-item").forEach((item) => {
      const trigger = item.querySelector(".faq-trigger");
      const content = item.querySelector(".faq-content");
      const icon = item.querySelector(".faq-icon");
      if (!trigger || !content) return;

      trigger.addEventListener("click", () => {
        const isOpen = !content.classList.contains("hidden");
        content.classList.toggle("hidden", isOpen);
        item.classList.toggle("bg-white", !isOpen);
        item.classList.toggle("shadow-sm", !isOpen);
        if (icon) icon.classList.toggle("rotate-180", !isOpen);
      });
    });

    document.querySelectorAll(".pressable").forEach((element) => {
      element.addEventListener("pointerdown", () => {
        element.classList.add("scale-95");
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach(
        (eventName) => {
          element.addEventListener(eventName, () => {
            element.classList.remove("scale-95");
          });
        },
      );
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
