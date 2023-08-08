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

  if (data.editing === null) {
    $h1.textContent = 'New Entry';
    const entry = {
      entryId: data.nextEntryId,
      title: event.target.elements.title.value,
      photoUrl: event.target.elements.photoUrl.value,
      notes: event.target.elements.notes.value,
    };

    data.nextEntryId++;
    data.entries.unshift(entry);
    $ul.prepend(renderEntry(entry));
    $entryImage.setAttribute('src', entryImagePlaceholder);
    toggleNoEntries();
    $entryForm.reset();
  } else {
    $h1.textContent = 'Edit Entry';
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i].title = event.target.elements.title.value;
        data.entries[i].photoUrl = event.target.elements.photoUrl.value;
        data.entries[i].notes = event.target.elements.notes.value;
        $li[i].replaceWith(renderEntry(data.entries[i]));
      }
    }
  }
  data.editing = null;
  $entryForm.reset();
  viewSwap('entries');
});

function renderEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');
  $entryItem.setAttribute('data-entry-id', entry.entryId);

  const $imageWrapper = document.createElement('div');
  $imageWrapper.setAttribute('class', 'column-half list-image');

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);

  const $entryWrapper = document.createElement('div');
  $entryWrapper.setAttribute('class', 'column-half');

  const $titleWrapper = document.createElement('div');
  $titleWrapper.setAttribute('class', 'title-wrapper');

  const $title = document.createElement('h2');
  $title.textContent = entry.title;

  const $pencilIcon = document.createElement('i');
  $pencilIcon.classList.add('fas', 'fa-pencil-alt');

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $titleWrapper.appendChild($title);
  $titleWrapper.appendChild($pencilIcon);

  $entryItem.appendChild($imageWrapper);
  $imageWrapper.appendChild($image);
  $entryItem.appendChild($entryWrapper);
  $entryWrapper.appendChild($titleWrapper);
  $entryWrapper.appendChild($notes);

  return $entryItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $entry = renderEntry(data.entries[i]);
    $ul.appendChild($entry);
  }
  toggleNoEntries();
});

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

const $views = document.querySelectorAll('[data-view]');

function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
    if (data.view === 'entry-form') {
      $entryForm.reset();
      $entryImage.setAttribute('src', entryImagePlaceholder);
      $h1.textContent = 'New Entry';
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

const $entryTitle = document.querySelector('#title');
const $entryNotes = document.querySelector('#notes');
const $h1 = document.querySelector('h1');

$ul.addEventListener('click', function pencilClick(event) {
  if (event.target.tagName === 'I') {
    const dataEntryId = event.target
      .closest('li')
      .getAttribute('data-entry-id');

    viewSwap('entry-form');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(dataEntryId)) {
        data.editing = data.entries[i];
        $entryTitle.value = data.editing.title;
        $entryNotes.value = data.editing.notes;
        $photoUrlInput.value = data.editing.photoUrl;
        $entryImage.setAttribute('src', data.editing.photoUrl);
        $h1.textContent = 'Edit Entry';
      }
    }
  }
});
