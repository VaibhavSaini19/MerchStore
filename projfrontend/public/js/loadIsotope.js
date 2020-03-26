
const loadIsotope = () => {
    setTimeout(() => {
        let $btns = $('.project-area .button-group button');
        $btns.click(e => {
            $('.project-area .button-group button').removeClass('active');
            e.target.classList.add('active');

            let selector = $(e.target).attr('data-filter');
            $('.project-area .grid').isotope({
                filter: selector
            });

            return false;
        })

        $('.project-area .button-group #btn1').trigger('click'); 
        console.log("Isotope filter loaded");
    }, 1000);
};
$(document).ready(loadIsotope());

window.addEventListener('click', function(){
    loadIsotope();
})

