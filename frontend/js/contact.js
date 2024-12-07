burger = document.querySelector('.toggle-sidebar-btn')
sideBar = document.querySelector('.sidebar')
mainContent = document.querySelector('.main')


burger.addEventListener('click', () => {
    sideBar.classList.toggle('w-class-resp');
    mainContent.classList.toggle('m-class-resp');
    
})