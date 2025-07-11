let $rules = document.getElementById('rules')
let $modal = document.getElementById('modal')
let $modalExit = document.getElementById('modalExit')

$rules.addEventListener('click', () => {
    $modal.style.display = 'flex';
})

$modalExit.addEventListener('click', () =>{
    $modal.style.display = 'none';
})