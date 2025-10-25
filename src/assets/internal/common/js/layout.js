/**
 * Основной модуль управления layout
 * @module LayoutManager
 */

const MAIN_ELEMENT = document.querySelector('main');
let toggleHeader, toggleFooter;

/**
 * Получает полную высоту элемента с учетом margin'ов (аналог jQuery outerHeight(true))
 * @param {HTMLElement} element - Элемент для расчета
 * @returns {number} Полная высота в пикселях
 */
const getFullElementHeight = (element) => {
    try {
        return $(element).outerHeight(true);
    } catch (error) {
        console.error('Ошибка при расчете полной высоты элемента:', error);
        return element.offsetHeight;
    }
};

/**
 * Получает ширину скроллбара браузера
 * @returns {string} Ширина скроллбара в пикселях
 */
const getScrollbarWidth = () => {
    try {
        const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

        const inner = document.createElement('div');
    outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    outer.parentNode.removeChild(outer);

        return `${scrollbarWidth}px`;
    } catch (error) {
        console.error('Ошибка при вычислении ширины скроллбара:', error);
        return '0px';
    }
};

const scrollbarWidth = getScrollbarWidth();

/**
 * Debounce функция для оптимизации производительности
 * @param {Function} func - Функция для выполнения
 * @param {number} wait - Задержка в миллисекундах
 * @returns {Function} Debounced функция
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Обработчик изменения размера окна
 */
const handleResize = () => {
    try {
        setFooterPosition();
    } catch (error) {
        console.error('Ошибка при обработке изменения размера окна:', error);
    }
};

// Применяем debounce с задержкой 250ms для resize событий
const debouncedHandleResize = debounce(handleResize, 250);
window.addEventListener('resize', debouncedHandleResize);

/**
 * Обработчик скролла для main элемента
 */
const handleMainScroll = () => {
    try {
        if (!toggleFooter) return;
        
        const footerState = toggleFooter.checked;
        if (footerState) return;

        const main = document.querySelector('main');
        if (!main) return;

        const mainHeight = main.clientHeight;
        const contentHeight = main.scrollHeight;
        const scrollTop = main.scrollTop;
        
        const footerRight = document.querySelector('.footer-right');
        if (!footerRight) return;
        
        const distanceToBottom = contentHeight - (scrollTop + mainHeight);
        
        if (distanceToBottom <= 50) {
            footerRight.style.paddingRight = '65px';
        } else {
            footerRight.style.paddingRight = '0';
        }
    } catch (error) {
        console.error('Ошибка при обработке скролла main:', error);
    }
};

/**
 * Инициализация переключателей после загрузки DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        toggleHeader = document.querySelector('.toggle-header');
        toggleFooter = document.querySelector('.toggle-footer');

        if (toggleHeader) {
            toggleHeader.addEventListener('change', () => {
                setHeaderState();
    setHeaderPosition();
            });
        }

        if (toggleFooter) {
            toggleFooter.addEventListener('change', () => {
                setFooterState();
    setFooterPosition();
});
        }

        restoreHeaderState();
        restoreFooterState();
        
        setHeaderPosition();
        setFooterPosition();
        
        const mainElement = document.querySelector('main');
        if (mainElement) {
            // Применяем debounce с задержкой 100ms для scroll событий
            const debouncedHandleMainScroll = debounce(handleMainScroll, 100);
            mainElement.addEventListener('scroll', debouncedHandleMainScroll);
        }
    } catch (error) {
        console.error('Ошибка при инициализации layout:', error);
    }
});

/**
 * Устанавливает состояние header (fixed/static)
 */
const setHeaderState = () => {
    try {
        if (!toggleHeader) return;
        
        const headerState = toggleHeader.checked;
        
        localStorage.setItem('HeaderState', `${headerState}`);
        
        if (headerState) {
            const header = document.querySelector('header');
            if (header) {
                header.style.position = 'fixed';
                const content = document.querySelector('content');
                if (content) {
                    content.style.marginTop = `${getFullElementHeight(header)}px`;
                }
            }
        } else {
            const header = document.querySelector('header');
            if (header) {
                header.style.position = 'static';
                header.style.top = '';
                header.style.width = '100%';
                header.style.zIndex = '100';
            }
            const content = document.querySelector('content');
            if (content) {
                content.style.marginTop = '';
            }
        }
    } catch (error) {
        console.error('Ошибка при установке состояния header:', error);
    }
};

/**
 * Восстанавливает состояние header из localStorage
 */
const restoreHeaderState = () => {
    try {
        if (localStorage.getItem('HeaderState')) {
            const cachedHeaderState = localStorage.getItem('HeaderState') === 'true';
            if (toggleHeader) {
                toggleHeader.checked = cachedHeaderState;
            }
        }
    } catch (error) {
        console.error('Ошибка при восстановлении состояния header:', error);
    }
};

/**
 * Устанавливает позицию header
 * Теперь просто вызывает setHeaderState() для избежания дублирования кода
 */
const setHeaderPosition = () => {
    try {
        setHeaderState();
    } catch (error) {
        console.error('Ошибка при установке позиции header:', error);
    }
};

/**
 * Устанавливает состояние footer (fixed/static)
 */
const setFooterState = () => {
    try {
        if (!toggleFooter) return;
        
        const footerState = toggleFooter.checked;
        
        localStorage.setItem('FooterState', `${footerState}`);

    if (footerState) {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.position = 'fixed';
                const footerRight = document.querySelector('.footer-right');
                if (footerRight) {
                    footerRight.style.paddingRight = '65px';
                }
                const content = document.querySelector('content');
                if (content) {
                    content.style.marginBottom = `${getFullElementHeight(footer)}px`;
                }
            }
    } else {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.position = 'static';
                footer.style.bottom = '';
                footer.style.width = '100%';
            }
            const footerRight = document.querySelector('.footer-right');
            if (footerRight) {
                footerRight.style.paddingRight = '';
            }
            const content = document.querySelector('content');
            if (content) {
                content.style.marginBottom = '';
            }
        }
    } catch (error) {
        console.error('Ошибка при установке состояния footer:', error);
    }
};

/**
 * Восстанавливает состояние footer из localStorage
 */
const restoreFooterState = () => {
    try {
        if (localStorage.getItem('FooterState')) {
            const cachedFooterState = localStorage.getItem('FooterState') === 'true';
            if (toggleFooter) {
                toggleFooter.checked = cachedFooterState;
            }
        }
    } catch (error) {
        console.error('Ошибка при восстановлении состояния footer:', error);
    }
};

/**
 * Устанавливает позицию footer
 * Теперь просто вызывает setFooterState() для избежания дублирования кода
 */
const setFooterPosition = () => {
    try {
        setFooterState();
    } catch (error) {
        console.error('Ошибка при установке позиции footer:', error);
    }
};

/**
 * Экспортирует все настройки в JSON
 * @returns {Object} Объект с настройками
 */
const exportSettings = () => {
    try {
        const settings = {
            layout: {
                headerState: localStorage.getItem('HeaderState'),
                footerState: localStorage.getItem('FooterState')
            },
            sidebar: {
                backgroundColor: localStorage.getItem('SidebarBackgroundColor'),
                selectorColor: localStorage.getItem('SidebarSelectorColor'),
                backgroundImage: localStorage.getItem('SidebarBackgroundImage')
            },
            configurator: {
                theme: localStorage.getItem('selectedTheme')
            },
            metadata: {
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            }
        };
        
        return settings;
    } catch (error) {
        console.error('Ошибка при экспорте настроек:', error);
        return null;
    }
};

/**
 * Импортирует настройки из JSON
 * @param {Object} settings - Объект с настройками
 */
const importSettings = (settings) => {
    try {
        if (!settings || typeof settings !== 'object') {
            throw new Error('Некорректный формат настроек');
        }

        // Импортируем настройки layout
        if (settings.layout) {
            if (settings.layout.headerState) {
                localStorage.setItem('HeaderState', settings.layout.headerState);
                if (toggleHeader) {
                    toggleHeader.checked = settings.layout.headerState === 'true';
                    setHeaderState();
                    setHeaderPosition();
                }
            }
            
            if (settings.layout.footerState) {
                localStorage.setItem('FooterState', settings.layout.footerState);
                if (toggleFooter) {
                    toggleFooter.checked = settings.layout.footerState === 'true';
                    setFooterState();
                    setFooterPosition();
                }
            }
        }

        // Импортируем настройки sidebar
        if (settings.sidebar) {
            if (settings.sidebar.backgroundColor) {
                localStorage.setItem('SidebarBackgroundColor', settings.sidebar.backgroundColor);
                document.documentElement.style.setProperty('--SidebarBackgroundColor', `var(--${settings.sidebar.backgroundColor})`);
            }
            
            if (settings.sidebar.selectorColor) {
                localStorage.setItem('SidebarSelectorColor', settings.sidebar.selectorColor);
                const fontColor = settings.sidebar.selectorColor === 'lightgrey' ? 'black' : 'lightgrey';
                document.documentElement.style.setProperty('--SidebarSelectorColor', `var(--${settings.sidebar.selectorColor})`);
                document.documentElement.style.setProperty('--SidebarFontColor', `var(--${fontColor})`);
            }
            
            if (settings.sidebar.backgroundImage) {
                localStorage.setItem('SidebarBackgroundImage', settings.sidebar.backgroundImage);
                document.documentElement.style.setProperty('--SidebarBackgroundImage', settings.sidebar.backgroundImage);
            }
        }

        // Импортируем настройки конфигуратора
        if (settings.configurator && settings.configurator.theme) {
            localStorage.setItem('selectedTheme', settings.configurator.theme);
            if (window.setTheme) {
                window.setTheme(settings.configurator.theme);
            }
        }

        // Обновляем конфигуратор
        if (window.updateConfiguratorLines) {
            window.updateConfiguratorLines();
        }

        return true;
    } catch (error) {
        console.error('Ошибка при импорте настроек:', error);
        return false;
    }
};

/**
 * Скачивает настройки как JSON файл
 */
const downloadSettings = () => {
    try {
        const settings = exportSettings();
        if (!settings) return;

        const dataStr = JSON.stringify(settings, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `sidebar-settings-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Ошибка при скачивании настроек:', error);
    }
};

/**
 * Загружает настройки из файла
 * @param {File} file - Файл с настройками
 */
const uploadSettings = (file) => {
    try {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const settings = JSON.parse(e.target.result);
                const success = importSettings(settings);
                
                if (success) {
                    alert('Настройки успешно импортированы!');
                } else {
                    alert('Ошибка при импорте настроек. Проверьте формат файла.');
                }
            } catch (error) {
                console.error('Ошибка при чтении файла:', error);
                alert('Ошибка при чтении файла. Проверьте формат JSON.');
            }
        };
        reader.readAsText(file);
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
    }
};

window.setHeaderState = setHeaderState;
window.setHeaderPosition = setHeaderPosition;
window.setFooterState = setFooterState;
window.setFooterPosition = setFooterPosition;
window.restoreHeaderState = restoreHeaderState;
window.restoreFooterState = restoreFooterState;
window.exportSettings = exportSettings;
window.importSettings = importSettings;
window.downloadSettings = downloadSettings;
window.uploadSettings = uploadSettings;