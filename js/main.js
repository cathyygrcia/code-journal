const entryImagePlaceholder = 'images/placeholder-image-square.jpg';

const $photoUrlInput = document.querySelector('#photo-url');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');

$photoUrlInput.addEventListener('input', function (event) {
  $entryImage.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: event.target.elements.title.value,
    photoUrl: event.target.elements.photoUrl.value,
    notes: event.target.elements.notes.value,
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $entryImage.setAttribute('src', entryImagePlaceholder);
  $entryForm.reset();
});
