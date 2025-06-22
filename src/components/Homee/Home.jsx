import React from "react";
import { Link} from "react-router-dom";
import "./Home.css";

import FotoProjeto from "/amazon.jpg";
import arrow from '/setaHome.svg';

import IconEco from "/economicicon.svg";
import IconEnv from "/environmentalicon.svg";
import IconEpi from "/epidemiologicalicon.svg";
import IconSoc from "/socioeconomicicon.svg";

import Juan from "/juan.jpg";
import Tobias from "/tobias.png";
import Carol from "/carolina.png";
import Pessoa4 from "/pessoa3.jpg";

import Amazonia from "/amazonialegal.svg";
import rec from "/rec.png";
import CVerde from "/circuloverdeHome.svg";
import CAmarelo from "/circuloamareloHome.svg";
import CRosa from "/circulorosaHome.svg";
import pizza from "/pizzaHome.svg";
import trescirculos from "/eligHome.svg";
import MapIcon from "/BLAmaps.svg";

import artigo from "/artigofotos.png";
import tool from "/dataVizTool.jpg"
import CollapsibleTreeWrapper from "./CollapsibleTreeWrapper";

import scroll from "/scroll.svg";
import ilustrahome from "/ilustraHome.svg";

function Home () {
const treeData = {
  name: "Main Indicators",
  children: [
    {
      name: "Environmental",
      children: [
        {
          name: "Biodiversity loss",
          children: [
            { name: "Deforestation" },
            { name: "Forest degradation" },
            { name: "Fires" },
            { name: "Mining" },
            { name: "Vegetation fragmentation" }
          ]
        },
        {
          name: "Land Use and Land Cover",
          children: [
            { name: "Remnant forest" },
            { name: "Secondary vegetation" },
            { name: "Pasture" },
            { name: "Crop" },
            { name: "Urban area" }
          ]
        },
        {
          name: "Transportation networks",
          children: [
            { name: "Roads network" },
            { name: "Waterways network" },
            { name: "Ports" }
          ]
        },
        {
          name: "Climatic anomalies",
          children: [
            { name: "Precipitation" },
            { name: "Minimum temperature" }
          ]
        }
      ]
    },
    {
      name: "Epidemiological",
      children: [
        {
          name: "Occurrence of diseases",
          children: [
            { name: "Malaria" },
            { name: "Chagas" },
            { name: "Visceral leishmaniasis" },
            { name: "Cutaneous leishmaniasis" },
            { name: "Dengue" }
          ]
        }
      ]
    },
    {
      name: "Socioeconomic",
      children: [
        {
          name: "Population",
          children: [
            { name: "Rural population" },
            { name: "Urban population" }
          ]
        }
      ]
    },
    {
      name: "Economic",
      children: [
        {
          name: "Poverty",
          children: [
            { name: "Deprivations Indicators" },
          ]
        }
      ]
    }
  ]
};

    const treeOptions = {
  width: window.innerWidth,
  height: 800,
  margin: { top: 40, right: 120, bottom: 40, left: 120 },
  linkLength: 200,
  fontSize: 14,
  fill: "#F2B034",
  nodeColors: {
    "Environmental": "#2e7d32",
    "Biodiversity loss": "#388e3c",
    "Land Use and Land Cover": "#66bb6a",
    "Transportation networks": "#81c784",
    "Climatic anomalies": "#a5d6a7",
    "Epidemiological": "#1976d2", 
    "Occurrence of diseases": "#2196f3",
    "Socioeconomic": "#f57c00",
    "Poverty": "#81d4fa",
    "Economic": "#4fc3f7",
    "Population": "#f57c00",
    "Deforestation": "#1C5722",
    "Forest degradation": "#256A2B",
    "Fires": "#38983F",
    "Mining": "#42AF49",
    "Vegetation fragmentation": "#4CB653",
    "Remnant forest": "#468549",
    "Secondary vegetation": "#579F5A",
    "Pasture": "#78D17B",
    "Crop": "#89EB8C",
    "Urban area": "#9AEBAE",
    "Roads network": "#659F69",
    "Waterways network": "#9CE1A0",
    "Ports": "#B7FAC4",
    "Precipitation": "#84B287",
    "Minimum temperature": "#C6FAE9",
    "Malaria": "#145C98",
    "Chagas": "#1977BE",
    "Visceral leishmaniasis": "#29ADEA",
    "Cutaneous leishmaniasis": "#31C2FF",
    "Dengue": "#39DCFF",
    "Deprivations Indicators": "#67AABF",
    "Rural population": "#CB6600",
    "Urban population": "#FF9820"
  }
  };
    return(
    <div>
        <div className="containerHome">
            <h1>See the Brazilian Amazon from different lenses</h1>
            <p>Data visualizations play a key role in understanding the Brazilian Amazon, 
              tracking deforestation, biodiversity, and climate change. Discover insights about it!</p>
              <div className="Scroll">
                    <span>Scroll to discover more</span>
                    <img src={scroll} alt="Scroll" className="scroll-icon" />
              </div>
              <img src={ilustrahome} alt="ilustrahome" className="ilustrahome" id="ilustrahome"/>
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
                    <Link to="/Dimensions?dim=environmental"><button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button></Link>
                </div>
                <div className="elipseItem">
                    <img src={IconEpi} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Epidemiological</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <Link to="/Dimensions?dim=epidemiological"><button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button></Link>
                </div>
                <div className="elipseItem">
                    <img src={IconSoc} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Socioeconomic</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <Link to="/Dimensions?dim=socioeconomic"><button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button></Link>
                </div>
                <div className="elipseItem">
                    <img src={IconEco} alt="Elipse" className="ElipsesHome" />
                    <p className="elipseTitle">Economic</p>
                    <p className="elipseDesc">Biodiversity loss, land use changes, and climate anomalies in the Amazon are deeply interconnected.</p>
                    <Link to="/Dimensions?dim=economic"><button className="elipseButton">
                        <img src={arrow} alt="Arrow" className="arrow-icon" />
                        <span>See the indicators</span>
                    </button></Link>
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
                  <img src={Juan} alt="Juan"/>
                    <h1>Juan Salamanca</h1>
                    <p>Universidade de Illinois</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                 <img src={Tobias} alt="Tobias"/>
                    <h1>Tobias Mulling</h1>
                    <p>UFPel</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                   <img src={Carol} alt="Carol"/>
                    <h1>Carolina Pillon</h1>
                    <p>UFPel</p>
                    <br/>
                    <br/>
                    <br/>
                    <a href="#">Details/CV</a>
                </div>
                <div className="PessoasFoto">
                   <img src={Pessoa4} alt="Mariana"/>
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
            <div className="ArtigoText">
            <h6>DATASET</h6>
            <h1>Trajetórias</h1>
            <p>The Trajetorias dataset contains data of each municipality of Brazil`s Legal Amazon in 2006 and 2017. 
                It contains a rich set of indicators that allow analyzing the spatial and temporal relationship 
                between economic trajectories, availability of natural resources and disease transmission.</p>
            <ul>
                <li>The dataset includes <strong>environmental indicators</strong>, calculated from satellite images, that characterize biodiversity loss, 
                    land use and cover patterns, transport network density and climate anomalies.</li>
                <li>There are <strong>epidemiological indicators</strong> of leishmaniasis, malaria, Chagas disease, and dengue. 
                    These infectious diseases are indicative of social and environmental vulnerability, which include poverty, 
                    lack of basic sanitation, and reduced availability of drinking water.</li>
                <li>The <strong>socioeconomic indicators</strong>, are rural and urban populations.</li>    
                <li>The <strong>economic indicators</strong>, characterize the multidimensional poverty index of rural and urban populations.</li>
            </ul>
                <Link to="https://www.nature.com/articles/s41597-023-01962-1" target="_blank"><button className="datasetButton">
                    <span>Access the Trajetórias Dataset</span>
                    <img src={arrow} alt="Arrow" className="arrow-icon" />
                </button></Link>
        </div>
                <img src={artigo} alt="Artigo" className="ArtigoImagem"/>
            </div>

        <div className="tree-container">
            <h6>DIMENSIONS OF THE STUDY</h6>
            <h1>Trajetórias Dataset Structure</h1>
            <div className="WrapperHome">
                <CollapsibleTreeWrapper data={treeData} options={treeOptions}/>
              </div>
        </div>


    </div>
    )
}
export default Home