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

function renderEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');

  const $imageWrapper = document.createElement('div');
  $imageWrapper.setAttribute('class', 'column-half');

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);

  const $entryWrapper = document.createElement('div');
  $entryWrapper.setAttribute('class', 'column-half');

  const $title = document.createElement('h2');
  $title.textContent = entry.title;

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $entryItem.appendChild($imageWrapper);
  $imageWrapper.appendChild($image);
  $entryItem.appendChild($entryWrapper);
  $entryWrapper.appendChild($title);
  $entryWrapper.appendChild($notes);

  return $entryItem;
}

const $journalEntriesList = document.querySelector('.journal-entries');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $journalEntriesList.appendChild($entry);
  }
});
