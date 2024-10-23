
//scroll to different main sections - people places things etc..
const jqueryScroll = (location, time, offset = 0) => {
    $('html, body').animate({ scrollTop: $(location).offset().top - offset }, time);
}

document.querySelector('#places-link').addEventListener('click', (e) => {
    e.preventDefault()
    jqueryScroll('#places-section', 1000, 150)
})
document.querySelector('#ideas-link').addEventListener('click', (e) => {
    e.preventDefault()
    jqueryScroll('#ideas-section', 1000, 150)
})

