 /* valido el moodo de envio */
 let boton;
 let boton1;

 function mostrarInput(){
    document.getElementById('delivery').style.display = 'block';
    document.getElementById('boton1').style.background = '#0099ff'
    document.getElementById('boton').style.background = 'white'
    document.getElementById('boton').style.color = 'black'
    document.getElementById('boton1').style.color = 'white'
    boton = true;
   
}

function cambiarColor(){
    document.getElementById('delivery').style.display = 'none';
    document.getElementById('boton').style.background = ' #0099ff';
    document.getElementById('boton1').style.background = 'white';
    document.getElementById('boton').style.color = 'white'
    document.getElementById('boton1').style.color = 'black'
    boton = false;
    
}

function colorButton(){
    document.getElementById('boton2').style.background = '#0099ff';
    document.getElementById('boton2').style.color = 'white';

    document.getElementById('boton3').style.background = 'white';
    document.getElementById('boton3').style.color = 'black';

    boton1 = true;
}

function colorButton1(){
    document.getElementById('boton3').style.background = '#0099ff';
    document.getElementById('boton3').style.color = 'white';

    document.getElementById('boton2').style.background = 'white';
    document.getElementById('boton2').style.color = 'black';

    boton1 = false;
}


document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
    let total = 0;
    let telefono = "3704416795";/*variable que contiene el numero de telefono a donde se enviaran los mensajes*/
    let cliente =  document.querySelector("#cliente").value;
    cliente = cliente.toUpperCase();
    let telefono_cliente = document.querySelector("#telefono").value;
    let direccion = document.querySelector('#direccion').value;
    direccion = direccion.toUpperCase();
    let ObtenerCarrito = JSON.parse(localStorage.getItem("carrito"));
    let resp = document.querySelector("#respuesta");
    

    resp.classList.remove("fail");
    resp.classList.remove("send"); 
    /* armo la url para pasarle a la api de wsp */
    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=*_BOOM BURGER_*%0A*Hola, te paso el resumen de mi pedido:*%0A%0A%0A*NOMBRE:* ${cliente}%0A*TELEFONO:* ${telefono_cliente}%0A%0A`;
    /* SI SELECCIONA EL BOTON DE PAGAR EN EFECTIVO  O CON MP Y LO AGREGO A LA URL DE WSP*/
    if(boton1){
        url += `%0A*FORMA DE PAGO: ABONO EN EFECTIVO*%0A%0A`;
    }else{
        url += `%0A*FORMA DE PAGO: ABONO CON MERCADO PAGO*%0A%0A`;
    }
    /* SI SELECCIONA EL BOTON DE TIPO DE ENTREGA Y LO AGREGO A LA URL DE WSP */
    if(boton){
        url += `%0A*TIPO DE ENTREGA: Delivery*%0A%0A*MI DIRECCION ES:* ${direccion}%0A%0A`;
    }else{
        url +=  `%0A*TIPO DE ENTREGA: RETIRO EN PUERTA*%0A`;
    }

    url += `%0A%0A*MI PEDIDO ES:*%0A`;

    /* RECORRO EL CARRITO PARA PODES CALCULAR EL TOTAL, Y PODES MOSTRAR EN EL MENSAJE LOS PRODUCTOS */
    ObtenerCarrito.map((producto) => {
        total += producto.precio * producto.cantidad;
        producto.nombre = producto.nombre.replace('+', '%2B');/* remplaza el signo + por  %2B que es la codificacion */
        url += `${producto.cantidad}x ${producto.nombre}: $${producto.precio}%0A`;
    })

    url += `%0A%0A*TOTAL* $${total}%0A`;
    url += `¡Espero tu respuesta para confirmar mi pedido!`;


    /* VALIDO EL FORMULARIO PARA QUE NO QUEDE INPUTS SIN COMPLETAR */
    if (boton && direccion === "" || cliente === "" || telefono_cliente === "") {
        resp.classList.add("fail");
        resp.innerHTML = `Faltan algunos datos, ${cliente}`;
        return false;
    }
    
    resp.classList.remove("fail");
    resp.classList.add("send");
    resp.innerHTML = `¡Se ha enviado tu pedido!, ${cliente}`;

  
    window.open(url);/* ENVIO LA URL A LA API DE WSP */
    localStorage.clear(); /* LIMPIO EL LOCALSTORAGE CUANDO SE ENVIA EL MENSAJE */

  });