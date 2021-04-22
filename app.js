const btnCategorias = document.getElementById('btn-categorias');
const btnBalance = document.getElementById('btn-balance');
const balance = document.getElementById('balance');
const categorias = document.getElementById('categorias');
const btnNuevaOperacion = document.getElementById('btn-agregaroperacion');
const btnAgregar = document.getElementById('btn-agregar');
const tipoBalance = document.getElementById('tipo-balance');
const categoriasSelect = document.getElementById('categorias-select');
const ordernarSelect = document.getElementById('ordernar-select');
const sectionReport = document.getElementById('reports-section');
const btnReportes = document.getElementById('btn-reportes');
const reportesVista = document.getElementById('reportes-vista');


const descripcion = document.getElementById('descripcion');
const monto = document.getElementById('monto');
const tipo = document.getElementById('tipo');
const categoria = document.getElementById('categoria');
const inputFecha = document.getElementById('input-fecha');
const balanceFecha = document.getElementById('balance-fecha');
const pintar = document.getElementById('pintar');


btnBalance.addEventListener('click', () => {
  balance.style.display = 'block'
  categorias.style.display = 'none'
  sectionReport.style.display = 'none'
})

btnCategorias.addEventListener('click', () => {
  categorias.style.display = 'block'
  balance.style.display = 'none'
  sectionReport.style.display = 'none'
})

btnReportes.addEventListener('click', () => {
  sectionReport.style.display = 'block'
  categorias.style.display = 'none'
  balance.style.display = 'none'
})

btnNuevaOperacion.addEventListener('click', () => {
  balance.style.display = 'none'
})

const day = new Date().getDate();
let month = new Date().getMonth() + 1;
const year = new Date().getFullYear();


inputFecha.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`
balanceFecha.value = `${year}-${month < 10 ? '0' + month: month}-${day < 10 ? '0' + day: day}`



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

operaciones = JSON.parse(localStorage.getItem('operaciones')) ?? operaciones
pintarOperaciones(operaciones)

// tipoBalance.addEventListener('change', () => {
//   const result = operaciones.filter(operacion => operacion.tipo === tipoBalance.value)
//   tipoBalance.value === 'Todo' ? pintarOperaciones(operaciones) : pintarOperaciones(result)
// })

// categoriasSelect.addEventListener('change', () => {
//  const result = operaciones.filter(operacion => operacion.categoria === categoriasSelect.value)
//  categoriasSelect.value === 'Todo' ? pintarOperaciones(operaciones) : pintarOperaciones(result)
// })


let newArr = [...operaciones]

const filtros = (e) => {
  let atr = ''
  if(e.target.id == 'tipo-balance'){
    newArr = [...operaciones]
    categoriasSelect.value = 'Todo'
    atr = 'tipo'
  } else {
    tipoBalance.value = 'Todo'
    atr = 'categoria'
  }
  newArr = newArr.filter(operacion => operacion[atr] === e.target.value)
  e.target.value === 'Todo' ? pintarOperaciones(operaciones) : pintarOperaciones(newArr)
}


balanceFecha.addEventListener('change', (e) => {
  const result = operaciones.filter(operacion => operacion.fecha === e.target.value)
  pintarOperaciones(result);
})

tipoBalance.addEventListener('change', (e) => filtros(e))
categoriasSelect.addEventListener('change', (e) => filtros(e))


ordernarSelect.addEventListener('change', () => {
  let newArr = [...operaciones]
  if(ordernarSelect.value === 'a-z'){
    newArr.sort((a,b) => a.descripcion > b.descripcion ? 1 : -1)
  }
  if(ordernarSelect.value === 'z-a'){
    newArr.sort((a,b) => a.descripcion < b.descripcion ? 1 : -1)
  }
  if(ordernarSelect.value === 'nuevo'){
    newArr.sort((a,b) => a.fecha < b.fecha ? 1 : -1)
  }
  if(ordernarSelect.value === 'viejo'){
    newArr.sort((a,b) => a.fecha > b.fecha ? 1 : -1)
  }
  if(ordernarSelect.value === 'caro'){
    newArr.sort((a,b) => a.monto < b.monto ? 1 : -1)
  }
  if(ordernarSelect.value === 'barato'){
    newArr.sort((a,b) => a.monto > b.monto ? 1 : -1)
  }
  pintarOperaciones(newArr);
})


const categoriasArr = ['Comida', 'Servicios', 'Salidas', 'Educación', 'Transporte', 'Trabajo']

// const result = categoriasArr.forEach(element => {
//   return operaciones.filter(operacion => operacion.categorias === element)
// })

const arreglo = [];
for (let index = 0; index < categoriasArr.length; index++) {
  const arrGasto = operaciones.filter(element => element.categoria === categoriasArr[index] && element.tipo === 'Gasto').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

  const arrGanancia = operaciones.filter(element => element.categoria === categoriasArr[index] && element.tipo === 'Ganancia').reduce((inicial, current) => Number(inicial) + Number(current.monto) ,0)

  arreglo.push({nombre: categoriasArr[index], ganancia: arrGanancia, gasto: arrGasto})
}


const result = Math.max(...arreglo.map(valor => valor.ganancia))
console.log(arreglo);


// reportesVista