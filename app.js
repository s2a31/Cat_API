function imageElement(id, alt) {
  const img = document.createElement('img');
  Object.assign(img, {
    id: `${id}`,
    alt: `${alt}`,
  });
  return img;
}

function createElement(element, text, id) {
  const htmlElement = document.createElement(`${element}`);
  Object.assign(htmlElement, {
    textContent: `${text}`,
    id: `${id}`,
  });
  return htmlElement;
}

function fadeOutImage(image) {
  image.classList.remove('fade-zoom-in');
  image.classList.add('fade-zoom-out');
}

function fadeInImage(image) {
  image.classList.remove('fade-zoom-out');
  image.classList.add('fade-zoom-in');
}

async function fetchCats() {
  let photoUrl;
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const parseData = await response.json();
    photoUrl = await parseData[0].url;
  } catch (error) {
    console.error('Failed to load cat images:', error);
  }
  return photoUrl;
}

function main() {
  const container = document.querySelector('.container');
  const loadButton = createElement('button', 'Click Me', 'load-button');
  const message = createElement(
    'p',
    'Click the button to see a cat 🐱',
    'message'
  );
  container.append(message, loadButton);

  let catPhoto = imageElement('image', 'A picture with a cat.');
  let imageVisible = false;

  loadButton.addEventListener('click', async () => {
    if (message.parentNode) message.remove();

    if (imageVisible) {
      fadeOutImage(catPhoto);

      catPhoto.addEventListener(
        'transitionstart',
        async function handler(event) {
          if (event.propertyName !== 'opacity') return;
          catPhoto.removeEventListener('transitionstart', handler);

          try {
            const url = await fetchCats();

            catPhoto.onload = () => {
              requestAnimationFrame(() => {
                fadeInImage(catPhoto);
              });
            };

            catPhoto.src = url;
          } catch (error) {
            console.error('Failed to load cat images:', error);
            container.insertBefore(message, loadButton);
          }
        },
        { once: true }
      );
    } else {
      catPhoto.classList.add('fade-zoom-out');
      try {
        const url = await fetchCats();

        catPhoto.onload = () => {
          requestAnimationFrame(() => {
            fadeInImage(catPhoto);
          });
        };

        catPhoto.src = url;
        container.append(catPhoto, loadButton);
        imageVisible = true;
      } catch (error) {
        console.error('Failed to load cat images:', error);
        container.insertBefore(message, loadButton);
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', main);
