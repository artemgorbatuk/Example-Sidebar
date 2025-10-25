/**
 * Модуль управления sidebar
 * @module SidebarManager
 */

/**
 * Обработчик клика по элементам toggle в sidebar
 * @param {Event} event - Событие клика
 */
const handleSidebarToggle = (event) => {
    try {
        const icon = event.currentTarget.querySelector('.sidebar-icon-right');
        if (icon) {
            icon.classList.toggle('rotate');
        }
    } catch (error) {
        console.error('Ошибка при обработке toggle sidebar:', error);
    }
};

/**
 * Обработчик клика по навигационным ссылкам
 * @param {Event} event - Событие клика
 */
const handleNavLinkClick = (event) => {
    try {
        const link = event.currentTarget;
        
        if (!link.classList.contains('sidebar-toggle-item')) {
            event.preventDefault();
            
            document.querySelectorAll('.nav-item a').forEach(el => {
                el.classList.remove('active');
            });
            
            link.classList.add('active');
        }
    } catch (error) {
        console.error('Ошибка при обработке клика по навигационной ссылке:', error);
    }
};

/**
 * Сохраняет активную ссылку в localStorage перед выгрузкой страницы
 */
const saveActiveLink = () => {
    try {
    const activeLink = document.querySelector('.nav-item > a.active');
    if (activeLink && activeLink.href) {
        const fileName = new URL(activeLink.href).pathname.split('/').pop();
        localStorage.setItem('lastActiveLink', fileName);
    }
    } catch (error) {
        console.error('Ошибка при сохранении активной ссылки:', error);
    }
};

/**
 * Восстанавливает активную ссылку из localStorage
 */
const restoreActiveLink = () => {
    try {
    const lastActiveLink = localStorage.getItem('lastActiveLink');
    if (lastActiveLink) {
            const link = document.querySelector(`a[href*="${lastActiveLink}"]`);
            if (link) {
                link.classList.add('active');
            }
        }
    } catch (error) {
        console.error('Ошибка при восстановлении активной ссылки:', error);
    }
};

/**
 * Восстанавливает цвет фона sidebar из localStorage
 */
const restoreSidebarBackgroundColor = () => {
    try {
        const cachedColor = localStorage.getItem('SidebarBackgroundColor');
        if (cachedColor) {
            document.documentElement.style.setProperty('--SidebarBackgroundColor', `var(--${cachedColor})`);
        }
    } catch (error) {
        console.error('Ошибка при восстановлении цвета фона sidebar:', error);
    }
};

/**
 * Восстанавливает цвет селектора sidebar из localStorage
 */
const restoreSidebarSelectorColor = () => {
    try {
        const cachedSelectorColor = localStorage.getItem('SidebarSelectorColor');
        if (cachedSelectorColor) {
            const fontColor = cachedSelectorColor === 'lightgrey' ? 'black' : 'lightgrey';
            document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${cachedSelectorColor})`);
            document.documentElement.style.setProperty('--SidebarFontColor', `var(--${fontColor})`);
        }
    } catch (error) {
        console.error('Ошибка при восстановлении цвета селектора sidebar:', error);
    }
};

/**
 * Устанавливает цвет фона sidebar
 * @param {HTMLElement} element - Элемент с data-color атрибутом
 */
const setSidebarBackgroundColor = (element) => {
    try {
        const newColor = element.getAttribute("data-color");
        document.documentElement.style.setProperty('--SidebarBackgroundColor', `var(--${newColor})`);
        localStorage.setItem('SidebarBackgroundColor', newColor);
    } catch (error) {
        console.error('Ошибка при установке цвета фона sidebar:', error);
    }
};

/**
 * Устанавливает цвет селектора sidebar
 * @param {HTMLElement} element - Элемент с data-color атрибутом
 */
const setSidebarSelectorColor = (element) => {
    try {
        const newSelectorColor = element.getAttribute("data-color");
        const newFontColor = newSelectorColor === 'lightgrey' ? 'black' : 'lightgrey';
        document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${newSelectorColor})`);
        document.documentElement.style.setProperty('--SidebarFontColor', `var(--${newFontColor})`);
        localStorage.setItem('SidebarSelectorColor', newSelectorColor);
    } catch (error) {
        console.error('Ошибка при установке цвета селектора sidebar:', error);
    }
};

/**
 * Устанавливает фоновое изображение sidebar
 * @param {HTMLElement} element - Элемент с data-image атрибутом
 */
const setSidebarBackgroundImage = (element) => {
    try {
        const newImage = element.getAttribute("data-image");
        let imagePath = '';

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
        localStorage.setItem('SidebarBackgroundImage', `url(${imagePath})`);
    } catch (error) {
        console.error('Ошибка при установке фонового изображения sidebar:', error);
    }
};

/**
 * Восстанавливает фоновое изображение sidebar из localStorage
 */
const restoreSidebarBackgroundImage = () => {
    try {
        const cachedImage = localStorage.getItem('SidebarBackgroundImage');
        if (cachedImage) {
            document.documentElement.style.setProperty('--SidebarBackgroundImage', cachedImage);
        }
    } catch (error) {
        console.error('Ошибка при восстановлении фонового изображения sidebar:', error);
    }
};

/**
 * Обновляет горизонтальные линии в конфигураторе
 */
const updateSidebarConfiguratorLines = () => {
    try {
        const lines = document.querySelectorAll('.horizontal-line[data-color="SidebarBackgroundColor"]');
        const sidebarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--SidebarBackgroundColor')
            .trim();
        
        lines.forEach(line => {
            line.style.backgroundColor = sidebarColor;
            line.style.opacity = '0.3';
        });
    } catch (error) {
        console.error('Ошибка при обновлении линий конфигуратора:', error);
    }
};

/**
 * Инициализация sidebar после загрузки DOM
 */
const initSidebar = () => {
    try {
        document.addEventListener('click', (event) => {
            const toggleItem = event.target.closest('.sidebar-toggle-item');
            if (toggleItem) {
                const newEvent = {
                    ...event,
                    currentTarget: toggleItem
                };
                handleSidebarToggle(newEvent);
            }
        });

        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });

        window.addEventListener('beforeunload', saveActiveLink);

        restoreActiveLink();
        restoreSidebarBackgroundColor();
        restoreSidebarSelectorColor();
        restoreSidebarBackgroundImage();
        updateSidebarConfiguratorLines();
    } catch (error) {
        console.error('Ошибка при инициализации sidebar:', error);
    }
};

document.addEventListener('DOMContentLoaded', initSidebar);

window.setSidebarBackgroundColor = setSidebarBackgroundColor;
window.setSidebarSelectorColor = setSidebarSelectorColor;
window.setSidebarBackgroundImage = setSidebarBackgroundImage;
window.updateConfiguratorLines = updateSidebarConfiguratorLines;