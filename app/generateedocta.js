
import { getSalario, colaInfo, totales, participacionesData} from "./dashboard.js";


// template que se va a clone
let aquivaeltemplate = document.getElementById("aquivaeltemplate")
let template_edo = document.getElementById("bodyestado")
let print = document.querySelector("#print")

const salario = getSalario()
const fecha = new Date().toString()
const {nombre,email} = colaInfo()
const {iva,isr,subtotal,total} = totales()



print.addEventListener("click", function(){

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

    salarioedo.textContent = `${salario}`
    colaboradoredo.textContent = `${nombre}`
    correoedo.textContent = `${email}`
    fechaedo.textContent = `${fecha}`
    subtotaledo.textContent = `${subtotal}`
    ivaedo.textContent = `${iva}`
    isredo.textContent = `${isr}`
    totaledo.textContent = `${total}`

    console.log(participacionesData)
    console.log(dumpedo)

    // participacionesData.forEach(entry => {
    //     dumpedo.innerHTML += `
    // <div class="font-normal flex mb-2 ">
    //     <div class="w-80">${entry.proyecto}</div>
    //     <div>${entry.subtotal}MXN</div>
    // </div>`       
    // })
    
    // aquivaeltemplate.appendChild(new_Template_Edo)
    // let element = document.getElementById("aquivaeltemplate")
    // html2pdf(element); 
    // aquivaeltemplate.classList.add("hidden");
})


