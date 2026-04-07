// Завантаження при старті
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
});

// Встановлення теми
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);

  if (theme === "custom") {
    applyCustomTheme();
  }
}

// Збереження кастомної теми
function saveCustomTheme() {
  const bgColor = document.getElementById("bgColor").value;
  const textColor = document.getElementById("textColor").value;

  // Валідація
  if (!bgColor || !textColor) {
    alert("Оберіть кольори!");
    return;
  }

  const customTheme = {
    bg: bgColor,
    text: textColor
  };

  localStorage.setItem("customTheme", JSON.stringify(customTheme));
  setTheme("custom");
}

// Застосування кастомної теми
function applyCustomTheme() {
  const data = localStorage.getItem("customTheme");

  if (!data) return;

  const theme = JSON.parse(data);

  document.body.style.backgroundColor = theme.bg;
  document.body.style.color = theme.text;
}

// Завантаження теми
function loadTheme() {
  const theme = localStorage.getItem("theme");

  if (theme) {
    setTheme(theme);
  } else {
    setTheme("light");
  }
}