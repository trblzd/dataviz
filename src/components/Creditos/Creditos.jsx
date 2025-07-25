import React from "react";
import './Creditos.css';
import { Link} from "react-router-dom";

function Creditos () {
    return(
        <div className="creditos">
            <h1>Credits</h1>
            <p>Rorato, Ana C., Ana Paula Dal’Asta, Raquel Martins Lana, Ricardo B. N. dos Santos, 
            Maria Isabel S. Escada, Camila M. Vogt, Tatiana Campos Neves, et al. 2023. “Trajetorias: A Dataset of Environmental, Epidemiological, 
            and Economic Indicators for the Brazilian Amazon”. Scientific Data 10 (1): 65. https://doi.org/10.1038/s41597-023-01962-1. </p> <br/><br/>

            <p>“Noun Project: Free Icons & Stock Photos for Everything”. Noun Project. 
            Accessed June 03, 2025. https://thenounproject.com/. </p><br/><br/>

            <p>Martin, Nareeta. 2019. “Foto de Nareeta Martin na Unsplash”. Unsplash. 
            May 01, 2019. https://unsplash.com/pt-br/fotografias/cabana-perto-do-lago-USADCV83HOE. </p><br/><br/>

            <p>Utināns, Ivars. 2020. “Foto de Ivars Utināns na Unsplash”. 
            Unsplash. June 02, 2020. https://unsplash.com/pt-br/fotografias/vista-aerea-de-arvores-verdes-e-rio-durante-o-dia-vkQgb1lZZPQ. </p><br/><br/>

        <div className="cred-useful-links"> 
        <h1>Support</h1>
                <ul>
                    <li><Link to="https://wp.ufpel.edu.br/labxd/" target="_blank">LabXD</Link></li>
                    <li><Link to="https://www.smartartifact.com/" target="_blank">Smart Artifact</Link></li>
                    <li><Link to="https://illinois.edu/" target="_blank">University of Illinois</Link></li>
                    <li><Link to="https://portal.ufpel.edu.br/" target="_blank">Universidade Federal de Pelotas</Link></li>
                </ul>
            </div>
        </div>

    )
}

export default Creditos;