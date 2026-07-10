(function() {
  const init = () => {
    const wrappers = document.querySelectorAll(".video-wrapper");
    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector(".video-player");
      const overlay = wrapper.querySelector(".video-overlay");
      if (!video) return;

      wrapper.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          if (overlay) overlay.classList.add("hidden");
        } else {
          video.pause();
          if (overlay) overlay.classList.remove("hidden");
        }
      });
      video.addEventListener("ended", () => {
        if (overlay) overlay.classList.remove("hidden");
      });
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
