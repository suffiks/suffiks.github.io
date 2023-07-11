const mode = document.getElementById('mode');

function updateIllustrations() {
  const preview = document.querySelector('suffiks-preview');
  if(!preview) {
    return;
  }
  if(document.documentElement.hasAttribute('data-dark-mode')) {
    preview.setAttribute('dark', 'true')
  } else {
    preview.removeAttribute('dark')
  }
}

if (mode !== null) {

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {

    if (event.matches) {

      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-dark-mode', '');

    } else {

      localStorage.setItem('theme', 'light');
      document.documentElement.removeAttribute('data-dark-mode');

    }

  })

  mode.addEventListener('click', () => {

    document.documentElement.toggleAttribute('data-dark-mode');
    localStorage.setItem('theme', document.documentElement.hasAttribute('data-dark-mode') ? 'dark' : 'light');

  });

  if (localStorage.getItem('theme') === 'dark') {

    document.documentElement.setAttribute('data-dark-mode', '');
    updateIllustrations();

  } else {

    document.documentElement.removeAttribute('data-dark-mode');

  }

}

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes') {
      updateIllustrations();
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true, //configure it to listen to attribute changes
});