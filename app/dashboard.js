
document.addEventListener("DOMContentLoaded", function() {

    togglefactor = .75

    let dump_de_participaciones = document.getElementById("dump_de_participaciones")
    let participaciones_compartment = document.getElementById("participacion_compartment")
    let agregar_participaciones_button = document.getElementById("agregar_participacion")
    let sumatoriasubtotales = document.querySelector("#sumatoriasubtotales")
    let totales_compartment = document.querySelector("#totales")
    let iva = document.querySelector("#montoiva")
    let isr = document.querySelector("#montoisr")

    // cuando se da click a agregar

    agregar_participaciones_button.addEventListener("click",function(){

        let newParticipacion = participaciones_compartment.content.cloneNode(true)
        let newmonto = newParticipacion.querySelector("[name='montoparticipacion']")
        let newporcentaje = newParticipacion.querySelector("[name='porcentaje_participacion']")
        let newsubtotal = newParticipacion.querySelector("#subtotal")
        let toggle = newParticipacion.querySelector("[name='togglecargo']")

        dump_de_participaciones.appendChild(newParticipacion)

        newmonto.addEventListener("input", function() {
            updateSubtotal(newmonto, newporcentaje, newsubtotal);
        });
        newporcentaje.addEventListener("input", function() {
            updateSubtotal(newmonto, newporcentaje, newsubtotal);
        });
        toggle.addEventListener("change", function() {
            togglefactor = this.checked ? 0.75 : 1 
            updateSubtotal(newmonto, newporcentaje, newsubtotal);
        });
        // aqui es donde se display el subtotal compartment
        totales_compartment.classList.remove("hidden")
    })


    // sumatoria de subtotales
    function updateSubtotal(montoElement, porcentajeElement, subtotalElement) {
        let monto = parseFloat(montoElement.value) || 0;
        let porcentaje = parseFloat(porcentajeElement.value) || 0;
        let subtotalcalculo = (monto * togglefactor * (porcentaje / 100)).toFixed(2);
        let subtotalcalculonumber = numeral(subtotalcalculo)
        let subtotalfinal = numeral(subtotalcalculonumber).format("0,") 
        subtotalElement.textContent = `$ ${subtotalfinal}`;
        calculateGrandTotal(subtotalfinal);
    }

    // calcula el subtotal final
    function calculateGrandTotal() {
        let grandSubTotal = 0;
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
    function calculateTotal(total,ivaelement,isrelement){
        let totalcompartment = document.querySelector("#total")
        let ivavalor = ivaelement.value || 0
        let isrvalor = isrelement.value || 0
        let totalFinal = total - ivavalor - isrvalor
        totalcompartment.textContent = `$ ${numeral(totalFinal).format("0,")}`;
    };
})
