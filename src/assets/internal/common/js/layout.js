const main = document.querySelector('main');
let toggleheader, togglefooter;
const scrollbarWidth = getScrollbarWidth();

function getScrollbarWidth() {
    // ������� ��������� �������
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // ������������� �������� ���������
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    // ������� ���������� �������
    var inner = document.createElement('div');
    outer.appendChild(inner);

    // ��������� ������� ����� ������ ������� �������� �������� � ������� ����������� ��������
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // ������� ��������� �������
    outer.parentNode.removeChild(outer);

    return scrollbarWidth + 'px';
}

window.addEventListener('resize', setFooterPosition);

document.addEventListener('DOMContentLoaded', function () {  
    // Инициализируем переключатели после загрузки DOM
    toggleheader = $('.toggle-header');
    togglefooter = $('.toggle-footer');
    
    // Добавляем обработчики событий
    if (toggleheader && toggleheader.length > 0) {
        toggleheader.on('change', function() {
            setHeaderState();
            setHeaderPosition();
        });
    }
    
    if (togglefooter && togglefooter.length > 0) {
        togglefooter.on('change', function() {
            setFooterState();
            setFooterPosition();
        });
    }
    
    restoreHeaderState();
    setHeaderPosition();
    restoreFooterState();
    setFooterPosition();
});

main && main.addEventListener('scroll', function () {
    const footerState = togglefooter.is(':checked')

    if (footerState) return;

    let mainHeight = main.clientHeight;
    let contentHeight = main.scrollHeight;
    let scrollTop = main.scrollTop;
    if (footerState && (contentHeight - (scrollTop + mainHeight)) <= 100) {
        $('.footer-right').css('padding-right', '');
    } else {
        $('.footer-right').css('padding-right', '80px');
    }
});

function setFooterState() {
    var footerState = togglefooter.is(':checked');
    // �������� ��������
    localStorage.setItem('FooterState', `${footerState}`);
}

function restoreFooterState() {
    // �������� ����
    if (localStorage.getItem('FooterState')) {
        var cachedFooterState = localStorage.getItem('FooterState') === 'true';
        togglefooter.prop('checked', cachedFooterState);
    }
}

function setFooterPosition() {
    $('content').css('margin-bottom', ''); // ����� ������������ ������ contentHeight
    const contentHeight = $('content').outerHeight(true);
    const headerHeight = $('header').outerHeight(true);
    const footerHeight = $('footer').outerHeight(true);
    const windowHeight = $(window).outerHeight(true);
    
    const contentSizeSmall = contentHeight < windowHeight - headerHeight - footerHeight;

    const footerState = (contentSizeSmall)
        ? true :
        togglefooter.is(':checked');

    if (footerState) {
        // ����� ������� ����� 2rem ������ ��� main ����� padding 1rem ������ � �����
        $('footer').css({ position: 'fixed' });
        $('.footer-right').css('padding-right', '80px');
        $('content').css('margin-bottom', footerHeight + 'px');       
    } else {
        $('footer').css({ position: 'static', bottom: '', width: '100%' });
        $('.footer-right').css('padding-right', '');
        $('content').css('margin-bottom', '');
    }
}


function setHeaderState() {
    var headerState = toggleheader.is(':checked');
    // Сохраняем состояние
    localStorage.setItem('HeaderState', `${headerState}`);
}

function restoreHeaderState() {
    // Восстанавливаем состояние
    if (localStorage.getItem('HeaderState')) {
        var cachedHeaderState = localStorage.getItem('HeaderState') === 'true';
        toggleheader.prop('checked', cachedHeaderState);
    }
}

function setHeaderPosition() {
    console.log('setHeaderPosition called');
    if (!toggleheader || toggleheader.length === 0) {
        console.error('toggleheader not found');
        return;
    }
    
    const headerState = toggleheader.is(':checked');
    console.log('Header state:', headerState);
    
    if (headerState) {
        console.log('Setting header to fixed');
        $('header').css({ 
            position: 'fixed'
        });
        $('content').css('margin-top', $('header').outerHeight(true) + 'px');
    } else {
        console.log('Setting header to static');
        $('header').css({ 
            position: 'static', 
            top: '', 
            width: '100%',
            zIndex: '100'
        });
        $('content').css('margin-top', '');
    }
}