const backdrop = document.getElementById("error-backdrop");
const titleEl = document.getElementById("error-title");
const statusEl = document.getElementById("error-status");
const messageEl = document.getElementById("error-message");
const closeBtn = document.getElementById("error-close-btn");

export function showError(error) {
  const title = error.title || error.name || "Error";
  const message = error.message || "An unexpected error occurred.";
  const status = error.status ? `Code ${error.status}` : "";

  titleEl.textContent = title;
  statusEl.textContent = status;
  messageEl.textContent = message;

  backdrop.classList.add("active");
  closeBtn.focus();
}

export function hideError() {
  backdrop.classList.remove("active");
}

closeBtn.addEventListener("click", hideError);

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    hideError();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && backdrop.classList.contains("active")) {
    hideError();
  }
});
