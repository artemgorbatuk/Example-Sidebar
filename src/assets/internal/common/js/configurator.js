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
