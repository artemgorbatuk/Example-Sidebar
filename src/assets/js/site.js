
$(document).on('click', '.sidebar-toggle-item', function () {
    var icon = $(this).find(".sidebar-icon-right");
    icon.toggleClass('rotate');
});



document.querySelectorAll('.nav-item a').forEach(function (link) {
    link.addEventListener('click', function (event) {
        if (!this.classList.contains('sidebar-toggle-item')) {
            event.preventDefault();
            document.querySelectorAll('.nav-item a').forEach(function (el) {
                el.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});


var configuratorWindow = document.querySelector(".configurator-window");
var configuratorButtonShow = document.querySelector(".configurator-button-show");
var configuratorButtonClose = document.querySelector(".configurator-button-close");

configuratorButtonShow && (configuratorButtonShow.onclick = function () {
    configuratorWindow.classList.contains("show")
        ? configuratorWindow.classList.remove("show")
        : configuratorWindow.classList.add("show")
});

configuratorButtonClose && (configuratorButtonClose.onclick = function () {
    configuratorWindow.classList.remove("show")
});


document.addEventListener('DOMContentLoaded', function () {
    restoreSidebarActiveLink();
    restoreSidebarBackgroundColor();
    restoreSidebarSelectorColor();
    restoreSidebarBackgroundImage();
});



window.addEventListener('beforeunload', function () {
    const activeLink = document.querySelector('.nav-item > a.active');
    if (activeLink && activeLink.href) {
        const fileName = new URL(activeLink.href).pathname.split('/').pop();
        localStorage.setItem('lastActiveLink', fileName);    }
});

function restoreSidebarActiveLink() {
    const lastActiveLink = localStorage.getItem('lastActiveLink');
    if (lastActiveLink) {
        const activeLinkElement = document.querySelector(`a[href="${lastActiveLink}"]`);
        if (activeLinkElement) {
            activeLinkElement.classList.add('active');
        }
    }
}

function setSidebarBackgroundColor(e) {
    var newColor = e.getAttribute("data-color");
    document.documentElement.style.setProperty('--SidebarBackgroundColor', `var(--${newColor})`);
    // кэшируем значение
    localStorage.setItem('SidebarBackgroundColor', `var(--${newColor})`);
}

function restoreSidebarBackgroundColor() {
    // Проверка наличия сохраненного значения
    if (localStorage.getItem('SidebarBackgroundColor')) {
        var cachedColor = localStorage.getItem('SidebarBackgroundColor');
        document.documentElement.style.setProperty('--SidebarBackgroundColor', cachedColor);
    }
}

function setSidebarSelectorColor(e) {
    var newColor = e.getAttribute("data-color");
    document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${newColor})`);
    // кэшируем значение
    localStorage.setItem('SidebarSelectorColor', `var(--${newColor})`);
}

function restoreSidebarSelectorColor() {
    // Проверка наличия сохраненного значения
    if (localStorage.getItem('SidebarSelectorColor')) {
        var cachedColor = localStorage.getItem('SidebarSelectorColor');
        document.documentElement.style.setProperty('--SidebarSelectorColor', cachedColor);
    }
}

function setSidebarBackgroundImage(e) {
    var newImage = e.getAttribute("data-image");

    var imagePath = '';

    switch (newImage) {
        case 'sidebar-1':
            imagePath = '../../assets/img/sidebar-1.jpg';
            break;
        case 'sidebar-2':
            imagePath = '../../assets/img/sidebar-2.jpg';
            break;
        case 'sidebar-3':
            imagePath = '../../assets/img/sidebar-3.jpg';
            break;
        case 'sidebar-4':
            imagePath = '../../assets/img/sidebar-4.jpg';
            break;
        case 'sidebar-5':
            imagePath = '../../assets/img/sidebar-5.jpg';
            break;
        case 'sidebar-6':
            imagePath = '../../assets/img/sidebar-6.jpg';
            break;
        case 'sidebar-7':
            imagePath = '../../assets/img/sidebar-7.jpg';
            break;
        default:
            imagePath = '';
            break;
    }

    document.documentElement.style.setProperty('--SidebarBackgroundImage', `url(${imagePath})`);

    // кэшируем значение
    localStorage.setItem('SidebarBackgroundImage', `url(${imagePath})`);
}

function restoreSidebarBackgroundImage() {
    // Проверка наличия сохраненного значения
    if (localStorage.getItem('SidebarBackgroundImage')) {
        var cachedImage = localStorage.getItem('SidebarBackgroundImage');
        document.documentElement.style.setProperty('--SidebarBackgroundImage', cachedImage);
    }
}

$(document).ready(function () {
    checkFooterPosition();
    $(window).resize(checkFooterPosition);
});

function checkFooterPosition() {
    var contentHeight = $('.content').height();
    var windowHeight = $(window).height();

    if (contentHeight < windowHeight) {
        $('.footer').addClass('fixed');
    } else {
        $('.footer').removeClass('fixed');
    }
}