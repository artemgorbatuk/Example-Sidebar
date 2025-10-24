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

// ===== ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ ТЕМОЙ =====

/**
 * Устанавливает тему оформления
 * @param {string} theme - 'light', 'dark' или 'auto'
 */
function setTheme(theme) {
    const html = document.documentElement;
    
    // Удаляем все предыдущие атрибуты темы
    html.removeAttribute('data-theme');
    
    if (theme === 'auto') {
        // Для автоматической темы полагаемся на CSS media query
        // Не устанавливаем data-theme, чтобы сработал @media (prefers-color-scheme: dark)
        console.log('Автоматическая тема: полагаемся на системные настройки');
        console.log('prefers-color-scheme:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } else {
        // Устанавливаем конкретную тему
        html.setAttribute('data-theme', theme);
        console.log(`Принудительная тема: ${theme}`);
    }
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', theme);
    
    console.log(`Тема изменена на: ${theme}`);
}

/**
 * Загружает сохраненную тему при загрузке страницы
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Устанавливаем сохраненную тему
    setTheme(savedTheme);
    
    // Обновляем радио-кнопки в конфигураторе
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        if (radio.value === savedTheme) {
            radio.checked = true;
        }
    });
}

/**
 * Инициализация темы при загрузке страницы
 */
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    // Обновляем линии при загрузке
    if (typeof updateConfiguratorLines === 'function') {
        updateConfiguratorLines();
    }
});
