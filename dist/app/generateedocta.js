
import { salario, nombrevalor,emailvalor,ivavalor,isrvalor,totalFinal,total , participacionesData} from "./dashboard.js";

let template_EstadodeCuenta = document.getElementById("bodyestado")
let btn_Imprimir = document.querySelector("#print")
let fecha = new Date()

btn_Imprimir.addEventListener("click", function(){
    let template_Holder = document.getElementById("aquivaeltemplate")
    let nuevotemplate_paraEdo = template_EstadodeCuenta.content.cloneNode(true)
    let colaboradoredo = nuevotemplate_paraEdo.querySelector("#colaboradoredo")
    let correo_Edo = nuevotemplate_paraEdo.querySelector("#correoedo")
    let fecha_Edo = nuevotemplate_paraEdo.querySelector("#fechaedo")
    let salario_Edo = nuevotemplate_paraEdo.querySelector("#montoedo")
    let subtotal_Edo = nuevotemplate_paraEdo.querySelector("#subtotaledo")
    let iva_Edo = nuevotemplate_paraEdo.querySelector("#ivaedo")
    let isr_Edo = nuevotemplate_paraEdo.querySelector("#isredo")
    let total_Edo = nuevotemplate_paraEdo.querySelector("#totaledo")
    let dump_de_las_participaciones = nuevotemplate_paraEdo.querySelector("#dumpedo")

    // aqui se agregan la info inicial del colaborador + todas las participaciones en un loop
    colaboradoredo.textContent =  `Colaborador: ${nombrevalor}`
    correo_Edo.textContent = `Correo: ${emailvalor}`
    fecha_Edo.textContent = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    salario_Edo.textContent = `$${salario} MXN`

    participacionesData.forEach(entry => {
        dump_de_las_participaciones.innerHTML += `
    <div class="font-normal flex mb-2 ">
        <div class="w-80">${entry.proyecto}:</div>
        <div>$${entry.subtotal} MXN</div>
    </div>`       
    })

    //aqui se agregan los valores de totales 
    subtotal_Edo.textContent += `${total}`
    iva_Edo.textContent += `${ivavalor}`
    isr_Edo.textContent += `${isrvalor}`
    total_Edo.textContent += `$${totalFinal} MXN`
    template_Holder.appendChild(nuevotemplate_paraEdo)
    html2pdf(template_Holder);

    // agregada para que se pueda render el DOM y luego hide. 
    setTimeout(function() {
        template_Holder.classList.add("hidden");
    }, 100); // 
})


