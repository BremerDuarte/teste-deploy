$(document).ready(function () {

    // FIELD - MDC
    var textFields = document.querySelectorAll('.mdc-text-field');
    for (var i = 0; i < textFields.length; i++) {
        mdc.textField.MDCTextField.attachTo(textFields[i]);
    }
    
    // SELECT - MDC
    var select = document.querySelectorAll('.mdc-select');
    for (var i = 0; i < select.length; i++) {
        mdc.select.MDCSelect.attachTo(select[i]);
    }

    // BUTTON - MDC
    var buttons = document.querySelectorAll('.mdc-button');
    for (var i = 0; i < buttons.length; i++) {
        mdc.ripple.MDCRipple.attachTo(buttons[i]);
    }

    // TABLE - MDC
    var table = document.querySelectorAll('.mdc-data-table');
    for (var i = 0; i < table.length; i++) {
        mdc.ripple.MDCRipple.attachTo(table[i]);
    }

    // INCLUDE NAV
    $('nav.nav-main').load('include/nav.html',function () { 
        // FECHAR O MENU
        $('.nav-main').find('.toggleMobile').click(function(e){
            $('.container-main').toggleClass('menuOppened');
        });

        // SWIPE MENU
        var mc = new Hammer(document.querySelector('.nav-main'));
        mc.on("swipeleft", function(ev) {
            if($(window).width() < 768){
                $('.nav-main').find('.toggleMobile').trigger('click');
            }
        });

        // SUBMENU
        $('.toggle-submenu').click(function () {
            $(this).toggleClass('active').parent().next().stop().slideToggle('fast')
        });
    });

    // INCLUDE HEADER
    $('header').load('include/header.html',function () { 
        $('header').find('.toggle-menu').click(function(e){
            $('.container-main').toggleClass('menuOppened');
        });

        // TAMANHO DO MENU
        $('header').find('.toggle-size').click(function (e) { 
            $('.nav-main').toggleClass('min-size')
                          .find('.toggle-menu').removeClass('active').end()
                          .find('.submenu').hide();
        });
    });

    // INCLUDE FOOTER
    $('footer').load('include/footer.html');

});

$(window).resize(function () { 
    $('.container-main').removeClass('menuOppened');
});