import React from "react";
import { Link} from "react-router-dom";

import "./Home.css";
import FotoProjeto from "/amazon.jpg";
import arrow from '/setaHome.svg';

import IconEco from "/economicicon.svg";
import IconEnv from "/environmentalicon.svg";
import IconEpi from "/epidemiologicalicon.svg";
import IconSoc from "/socioeconomicicon.svg";

import Pessoa1 from "/pessoa1.jpg";
import Pessoa2 from "/pessoa2.jpg";
import Pessoa3 from "/pessoa3.jpg";
import Pessoa4 from "/pessoa3.jpg";

import Amazonia from "/amazonialegal.jpg";
import rec from "/rec.png";
import CVerde from "/circuloverdeHome.svg";
import CAmarelo from "/circuloamareloHome.svg";
import CRosa from "/circulorosaHome.svg";
import pizza from "/pizzaHome.svg";
import trescirculos from "/eligHome.svg";
import MapIcon from "/BLAmaps.svg";

import tool from "/dataVizTool.jpg"

function Home () {
    return(
       
    <div>
        <div className="containerHome">
            <img src={rec} alt="Gradiente" id="Gradiente" />
            <img src={FotoProjeto} alt="Projeto Trajetorias" id="FotoProjeto" />

        </div>

        <div className="DimensoesHome">
            <h6>DIMENSIONS OF THE STUDY</h6>
            <h1>Revealing the impact of Amazonian agrarian systems on environmental and epidemiological changes</h1>
            <p>The Brazilian Amazon is a region of great ecological and economic importance, with a rich biodiversity and significant natural resources. 
                However, it is also facing numerous challenges, including deforestation, climate change, and the impacts of agrarian systems on the environment and public health. 
                This research project aims to <strong>explore the relationship between agrarian systems, environmental changes, and public health in the Brazilian Amazon.</strong></p>

            <p>The visualizations are based on the data reported in the <strong>Trajetórias dataset</strong>, which is a harmonized set of seventeen years of environmental, epidemiological, 
                and poverty indicators for all municipalities of the states of Amapá, Amazonas, Maranhão, Mato Grosso, Pará, Rondônia, Roraima and Tocantins.</p>

            <p> The visualization strategy is a <strong>chromatic comparison between two time windows (2001-2006 and 2007-2017)</strong> where users can visually correlate indicators across dimensions. 
                To develop the multi-layered visualization, we collaborated with the National Center for Supercomputing Applications at the University of Illinois to enable state-of-the-art 
                interactions on conventional computer browsers to make the visualizations available to the general public.</p>
            
            
            <div id="Elipses">
                <div className="elipseItem">
                    <img src={IconEnv} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Environmental</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button>
                </div>
                <div className="elipseItem">
                    <img src={IconEpi} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Epidemiological</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button>
                </div>
                <div className="elipseItem">
                    <img src={IconSoc} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Socioeconomic</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button>
                </div>
                <div className="elipseItem">
                    <img src={IconEco} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Economic</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button>
                </div>
            </div>
        </div>


    <div className="AmazoniaLegal">
        <div className="AmazoniaLegalDv">
        <h1>Brazilian Legal Amazon</h1>
        <p id="sb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla finibus ultricies nisi et molestie. 
            Nunc at bibendum diam. Duis cursus posuere tortor, at tristique justo tincidunt et. </p>

        <div className="AmazoniaContent">
            <img src={Amazonia} alt="Amazonia" className="AmazoniaImg" />

            <div className="InfoAmazonia">
                <div className="NumDivs">
                    <p>The Brazilian Legal Amazon is a <strong>political-administrative area</strong></p>
                    </div>  
                <div className="NumDivs">
                    <img src={MapIcon} id="imgdv" alt="Map" />
                    <p>Area of <strong>5 million km²</strong></p>
                </div>
                <div className="NumDivs">
                    <img src={pizza} id="imgdv" alt="Pizza" />
                    <p>It occupies <strong>58.9%</strong> of Brazil's territory</p>
                </div>
                <div className="NumDivs">
                    <p id="num">772</p>
                    <p>Municipalities</p>
                </div>
                <div className="NumDivs">
                    <p id="num">9</p>
                    <p>Brazilian States</p>
                </div>
                <div className="NumDivs">
                    <img src={trescirculos} id="imgdv" alt="Circles" />
                    <p><strong>3 Brazilian</strong> biomes</p>
                </div>
                <div className="NumDivs">
                    <img src={CAmarelo} id="imgdv" alt="Yellow" />
                    <p>20% of the <strong>Cerrado biome</strong></p>
                </div>
                <div className="NumDivs">
                    <img src={CRosa} id="imgdv" alt="Pink" />
                    <p>40% of the <strong>Pantanal biome</strong></p>
                </div>
                <div className="NumDivs">
                    <img src={CVerde} id="imgdv" alt="Green" />
                    <p>Biome of the <strong>Brazilian Amazon</strong></p>
                </div>
            </div>
        </div>
        </div>
    </div>
    
        <div className="DTool">
            <img src={tool} alt="tool" id="tool"/>
                <Link to="/Tool"><button className="toolButton">
                    <span>Explore the interactive Dataviz</span>
                    <img src={arrow} alt="Arrow" className="arrow-icon" />
                </button></Link>
        </div>




        <div className="EspecialistasHome">
            <h6>RESEARCH TEAM</h6>
            <h1>Know the researchers of the project</h1>
            <div id="Pessoas">
                <div className="PessoasFoto">
                  <img src={Pessoa3} alt="Pessoa"/>
                    <h1>Juan Salamanca</h1>
                    <p>Universidade de Illinois</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                 <img src={Pessoa3} alt="Pessoa"/>
                    <h1>Tobias Mulling</h1>
                    <p>UFPel</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                   <img src={Pessoa3} alt="Pessoa"/>
                    <h1>Carolina Pillon</h1>
                    <p>UFPel</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                   <img src={Pessoa3} alt="Pessoa"/>
                    <h1>Mariana Teixeira</h1>
                    <p>UFPel</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
            </div>
        </div>


        <div className="Artigo">

        </div>


</div>



    )
}

export default Home