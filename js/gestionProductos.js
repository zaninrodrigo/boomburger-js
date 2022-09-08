class gestionProductos{

    iniciar(){
        
         fetch(url)
            .then( respuesta => respuesta.json())
            .then( resultado => {
    
                productos     = resultado.productos;
                console.log(productos)
    
    
             this.cargarProductos( productos ); 
            
            });
       
    }


    cargarProductos(productos){
      
        const divProductos = document.querySelector("#productos");
        divProductos.innerHTML = "";

        const divHamPapas = document.querySelector("#hamburPapas");
        divHamPapas.innerHTML = "";

        const divPapas = document.querySelector("#papas");
        divPapas.innerHTML = "";  

        if (productos.length == 1){


        }else{

            productos.forEach((producto) => {
                if(producto.destacado == 1){
                    let prod = document.createElement("div");
                    prod.setAttribute("id","row_"+producto.id);
                    
                    prod.innerHTML = `
                    <a href="javascript:addCarrito(${producto.id})" class="input agregar-carrito" data-id="1" style="">
                        <div class="menu-item">
                            <div class="menu-text">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                                <strong>$${producto.precio}</strong>
                            </div>
                            <div class="menu-img">
                                <img src="${producto.img}" alt="Image" style="padding: 5px 0px">
                            </div>
                        </div>
                    </a>`;
                
                divProductos.appendChild(prod)

                }else if(producto.destacado == 2){
                    let prod = document.createElement("div");
                    prod.setAttribute("id","row_"+producto.id);

                    prod.innerHTML = `
                    <a href="javascript:addCarrito(${producto.id})" class="input agregar-carrito" data-id="1" style="">
                        <div class="menu-item">
                            <div class="menu-text">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                                <strong>$${producto.precio}</strong>
                            </div>
                            <div class="menu-img">
                                <img src="${producto.img}" alt="Image" style="padding: 5px 0px">
                            </div>
                        </div>
                    </a>`;
                 
                divHamPapas.appendChild(prod)
                }else if(producto.destacado == 3){
                    let prod = document.createElement("div");
                    prod.setAttribute("id","row_"+producto.id);
                    
                    prod.innerHTML = ` 
                    <a href="javascript:addCarrito(${producto.id})" class="input agregar-carrito" data-id="1" style="">
                        <div class="menu-item">
                            <div class="menu-text">
                                <h3>${producto.nombre}</h3>
                                <p>${producto.descripcion}</p>
                                <strong>$${producto.precio}</strong>
                            </div>
                            <div class="menu-img">
                                <img src="${producto.img}" alt="Image" style="padding: 5px 0px">
                            </div>
                        </div>
                    </a>`;
                divPapas.appendChild(prod)
                } 
            });
        }

        this.actualizarCarrito()
    }


    /* pregunto si existe ese producto, si no existe lo pusheo al array carrito */
    addCart(infoProducto){

        const existe = carrito.some(producto => producto.id === infoProducto.id )

        if(existe){
            Toastify({
                text: "Este producto ya se encuentra en el carrito",
                duration: 2000,
                gravity: 'top',

            }).showToast();
        }else{
            carrito.push(infoProducto);

            Toastify({
                text: "¡Se agrego a su carrito!",
                 duration: 2000,
                 gravity: 'top'

                }).showToast();
        }

     
 
        this.mostrarCarrito();
        this.guardarCarrito();
        this.actualizarContador();
    }

    mostrarCarrito(){
        let detalleCarrito = document.querySelector('#idCarrito');
        let detalleTotal = document.querySelector('#idTotal');

        detalleCarrito.innerHTML = "";
        detalleTotal.innerHTML = "";

        let total = 0;
        let subtotal = 0;

        carrito.forEach((productos) =>{

            const tr = document.createElement('tr');
            tr.classList.add('tr');
            total += parseInt(productos.precio * productos.cantidad);
            subtotal = parseInt(productos.precio * productos.cantidad);
                
                    tr.innerHTML = ` 
                        <tr>
                            <td style="width:200px;">${productos.nombre}</td>
                            <td>
                                ${productos.cantidad}  
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col">
                                        <button class="fa fa-plus inner-element bubble-element clickable-element" style=" text-align: center; background: none; border: none; color: rgb(18, 137, 128); font-size: 18px; border-radius: 4px; cursor: pointer; width: 18px; left: 0px;" onclick="sumarProducto(${productos.id})">
                                    </div>
                                    <div class="col">
                                        <button class="fa fa-minus inner-element bubble-element clickable-element" style="text-align: center; background: none; border: none; color: rgb(18, 137, 128); font-size: 18px; border-radius: 4px; cursor: pointer; width: 18px; left: 0px;" onclick="restarProducto(${productos.id})">
                                    </div>
                                </div>
                            </td>
                            <td>$${subtotal}</td>
                            <td><button type="button" class="btn-close" aria-label="Close" onclick="borrarProducto(${productos.id})"></button>
                        </tr>`
                
                detalleCarrito.appendChild(tr);
            })

            let row  = document.createElement('div');
            row.classList.add('row'); 

            if(carrito.length === 0){
                
                row.innerHTML = `
                 <div class="container">
                    <div class="row">
                        <p style="color:black; padding:0px 10px;">El carrito se encuentra vacio</p>
                    </div>
                 </div>
                `
            }else{
                row.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col" style="color: black;">
                        Total a pagar:
                        </div>
                        <div class="col" style="color: black;">
                        <b> $${total}</b>
                        </div>
                    </div>
                </div>
                <br><br>
                <button type="button" class="btn btn-primary btn-lg justify-content-md-end"> <a href="./carrito.html" class="button u-full-width">Confirmar Pedido</a></button>`;

                }
          //agrego el HTML del carrito en el tbody
         detalleTotal.appendChild(row);

        }



       //Contabilizo las cantidad de productos
        contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach(( productos ) => {

            contadorProductos += parseInt(productos.cantidad);
        })

        return contadorProductos;
     }


        //actualiza el carrito
        actualizarCarrito(){

            this.actualizarContador();
            this.mostrarCarrito();
            this.guardarCarrito();
   
        }

        //actualizar contador del carrito
        actualizarContador() { 

            let totalArticulos = this.contarProductos();
            let countCarrito = document.querySelector('#badgeCarrito');
            // Actualizar contador del carrito
            countCarrito.innerHTML = totalArticulos;
    
        }

        
        borrarProducto(id){  

            swal.fire({
                title: '"Desea eliminar este producto ?"',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminarlo',
                cancelButtonText: `Cancelar`,
              }).then((result) => {
                
                if (result.isConfirmed) 
                {
                    carrito = carrito.filter( producto => producto.id != id);
                    this.actualizarCarrito();
    
                }            
              })    

        }
            
        
        //SUMO LA CANTIDAD DE PRODUCTOS A PARTIR DEL BOTON AUMENTAR
        sumarProducto(id){

            carrito.forEach(producto =>{
                if(producto.id ===id){
                    producto.cantidad++;  
                }

            })

            this.actualizarCarrito();
        }

        //RESTO LA CANTIDAD DE PRODUCTOS A PARTIR DEL BOTON RESTAR
        restarProducto(id){

            carrito.forEach(producto =>{
                if(producto.id === id){
                    if(producto.cantidad > 1){
                        producto.cantidad--;
                    }
                }
            })
            this.actualizarCarrito();
        }

        guardarCarrito(){
            localStorage.setItem('carrito', JSON.stringify(carrito), 60);
        }
        /* OBTENGO LOS PRODUCTOS PARA MOSTRAR*/
        getProductos(){
            return productos;
        }

}

