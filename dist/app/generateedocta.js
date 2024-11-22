
import { salario, nombrevalor,emailvalor,ivavalor,isrvalor,totalFinal,total , participacionesData} from "./dashboard.js";


// template que se va a clone

let template_edo = document.getElementById("bodyestado")
let print = document.querySelector("#print")
let fecha = new Date()




print.addEventListener("click", function(){

    let aquivaeltemplate = document.getElementById("aquivaeltemplate")
    let new_Template_Edo = template_edo.content.cloneNode(true)
    let colaboradoredo = new_Template_Edo.querySelector("#colaboradoredo")
    let correoedo = new_Template_Edo.querySelector("#correoedo")
    let fechaedo = new_Template_Edo.querySelector("#fechaedo")
    let salarioedo = new_Template_Edo.querySelector("#montoedo")
    let subtotaledo = new_Template_Edo.querySelector("#subtotaledo")
    let ivaedo = new_Template_Edo.querySelector("#ivaedo")
    let isredo = new_Template_Edo.querySelector("#isredo")
    let totaledo = new_Template_Edo.querySelector("#totaledo")
    let dumpedo = new_Template_Edo.querySelector("#dumpedo")
    let edocompartimientodetotales = new_Template_Edo.querySelector("#edocompartimientodetotales")


    colaboradoredo.textContent =  `Colaborador: ${nombrevalor}`
    correoedo.textContent = `Correo: ${emailvalor}`
    fechaedo.textContent = `Fecha: ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    
    salarioedo.textContent = `$${salario} MXN`

    participacionesData.forEach(entry => {
        dumpedo.innerHTML += `
    <div class="font-normal flex mb-2 ">
        <div class="w-80">${entry.proyecto}:</div>
        <div>$${entry.subtotal} MXN</div>
    </div>`       
    })


    subtotaledo.textContent += `${total}`
    ivaedo.textContent += `${ivavalor}`
    isredo.textContent += `${isrvalor}`
    totaledo.textContent += `$${totalFinal} MXN`
    
    aquivaeltemplate.appendChild(new_Template_Edo)
    html2pdf(aquivaeltemplate);


    setTimeout(function() {

        aquivaeltemplate.classList.add("hidden");

    }, 100); // 

})


