const btnCategorias = document.getElementById('btn-categorias');
const btnBalance = document.getElementById('btn-balance');

const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');

btnBalance.addEventListener('click', () => {
  categorias.style.display = 'none'
  balance.style.display = 'block'
})

btnCategorias.addEventListener('click', () => {
  categorias.style.display = 'block'
  balance.style.display = 'none'
})