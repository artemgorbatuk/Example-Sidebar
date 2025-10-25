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
            mainElement.addEventListener('scroll', handleMainScroll);
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

window.setHeaderState = setHeaderState;
window.setHeaderPosition = setHeaderPosition;
window.setFooterState = setFooterState;
window.setFooterPosition = setFooterPosition;
window.restoreHeaderState = restoreHeaderState;
window.restoreFooterState = restoreFooterState;