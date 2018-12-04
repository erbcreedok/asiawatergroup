$(document).ready(function() {
	var aboutGalleryRef = $('.about-gallery .slides-container');
	var aboutGalleryImgs = $('.about-gallery .slides-container .slide img');
	var sliderButton = $('.about-gallery button.slide-next');
	var bigImg = $('.about-pic img');
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

	$("button.btn[data-naming]").click(function () {
		var n = this.dataset.naming;
		if(n) {
			$("#button").val(n);
		}
	});

	$('.callbackForm, #callbackForm').submit(function(e) {
		e.preventDefault();
		var nameElement = this.elements.name;
		var phoneElement = this.elements.phone;
		var extraElement = this.elements.extra;
		var buttonElement = this.elements.button;
		var name = nameElement.value.trim();
		var phone = phoneElement.value.trim();
		var extra = extraElement.value.trim();
		var button = buttonElement.value.trim();
		var valid = true;
		if (name === '') {
			nameElement.classList.add('no-valid');
			valid = false;
		} else {
			nameElement.classList.remove('no-valid');
		}
		if (phone.indexOf('_') !== -1) {
			phoneElement.classList.add('no-valid');
			valid = false;
		} else {
			phoneElement.classList.remove('no-valid');
		}
		if (!valid) return;

		sendMessage(this, name, phone, extra, button);

	});

	var sendMessage = function(form, name, phone, extra, button) {
		var message = '💡Новая заявка от ' + name;
		message += '\n    <i> Телефон: </i> ' + phone;
		message += '\n    <i> Дополнительно: </i> ' + extra;
		message += '\n    <i> Нажатая кнопка: </i> ' + button;

		$('.ajax-status').html('Отправляем <span class="icon-spinner spin-me" style="display: inline-block;"></span>');

		$(form).attr('disabled', true);
		$(form.elements).attr('disabled', true);

        var success = function (res) {
	        console.log(res);
	        $('.ajax-status').html('Отправлено <span class="icon-checkmark" style="display: inline-block;"></span>');
	        $('.modal-form').fadeOut(function () {
		        $('.modal-thanks').fadeIn(function () {
			        setTimeout(function () {
				        $('#callbackModal').modal('hide');
			        },3000)
		        });
	        });
        };

        var sendMail = function() {
	        $.post('mail.php', {message: message, subject: 'Новая заявка от ' + name }, success);
        };

		sendMail();
    }
});


