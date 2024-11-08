
document.addEventListener("DOMContentLoaded", function() {

    togglefactor = .75


    let dump_de_participaciones = document.getElementById("dump_de_participaciones")
    let participaciones_compartment = document.getElementById("participacion_compartment")
    let agregar_participaciones_button = document.getElementById("agregar_participacion")


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

    })

    function updateSubtotal(montoElement, porcentajeElement, subtotalElement) {
        let monto = parseFloat(montoElement.value) || 0;
        let porcentaje = parseFloat(porcentajeElement.value) || 0;
        let subtotalcalculo = (monto * togglefactor * (porcentaje / 100)).toFixed(2);
        subtotalElement.textContent = `$ ${subtotalcalculo}`;
    }

})