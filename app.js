function imageElement(id, alt, src) {
  const img = document.createElement('img');
  Object.assign(img, {
    id: `${id}`,
    alt: `${alt}`
  })
  return img;
}

function buttonElement(text, id) {
  const button = document.createElement('button');
  button.textContent = `${text}`;
  button.id = `${id}`;
  return button;
}

async function fetchCats() {
  let photoUrl;
  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const parseData = await response.json();
    photoUrl = await parseData[0].url;
  } catch (error) {
    console.error('Failed to load cat images:', error)
  }
  return photoUrl;
}

function main() {
  const container = document.querySelector('.container');
  const loadButton = buttonElement('Click Me', 'load-button');
  let catPhoto = imageElement('image', 'A picture with a cat.');
  loadButton.addEventListener('click', async () => {
    let returnedData = await fetchCats();
    catPhoto.src = returnedData;
  });
  container.append(catPhoto, loadButton);
}

window.addEventListener('DOMContentLoaded', main);