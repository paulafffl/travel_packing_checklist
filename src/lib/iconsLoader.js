document.fonts.ready.then(() => {
  const icons = document.querySelectorAll('.button-with-icon');
  icons.forEach((icon) => {
    icon.classList.add('loaded');
  });
});
