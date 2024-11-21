

let togglefactor = .75


let dump_de_participaciones = document.getElementById("dump_de_participaciones")
let participaciones_compartment = document.getElementById("participacion_compartment")
let agregar_participaciones_button = document.getElementById("agregar_participacion")
let sumatoriasubtotales = document.querySelector("#sumatoriasubtotales")
let totales_compartment = document.querySelector("#totales")
let iva = document.querySelector("#montoiva")
let isr = document.querySelector("#montoisr")
let salariofijo = document.querySelector("#salariofijo")

let nombrecolaborador = document.querySelector("[name='nombrecola']")
let emailcolaborador = document.querySelector("[name='emailcola']")

let nombrevalor = ""
let emailvalor = ""
export let participacionesData = [];


nombrecolaborador.addEventListener("input",function(){
    nombrevalor = nombrecolaborador.value
})
emailcolaborador.addEventListener("input",function(){
    emailvalor = emailcolaborador.value
})

export function colaInfo(){
    return {
        nombre : nombrevalor,
        email : emailvalor}
}
// cuando se da click a agregar

let salario = 0

salariofijo.addEventListener("input",function(){
    let salarioint = parseInt(this.value) 
    salario = salarioint || 0
    calculartotal()    
    
})

export function getSalario() {
    return salario ;
}

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






// export function dump_participaciones (){
//     return {
//         proyectonombre : proyecto_EDO,
//         subtotalproyecto : subtotal_EDO
        
//     }
// }

// sumatoria de subtotales
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

    // calculateGrandTotal()
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


// esta funcion envia el calculo para realizar el total
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

// funcion para print el total
let ivavalor = 0
let isrvalor = 0
let totalFinal = 0
let total = 0

function calculateTotal(totaledo,ivaelement,isrelement){
    let totalcompartment = document.querySelector("#total")
    total = totaledo
    ivavalor = ivaelement.value || 0
    isrvalor = isrelement.value || 0
    totalFinal = total - ivavalor - isrvalor
    totalcompartment.textContent = `$ ${numeral(totalFinal).format("0,")}`;
    
};    

export function totales(){
    return{
        iva : ivavalor,
        isr : isrvalor,
        subtotal : total,
        total : totalFinal,
        
    }
}

    

        
    
    
    
    


