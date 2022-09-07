let carrito   =[];
let productos =[];
let gestor;

const url = './js/db.json';

//evento cuando se carga la pagina
document.addEventListener('DOMContentLoaded',() =>{

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    gestor = new gestionProductos();
    gestor.iniciar();
})


//Funcion para agregar al carrito un articulo
function addCarrito(id){
    
    let productos = gestor.getProductos();
    let producto = productos.filter(prod => prod.id == id);

    

    if(producto && producto.length > 0){
        producto = producto[0];
        let precio = producto.precio;
        let nombre = producto.nombre;



        let productoCarrito = new Producto(
            id,
            nombre,
            precio
        );

        gestor.addCart(productoCarrito);
    }


}

//funcion para eliminar un producto
function borrarProducto(id){

    gestor.borrarProducto(id);

}

function sumarProducto(id){

    gestor.sumarProducto(id);

}

function restarProducto(id){

    gestor.restarProducto(id);

}
