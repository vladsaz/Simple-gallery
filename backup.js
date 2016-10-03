$(function () {
    var dataImages = [];

    $.ajax({
        type: "GET",
        url: "./src/js/images.json",
        error: function () {
            alert('smth went wrong');
        },
        success: function (data) {
            dataImages = JSON.parse(data);
            loadImages(dataImages);
        }
    });

    var currentImage = 0;
    var imageContainer = document.getElementsByClassName('container');
    var imageHolder = document.getElementsByClassName('img-holder');
    var exitButton = document.getElementsByClassName('exit');

    function loadImages(imgArr) {
        for (var key in imgArr) {
            var img = new Image();
            img.className = 'img-holder';
            img.setAttribute('id', imgArr[key]);
            img.setAttribute('name', key);
            img.src = imgArr[key];
            imageContainer[0].appendChild(img);
        }
    }

    function closeModal() {
        $('.modal').addClass('modal-close-animator');
        $('.modal').removeClass('modal-animator');

        $('.right-arrow').css('visibility', 'hidden');
        $('.left-arrow').css('visibility', 'hidden');
        $('.loader').css('visibility', 'hidden');
    }
    exitButton[0].addEventListener('click', closeModal, false);

    function animateTransition(arrow1, arrow2) {
        $('.right-arrow').css('visibility', 'visible');
        $('.left-arrow').css('visibility', 'visible');
        $('.modal').addClass('shrink');
        $('.modal-image').animate({
            opacity: '0'
        }, "slow");
        $(arrow1).animate({
            opacity: '0'
        }, "slow");
        $(arrow2).animate({
            opacity: '0'
        }, "slow");

        setTimeout(function () {
            $(arrow1).animate({
                opacity: '1'
            }, "slow");
            $(arrow2).animate({
                opacity: '1'
            }, "slow");
            $('.loader').css('visibility', 'hidden');
            $('.modal').removeClass('shrink');
        }, 3000);

        setTimeout(function () {

            $('.modal-image').attr('src', dataImages[currentImage]);
            $('.modal-image').animate({
                opacity: '1'
            }, "slow");
        }, 6100);
        $('.loader').css('visibility', 'visible');
    }

    function leftArrowFunction() {

        if (currentImage !== 0) {
            currentImage--;
            animateTransition('.left-arrow', '.right-arrow');
            if (currentImage === 0) {
                $('.right-arrow').css('visibility', 'visible');
                $('.left-arrow').css('visibility', 'hidden');
            }
        }
    }

    function rightArrowFunction() {
        if (currentImage !== dataImages.length - 1) {
            currentImage++;
            animateTransition('.right-arrow', '.left-arrow');
            if (currentImage === 9) {
                $('.right-arrow').css('visibility', 'hidden');
                $('.left-arrow').css('visibility', 'visible');
            }
        }
    }
    $('.arrow-container').on('click', '.left-arrow', leftArrowFunction);
    $('.arrow-container').on('click', '.right-arrow', rightArrowFunction);

    $('.img-holder').click(function () {
        $('.modal').removeClass('modal-close-animator');

        var id = $(this).prop('name');
        var slicedID = id.slice(6, 7);
        currentImage = id;

        if (currentImage === '0') {
            $('.right-arrow').css('visibility', 'visible');
            $('.left-arrow').css('visibility', 'hidden');
        } else if (currentImage === '9') {
            $('.right-arrow').css('visibility', 'hidden');
            $('.left-arrow').css('visibility', 'visible');
        } else {
            $('.right-arrow').css('visibility', 'visible');
            $('.left-arrow').css('visibility', 'visible');
        }

        $('.modal-image').attr('src', '');

        $('.modal').css('visibility', 'visible');

        $('.modal').addClass('modal-animator');

        setTimeout(function () {
            $('.modal-image').attr('src', dataImages[id]);
            $('.loader').css('visibility', 'hidden');
        }, 3000);

        $('.loader').css('visibility', 'visible');
    }).bind(this);
});
