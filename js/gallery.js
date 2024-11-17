const images = [
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
        description: 'Hokkaido Flower',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
        description: 'Container Haulage Freight',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
        description: 'Aerial Beach View',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
    },
    {
        preview:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
            'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
    },
]

// Контейнер галереї
const galleryContainer = document.querySelector('.gallery')

// Генеруємо HTML-розмітку для елементів галереї
const galleryMarkup = images
    .map(
        ({ preview, original, description }) =>
            `<li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join('')
galleryContainer.innerHTML = galleryMarkup

// Ідентифікуємо поточний індекс
let currentIndex = 0

// Відкриття модального вікна
const openModal = (index) => {
    currentIndex = index

    const instance = basicLightbox.create(
        `
    <div class="modal">
      <img src="${images[index].original}" alt="${images[index].description}" class="modal-image" />
      <button class="modal-prev">◀</button>
      <button class="modal-next">▶</button>
    </div>
  `,
        {
            onShow: (instance) => {
                // Wait for the DOM to render the modal content
                setTimeout(() => {
                    const prevButton = document.querySelector('.modal-prev')
                    const nextButton = document.querySelector('.modal-next')

                    if (prevButton && nextButton) {
                        prevButton.addEventListener('click', prevImage)
                        nextButton.addEventListener('click', nextImage)
                    }
                })
            },
            onClose: (instance) => {
                // Clean up event listeners to prevent memory leaks
                const prevButton = document.querySelector('.modal-prev')
                const nextButton = document.querySelector('.modal-next')

                if (prevButton && nextButton) {
                    prevButton.removeEventListener('click', prevImage)
                    nextButton.removeEventListener('click', nextImage)
                }
            },
        }
    )

    instance.show()
}

// Функції навігації
const nextImage = () => {
    currentIndex = (currentIndex + 1) % images.length
    updateModalImage()
}

const prevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    updateModalImage()
}

// Оновлення зображення у модальному вікні
const updateModalImage = () => {
    const modalImage = document.querySelector('.modal-image')
    modalImage.src = images[currentIndex].original
    modalImage.alt = images[currentIndex].description
}

// Відстеження кліку на галереї
galleryContainer.addEventListener('click', (event) => {
    event.preventDefault()
    if (!event.target.classList.contains('gallery-image')) return

    const clickedIndex = images.findIndex(
        (image) => image.original === event.target.dataset.source
    )
    openModal(clickedIndex)
})
