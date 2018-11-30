$(document).ready(function() {
	const aboutGalleryRef = $('.about-gallery .slides-container');
	const aboutGalleryImgs = $('.about-gallery .slides-container .slide img');
	const sliderButton = $('.about-gallery button.slide-next');
	const bigImg = $('.about-pic img');
	aboutGalleryRef.slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 767.98,
				settings: {
					slidesToShow: 1,
					centerMode: true
				}
			}
		]
	});
	function handleSlickChange(img) {
		bigImg.attr('src', $(img).attr('src'))
	}
	aboutGalleryRef.on('beforeChange', function(event, slick, prevSlide, currentSlide){
		currentSlide = currentSlide ? currentSlide : aboutGalleryImgs.length;
		handleSlickChange(aboutGalleryImgs[currentSlide - 1]);
	});
	sliderButton.on('click', function() {
		aboutGalleryRef.slick('slickNext');
	});

});

$(document).ready(function () {
    $('input[name="phone"]').inputmask("+9 (999) 999 99 99");
    var logoRef = $('.navbar-brand img');
    var srcs = ['./assets/img/logo.png', './assets/img/logo_ru.png'];
    var srci = 0;
    setInterval(function() {
        srci+=1;
        srci%=2;
        logoRef.attr('src', srcs[srci]);
    }, 3000);
    $('.callbackForm, #callbackForm').submit(function(e) {
        e.preventDefault();
        var phoneElement    = this.elements.phone;
        var markElement     = this.elements.mark;
        var vinElement      = this.elements.vin;
        var describeElement = this.elements.describe;

        var phone    = phoneElement.value.trim();
        var mark     = markElement.value.trim();
        var vin      = vinElement.value.trim();
        var describe = describeElement.value.trim();
        var valid = true;
        if (describe === '') {
	        describeElement.classList.add('no-valid');
            valid = false;
        } else {
	        describeElement.classList.remove('no-valid');
        }
        if (phone.indexOf('_') !== -1) {
            phoneElement.classList.add('no-valid');
            valid = false;
        } else {
            phoneElement.classList.remove('no-valid');
        }
        if (!valid) return;

        sendMessage(this, {phone: phone, mark: mark, vin: vin, describe: describe});

    });

    var sendMessage = function(form, options) {
        var message = '💡Новая заявка от ' + options.phone;
        message += '\n    Марка: ' + options.mark;
        message += '\n    VIN: ' + options.vin;
        message += '\n    Запчасти: ' + options.describe;

        $('.ajax-status').html('Отправляем <span class="icon-spinner spin-me" style="display: inline-block;"></span>');

        $(form).attr('disabled', true);
        $(form.elements).attr('disabled', true);

        var success = function (res) {
	        console.log(res);
	        $('.ajax-status').html('Отправлено <span class="icon-checkmark" style="display: inline-block;"></span>');
	        $('#successModal').modal('show');
	        setTimeout(function() {
		        $('#successModal').modal('hide');
            }, 3000);
        };

        $.post('mail.php', {message: message, subject: 'Новая заявка от ' + options.phone }, success);
    }
});


