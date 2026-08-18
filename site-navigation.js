(() => {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const sectionLinks = Array.from(
    document.querySelectorAll('.site-nav a[href^="#"]')
  )
    .map((link) => {
      const targetId = link.getAttribute("href").slice(1);
      const section = targetId && targetId !== "top"
        ? document.getElementById(targetId)
        : null;

      return section ? { link, section } : null;
    })
    .filter(Boolean);

  let animationFrame = 0;

  const updateHeaderOffset = () => {
    const offset = Math.ceil(header.getBoundingClientRect().height + 16);
    document.documentElement.style.setProperty(
      "--sticky-header-offset",
      `${offset}px`
    );
  };

  const updateNavigation = () => {
    animationFrame = 0;
    header.classList.toggle("is-scrolled", window.scrollY > 8);

    if (!sectionLinks.length) {
      return;
    }

    const marker = header.getBoundingClientRect().bottom
      + Math.min(window.innerHeight * 0.2, 150);
    let activeItem = sectionLinks[0];

    sectionLinks.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= marker) {
        activeItem = item;
      }
    });

    const pageBottom = window.scrollY + window.innerHeight;
    const documentBottom = document.documentElement.scrollHeight;

    if (pageBottom >= documentBottom - 2) {
      activeItem = sectionLinks[sectionLinks.length - 1];
    }

    sectionLinks.forEach((item) => {
      if (item === activeItem) {
        item.link.setAttribute("aria-current", "location");
      } else if (item.link.getAttribute("aria-current") === "location") {
        item.link.removeAttribute("aria-current");
      }
    });
  };

  const requestNavigationUpdate = () => {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(updateNavigation);
    }
  };

  const handleResize = () => {
    updateHeaderOffset();
    requestNavigationUpdate();
  };

  updateHeaderOffset();
  updateNavigation();

  window.addEventListener("scroll", requestNavigationUpdate, { passive: true });
  window.addEventListener("resize", handleResize);
  window.addEventListener("load", handleResize, { once: true });
})();

(() => {
  const copyActions = document.querySelectorAll("[data-copy-value]");

  if (!copyActions.length) {
    return;
  }

  const copyText = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();

    const copied = document.execCommand("copy");
    textArea.remove();

    if (!copied) {
      throw new Error("Clipboard copy failed");
    }
  };

  copyActions.forEach((action) => {
    const label = action.querySelector(".contact-action-label");
    const defaultLabel = label ? label.textContent : "Copy";
    let feedbackTimer = 0;

    action.addEventListener("click", async () => {
      window.clearTimeout(feedbackTimer);
      action.classList.remove("is-copied", "is-copy-error");

      try {
        await copyText(action.dataset.copyValue);
        action.classList.add("is-copied");
        if (label) {
          label.textContent = "Copied";
        }
      } catch {
        action.classList.add("is-copy-error");
        if (label) {
          label.textContent = "Copy failed";
        }
      }

      feedbackTimer = window.setTimeout(() => {
        action.classList.remove("is-copied", "is-copy-error");
        if (label) {
          label.textContent = defaultLabel;
        }
      }, 1800);
    });
  });
})();
