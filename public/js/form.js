let images = [];
document.addEventListener('DOMContentLoaded', function() {

  const NASA_API_KEY = window.NASA_API_KEY;
  const nasaImageContainer = document.getElementById('nasaImageContainer');
  const imgURLInput = document.getElementById('imgURL');
  const imgDateInput = document.getElementById('imgDate');
  const imgTitleInput = document.getElementById('imgTitle');
  const form = document.getElementById('gratitudeForm');
  const randomizeBtn = document.getElementById('randomizeBtn');

  // Randomize button logic
  if (randomizeBtn) {
    randomizeBtn.addEventListener('click', async function() {
      console.log(images);  
      if (images.length === 0) {
        await fetchNASAImages();
      }
      if (images.length === 0) {
        nasaImageContainer.innerHTML = '<p>No images available. Please try again later.</p>';
        return;
      }
      displayNASAImages(images);
    });
  }

  async function fetchNASAImages() {
    if (images.length > 0) {
      displayNASAImages(images);
      return;
    }
    try {
      // Fetch 10 random images from NASA API
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`
      );
      
      if (!response.ok) {
        throw new Error('NASA API request failed');
      }
      
      const data = await response.json();
      data.forEach(image => {
        if (image.media_type !== 'image') return;
        images.push({
          imgURL: image.url,
          imgDate: image.date,
          imgTitle: image.title
        });
      });
      displayNASAImages(images);
    } catch (error) {
      console.error('Error fetching NASA images:', error);
      nasaImageContainer.innerHTML = '<p>Failed to load NASA images. Please try again later.</p>';
    }
  }

  function displayNASAImages(images) {
    if (!images || images.length === 0) {
      nasaImageContainer.innerHTML = '<p>No images available. Please try again later.</p>';
      return;
    }
    const image = images.shift();
    if (!image) {
      nasaImageContainer.innerHTML = '<p>No images available. Please try again later.</p>';
      return;
    }
    const card = document.createElement('div');
    card.className = 'nasa-image-card';
    card.dataset.url = image.imgURL;
    card.dataset.date = image.imgDate;
    card.dataset.title = image.imgTitle;

    const img = document.createElement('img');
    img.src = image.imgURL;
    img.alt = image.imgTitle;
    img.className = 'nasa-img';

    const title = document.createElement('div');
    title.className = 'nasa-img-title';
    title.textContent = image.imgTitle;

    const date = document.createElement('div');
    date.className = 'nasa-img-date';
    date.textContent = image.date;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(date);

    card.addEventListener('click', function() {
      imgURLInput.value = image.imgURL;
      imgDateInput.value = image.imgDate;
      imgTitleInput.value = image.imgTitle;
      document.querySelectorAll('.nasa-image-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });

    nasaImageContainer.innerHTML = '';
    nasaImageContainer.appendChild(card);

    imgURLInput.value = image.imgURL;
    imgDateInput.value = image.imgDate;
    if (imgTitleInput) imgTitleInput.value = image.imgTitle;
    card.classList.add('selected');
  }

  if (form) {
    form.addEventListener('submit', function(event) {
      if (!imgURLInput.value || !imgDateInput.value) {
        event.preventDefault();
        alert('Please select an astronomy image for your post.');
      }
    });
  }

  fetchNASAImages();
});
