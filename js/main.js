const productos = [
    {
        id: "airpods",
        titulo: "Airpods",
        imagen: "./img/auriculares.jpg",
        precio: 1000,
    },
    {
        id: "bicicleta",
        titulo: "Bicicleta",
        imagen: "./img/bicicleta.jpg",
        precio: 1000,
    },
    {
        id: "celular",
        titulo: "Celular",
        imagen: "./img/celular.jpg",
        precio: 1000,
    },
    {
        id: "computadora",
        titulo: "Computadora",
        imagen: "./img/computadora.jpg",
        precio: 1000,
    },
    {
        id: "tablet",
        titulo: "Tablet",
        imagen: "./img/tablet.jpg",
        precio: 1000,
    },
    {
        id: "televisor",
        titulo: "Televisor",
        imagen: "./img/televisor.jpg",
        precio: 1000,
    },
    {
        id: "tostadora",
        titulo: "Tostadora",
        imagen: "./img/tostadora.jpg",
        precio: 1000,
    }
];

const contenedorProductos = document.querySelector("#contenedorProductos");
const numerito = document.querySelector("#numerito");

function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="productoDetalles">
                        <h3 class="productoTitulo">${producto.titulo}</h3>
                        <p class="productoPrecio">Precio online: $${producto.precio}</p>
                        <button class="productoAgregar" id="${producto.id}">AGREGAR AL CARRITO</button>
                    </div>
        `;
        contenedorProductos.append(div);
    })
}

const carrito = [];
function agregarAlCarrito(e) {
    const idProducto = e.currentTarget.id;
    const productoEncontrado = productos.find(producto => producto.id === idProducto);
    if (carrito.some(producto => producto.id === idProducto)) {
        const index = carrito.findIndex(producto => producto.id === idProducto);
        carrito[index].cantidad++;
    } else {
        productoEncontrado.cantidad = 1;
        carrito.push(productoEncontrado);
    }
    actualizarCarrito();
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarCarrito() {
    const carritoContainer = document.querySelector("#carrito");
    carrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productoCarrito");
        div.innerHTML = `
        <img class="carritoProductoImagen" src="${producto.imagen}" alt="imagenAuriculares">
                        <div class="carritoProductoTitulo">
                            <small>Título</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carritoProductoCantidad">
                            <small>Cantidad</small>
                            <p>1</p> //hacer que cambie la cantidad//
                        </div>
                        <div class="carritoProductoPrecio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carritoProductoSubtotal">
                            <small>Subtotal</small>
                            <p>$1000</p>
                        </div>
                        <button class="carritoProductoEliminar"><i class="bi bi-trash"></i></button>
        `;
        carritoContainer.append(div);
    });
}

function agregarProductos() {
    let botonesAgregar = document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); //no funciona el boton agregar al carrito
    });
}

cargarProductos();
agregarProductos();

function actualizarNumerito(){
    let nuevoNumerito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

