
document.addEventListener("DOMContentLoaded", function() {


    let dump_de_participaciones = document.getElementById("dump_de_participaciones")
    let participaciones_compartment = document.getElementById("participacion_compartment")
    let agregar_participaciones_button = document.getElementById("agregar_participacion")


    agregar_participaciones_button.addEventListener("click",function(){

        let newParticipacion = participaciones_compartment.content.cloneNode(true);

        let newmonto = newParticipacion.querySelector("[name='montoparticipacion']");
        let newporcentaje = newParticipacion.querySelector("[name='porcentaje_participacion']");
        let newsubtotal = newParticipacion.querySelector("#subtotal");

        dump_de_participaciones.appendChild(newParticipacion)


        newmonto.addEventListener("input", function() {
            updateSubtotal(newmonto, newporcentaje, newsubtotal);
        });
        newporcentaje.addEventListener("input", function() {
            updateSubtotal(newmonto, newporcentaje, newsubtotal);
        });
    })

    function updateSubtotal(montoElement, porcentajeElement, subtotalElement) {
        let monto = parseFloat(montoElement.value) || 0;
        let porcentaje = parseFloat(porcentajeElement.value) || 0;
        let subtotalcalculo = (monto * (porcentaje / 100)).toFixed(2);
        subtotalElement.textContent = `$ ${subtotalcalculo}`;
    }

    // function updateSubtotal(){
    //     let monto = parseFloat(document.getElementsByName("montoparticipacion").value)|| 0;
    //     let porcentaje = parseFloat(document.getElementsByName("porcentaje_participacion").value) || 0;
    //     let subtotalcalculo = (monto * (porcentaje / 100)).toFixed(2);

    //     subtotal.textContent =`$ ${subtotalcalculo}`
    // }

    // document.getElementsByName("montoparticipacion").addEventListener("input", updateSubtotal());
    // document.getElementsByName("porcentaje_participacion").addEventListener("input", updateSubtotal());





})