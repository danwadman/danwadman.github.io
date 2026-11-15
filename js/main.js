const backToTopButton = document.getElementById("backtotop");

function updateBackToTopVisibility() {
  if (window.scrollY > 160) {
    backToTopButton.classList.add("backtotopstyling");
  } else {
    backToTopButton.classList.remove("backtotopstyling");
  }
}

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

backToTopButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const dialogTriggers = document.querySelectorAll("[data-dialog-target]");
let activeDialog = null;
let dialogOpener = null;
let previousBodyOverflow = "";

function getDialogFocusables(dialog) {
  return dialog.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
}

function openDialog(dialog, trigger) {
  if (activeDialog) {
    closeDialog();
  }

  const title = dialog.querySelector(".dialog-title");
  if (title) {
    title.id = `${dialog.id}-title`;
    dialog.setAttribute("aria-labelledby", title.id);
  }

  activeDialog = dialog;
  dialogOpener = trigger;
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  dialog.hidden = false;

  if (title) {
    title.setAttribute("tabindex", "-1");
    title.focus();
  } else {
    dialog.focus();
  }
}

function closeDialog() {
  if (!activeDialog) {
    return;
  }

  activeDialog.hidden = true;
  document.body.style.overflow = previousBodyOverflow;

  if (dialogOpener) {
    dialogOpener.focus();
  }

  activeDialog = null;
  dialogOpener = null;
}

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const dialogId = trigger.getAttribute("data-dialog-target").slice(1);
    const dialog = document.getElementById(dialogId);

    if (!dialog) {
      return;
    }

    event.preventDefault();
    openDialog(dialog, trigger);
  });
});

document.querySelectorAll("[data-dialog-close]").forEach((closeButton) => {
  closeButton.addEventListener("click", closeDialog);
});

document.querySelectorAll(".dialog-overlay").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (!activeDialog) {
    return;
  }

  if (event.key === "Escape") {
    closeDialog();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusables = getDialogFocusables(activeDialog);
  if (focusables.length === 0) {
    event.preventDefault();
    activeDialog.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const activeElement = document.activeElement;
  const focusIsInDialog = Array.from(focusables).includes(activeElement);

  if (event.shiftKey && (!focusIsInDialog || activeElement === first)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (!focusIsInDialog || activeElement === last)) {
    event.preventDefault();
    first.focus();
  }
});

updateBackToTopVisibility();
