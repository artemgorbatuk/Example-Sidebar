/**
 * Модуль управления конфигуратором
 * @module ConfiguratorManager
 */

let configuratorWindow, configuratorButtonShow, configuratorButtonClose;

/**
 * Инициализация конфигуратора
 */
const initConfigurator = () => {
    try {
        configuratorWindow = document.querySelector('.configurator-window');
        configuratorButtonShow = document.querySelector('.configurator-button-show');
        configuratorButtonClose = document.querySelector('.configurator-button-close');

        if (configuratorButtonShow) {
            configuratorButtonShow.addEventListener('click', toggleConfigurator);
        }

        if (configuratorButtonClose) {
            configuratorButtonClose.addEventListener('click', closeConfigurator);
        }

        loadTheme();
        
        if (window.updateConfiguratorLines) {
            window.updateConfiguratorLines();
        }
    } catch (error) {
        console.error('Ошибка при инициализации конфигуратора:', error);
    }
};

/**
 * Переключает видимость конфигуратора
 */
const toggleConfigurator = () => {
    try {
        if (configuratorWindow) {
            configuratorWindow.classList.toggle('show');
        }
    } catch (error) {
        console.error('Ошибка при переключении конфигуратора:', error);
    }
};

/**
 * Закрывает конфигуратор
 */
const closeConfigurator = () => {
    try {
        if (configuratorWindow) {
            configuratorWindow.classList.remove('show');
        }
    } catch (error) {
        console.error('Ошибка при закрытии конфигуратора:', error);
    }
};

/**
 * Устанавливает тему оформления
 * @param {string} theme - 'light', 'dark' или 'auto'
 */
const setTheme = (theme) => {
    try {
        const html = document.documentElement;
        
        html.removeAttribute('data-theme');
        
        if (theme === 'auto') {
            
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            html.setAttribute('data-theme', theme);
        }
        
        localStorage.setItem('selectedTheme', theme);
        
        updateThemeRadioButtons(theme);
        
        if (window.updateConfiguratorLines) {
            window.updateConfiguratorLines();
        }
    } catch (error) {
        console.error('Ошибка при установке темы:', error);
    }
};

/**
 * Загружает сохраненную тему
 */
const loadTheme = () => {
    try {
        const savedTheme = localStorage.getItem('selectedTheme') || 'light';
        setTheme(savedTheme);
    } catch (error) {
        console.error('Ошибка при загрузке темы:', error);
    }
};

/**
 * Обновляет радиокнопки темы
 * @param {string} theme - Текущая тема
 */
const updateThemeRadioButtons = (theme) => {
    try {
        const radioButtons = document.querySelectorAll('input[name="theme"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.value === theme;
        });
    } catch (error) {
        console.error('Ошибка при обновлении радиокнопок темы:', error);
    }
};



document.addEventListener('DOMContentLoaded', initConfigurator);

window.setTheme = setTheme;