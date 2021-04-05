const btnCategorias = document.getElementById('btn-categorias');
const btnBalance = document.getElementById('btn-balance');
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const btnNuevaOperacion = document.getElementById('btn-agregaroperacion');
const btnAgregar = document.getElementById('btn-agregar');


const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const tipo = document.getElementById('tipo');
const categoria = document.getElementById('categoria');
const inputFecha = document.getElementById('input-fecha');
const pintar = document.getElementById('pintar');


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


inputFecha.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`




let operaciones = [];

const pintarOperaciones = (operaciones) => {
  pintar.innerHTML = '';
  for (let index = 0; index < operaciones.length; index++) {
    const caja =
    `<div id=${operaciones[index].id}>
      <span>${operaciones[index].descripcion}</span>
      <span>${operaciones[index].monto}</span>
      <span>${operaciones[index].tipo}</span>
      <span>${operaciones[index].categoria}</span>
      <span>${operaciones[index].fecha}</span>
      <a>Editar</a>
      <a>Eliminar</a>
    </div>`
    pintar.insertAdjacentHTML('beforeend', caja)
  }
}


btnAgregar.addEventListener('click', () => {
  // operaciones = JSON.parse(localStorage.getItem('operaciones'))
  const nuevaOperacion = {
    id: uuid.v4(),
    descripcion: descripcion.value,
    monto: monto.value,
    tipo: tipo.value,
    categoria: categoria.value,
    fecha: inputFecha.value
  }
  operaciones.push(nuevaOperacion)
  localStorage.setItem('operaciones', JSON.stringify(operaciones))
  operacionesLocalStorage = JSON.parse(localStorage.getItem('operaciones'))
  pintarOperaciones(operacionesLocalStorage)
})

operaciones = JSON.parse(localStorage.getItem('operaciones'))
pintarOperaciones(operaciones)

