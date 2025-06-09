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

window.addEventListener('beforeunload', function () {
    const activeLink = document.querySelector('.nav-item > a.active');
    if (activeLink && activeLink.href) {
        const fileName = new URL(activeLink.href).pathname.split('/').pop();
        localStorage.setItem('lastActiveLink', fileName);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    restoreSidebarActiveLink();
    restoreSidebarBackgroundColor();
    restoreSidebarSelectorColor();
    restoreSidebarBackgroundImage();
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
    // �������� ��������
    localStorage.setItem('SidebarBackgroundColor', newColor);
}

function restoreSidebarBackgroundColor() {
    // �������� ������� ������������ ��������
    if (localStorage.getItem('SidebarBackgroundColor')) {
        var cachedColor = localStorage.getItem('SidebarBackgroundColor');
        document.documentElement.style.setProperty('--SidebarBackgroundColor', `var(--${cachedColor})`);
    }
}

function setSidebarSelectorColor(e) {
    var newSelectorColor = e.getAttribute("data-color");
    var newFontColor = newSelectorColor === 'lightgrey' ? 'black' : 'lightgrey';
    document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${newSelectorColor})`);    
    document.documentElement.style.setProperty('--SidebarFontColor', `var(--${newFontColor})`);
    // �������� ��������
    localStorage.setItem('SidebarSelectorColor', newSelectorColor);
}

function restoreSidebarSelectorColor() {
    // �������� ������� ������������ ��������
    if (localStorage.getItem('SidebarSelectorColor')) {
        var cachedSelectorColor = localStorage.getItem('SidebarSelectorColor');
        var fontColor = cachedSelectorColor === 'lightgrey' ? 'black' : 'lightgrey';
        document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${cachedSelectorColor})`);
        document.documentElement.style.setProperty('--SidebarFontColor', `var(--${fontColor})`);
    }
}

function setSidebarBackgroundImage(e) {
    var newImage = e.getAttribute("data-image");

    var imagePath = '';

    switch (newImage) {
        case 'sidebar-1':
            imagePath = '../../img/sidebar-1.jpg';
            break;
        case 'sidebar-2':
            imagePath = '../../img/sidebar-2.jpg';
            break;
        case 'sidebar-3':
            imagePath = '../../img/sidebar-3.jpg';
            break;
        case 'sidebar-4':
            imagePath = '../../img/sidebar-4.jpg';
            break;
        case 'sidebar-5':
            imagePath = '../../img/sidebar-5.jpg';
            break;
        case 'sidebar-6':
            imagePath = '../../img/sidebar-6.jpg';
            break;
        case 'sidebar-7':
            imagePath = '../../img/sidebar-7.jpg';
            break;
        default:
            imagePath = '';
            break;
    }

    document.documentElement.style.setProperty('--SidebarBackgroundImage', `url(${imagePath})`);

    // �������� ��������
    localStorage.setItem('SidebarBackgroundImage', `url(${imagePath})`);
}

function restoreSidebarBackgroundImage() {
    // �������� ������� ������������ ��������
    if (localStorage.getItem('SidebarBackgroundImage')) {
        var cachedImage = localStorage.getItem('SidebarBackgroundImage');
        document.documentElement.style.setProperty('--SidebarBackgroundImage', cachedImage);
    }
}
