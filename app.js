const btnCategorias = document.getElementById('btn-categorias');
const btnBalance = document.getElementById('btn-balance');

const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const btnNuevaOperacion = document.getElementById('btn-agregaroperacion');
const inputFecha = document.getElementById('input-fecha');


btnBalance.addEventListener('click', () => {
  categorias.style.display = 'none'
  balance.style.display = 'block'
})

btnCategorias.addEventListener('click', () => {
  categorias.style.display = 'block'
  balance.style.display = 'none'
})

btnNuevaOperacion.addEventListener('click', () => {
  balance.style.display = 'none'
})

const day = new Date().getDate();
let month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

console.log(new Date().getDate());
console.log(new Date().getMonth() + 1);
console.log(new Date().getFullYear());

console.log(new Date().getMonth() < 10);

inputFecha.value = `${year}-${month < 10 ? '0' + month: month}-${day}`
// yyyy-MM-dd
// yyyy-M-dd


