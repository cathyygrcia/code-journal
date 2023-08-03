const entryImagePlaceholder = 'images/placeholder-image-square.jpg';

const $photoUrlInput = document.querySelector('#photo-url');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');
const $ul = document.querySelector('.entry-ul');

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
  $ul.prepend(renderEntry(entry));
  viewSwap('entries');
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

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $ul.appendChild($entry);
  }
});

/* const $noEntries = document.querySelector('.no-entries')

 function toggleNoEntries() {
 $noEntries.classList.toggle('hide');

} */
const $views = document.querySelectorAll('[data-view]');

function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}
const $showEntriesLink = document.querySelector('.show-entries');

$showEntriesLink.addEventListener('click', function (event) {
  viewSwap('entries');
});

const $newButton = document.querySelector('.new-button');

$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});
