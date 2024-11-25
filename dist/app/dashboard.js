
let dump_de_participaciones = document.getElementById("dump_de_participaciones")
let participaciones_compartment = document.getElementById("participacion_compartment")
let agregar_participaciones_button = document.getElementById("agregar_participacion")
let sumatoriasubtotales = document.querySelector("#sumatoriasubtotales")
let totales_compartment = document.querySelector("#totales")
let iva = document.querySelector("#montoiva")
let isr = document.querySelector("#montoisr")
let salariofijo = document.querySelector("#salariofijo")
let nombrecolaborador = document.querySelector("#nombrecola")
let emailcolaborador = document.querySelector("#emailcola")

let togglefactor = .75
export let salario = 0

export let nombrevalor = ""
export let emailvalor = ""

export let participacionesData = [];

nombrecolaborador.addEventListener("input",function(){
    nombrevalor = nombrecolaborador.value
})
emailcolaborador.addEventListener("input",function(){
    emailvalor = emailcolaborador.value
})

salariofijo.addEventListener("input",function(){
    let salarioint = parseInt(this.value) 
    salario = salarioint || 0
    calculartotal()    
})

//aqui es donde se escuchan los inputs de montos, cargo corpo y % de participación 
agregar_participaciones_button.addEventListener("click",function (){
    let newParticipacion = participaciones_compartment.content.cloneNode(true)
    let newmonto = newParticipacion.querySelector("[name='montoparticipacion']")
    let newporcentaje = newParticipacion.querySelector("[name='porcentaje_participacion']")
    let newsubtotal = newParticipacion.querySelector("#subtotal")
    let toggle = newParticipacion.querySelector("[name='togglecargo']")
    let proyecto = newParticipacion.querySelector("#nombreproyecto")

    proyecto.addEventListener("input",function(){
        participationEntry.proyecto = proyecto.value || "";
    })

    let participationEntry = {
        proyecto: "",
        subtotal: 0,
    };

    participacionesData.push(participationEntry);
    dump_de_participaciones.appendChild(newParticipacion)

    newmonto.addEventListener("input", function() {
        updateSubtotal(newmonto, newporcentaje, newsubtotal,participationEntry);
    });
    newporcentaje.addEventListener("input", function() {
        updateSubtotal(newmonto, newporcentaje, newsubtotal,participationEntry);
    });
    toggle.addEventListener("change", function() {
        togglefactor = this.checked ? 0.75 : 1 
        updateSubtotal(newmonto, newporcentaje, newsubtotal,participationEntry);
    });
    // aqui es donde se display el subtotal compartment
    totales_compartment.classList.remove("hidden")
})


// aqui se calcula el subtotal por participación
function updateSubtotal(montoElement, porcentajeElement, subtotalElement,participationEntry) {
    let monto = parseFloat(montoElement.value) || 0;
    let porcentaje = parseFloat(porcentajeElement.value) || 0;
    let subtotalcalculo = (monto * togglefactor * (porcentaje / 100)).toFixed(2);
    let subtotalcalculonumber = numeral(subtotalcalculo)
    let subtotalfinal = numeral(subtotalcalculonumber).format("0,") 
    participationEntry.subtotal = subtotalfinal
    subtotalElement.textContent = `$ ${subtotalfinal}`;
    calculartotal()
}

// aqui se calcula el subtotal final de las participaciones + el salario fijo y se agrega al DOM.
function calculartotal(){
    let grandSubTotal = 0 + salario
    // Loops en todos los subtotales de dump_de_participaciones
    dump_de_participaciones.querySelectorAll("#subtotal").forEach(subtotalElement => {
        let subtotalValue = parseInt(subtotalElement.textContent.replace(/[^0-9]+/g,"")) || 0;
        grandSubTotal += subtotalValue ;
        calculo(grandSubTotal)
    });
    // esto actualiza el sub total final
    sumatoriasubtotales.textContent = `$ ${numeral(grandSubTotal).format("0,")}`;
}


// esta funcion escucha el input del iva e isr y lo envia a calulateTotal para poder sacar el Total Final
function calculo (subtotal) {
    // IVA
    calculateTotal(subtotal,iva,isr)
    iva.addEventListener("input", function() {
        calculateTotal(subtotal,iva,isr);
    });
    // ISR
    calculateTotal(subtotal,iva,isr)
    isr.addEventListener("input", function() {
        calculateTotal(subtotal,iva,isr) ;
    });
}

// aqui  se calculan los totales y tambien se exportan para la impresión del estado de cuenta
export let ivavalor = 0
export let isrvalor = 0
export let totalFinal = 0
export let total = 0

function calculateTotal(totaledo,ivaelement,isrelement){
    let totalcompartment = document.querySelector("#total")
    total = totaledo
    ivavalor = ivaelement.value || 0
    isrvalor = isrelement.value || 0
    totalFinal = total - ivavalor - isrvalor
    totalcompartment.textContent = `$ ${numeral(totalFinal).format("0,")}`;    
};    

