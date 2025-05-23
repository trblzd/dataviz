import React from "react";
import "./Home.css";
import FotoProjeto from "/amazon.jpg";
import Elipse from "/elipse.png";
import Pessoa1 from "/pessoa1.jpg";
import Pessoa2 from "/pessoa2.jpg";
import Pessoa3 from "/pessoa3.jpg";
import Amazonia from "/amazonialegal.jpg";
import rec from "/rec.png";

function Home () {
    return(
       
    <div>
        <div className="containerHome">
            <img src={rec} alt="Gradiente" id="Gradiente" />
            <img src={FotoProjeto} alt="Projeto Trajetorias" id="FotoProjeto" />

        </div>

        <div className="DimensoesHome">
            <h1>Dimensões do Dataset</h1>
            <div id="Elipses">
                <img src={Elipse} alt="Elipse" className="ElipsesHome" />
                <img src={Elipse} alt="Elipse" className="ElipsesHome" />
                <img src={Elipse} alt="Elipse" className="ElipsesHome" />
                <img src={Elipse} alt="Elipse" className="ElipsesHome" />
            </div>
        </div>

    <div className="AmazoniaLegal">
        <h1>Amazônia Legal Brasileira</h1>
        <div className="AmazoniaContent">
            <img src={Amazonia} alt="Amazonia" className="AmazoniaImg" />
            <div className="InfoAmazonia">
                <div className="NumDivs"><p>1</p></div>
                <div className="NumDivs"><p>2</p></div>
                <div className="NumDivs"><p>3</p></div>
                <div className="NumDivs"><p>4</p></div>
                <div className="NumDivs"><p>5</p></div>
                <div className="NumDivs"><p>6</p></div>
                <div className="NumDivs"><p>7</p></div>
                <div className="NumDivs"><p>8</p></div>
                <div className="NumDivs"><p>9</p></div>
            </div>
        </div>
    </div>
        <div className="EspecialistasHome">
            <h1>Especialistas</h1>
            <div id="Pessoas">
                <div className="PessoasFoto">
                  <img src={Pessoa1} alt="Pessoa"/>
                    <h1>José Pacheco</h1>
                    <p>Professor no curso de  Engenharia Ambiental da UFPel</p>
                </div>
                <div className="PessoasFoto">
                 <img src={Pessoa2} alt="Pessoa"/>
                    <h1>Cláudia Cassanta</h1>
                    <p>Professora no curso de  Agronomia da UFPel</p>
                </div>
                <div className="PessoasFoto">
                   <img src={Pessoa3} alt="Pessoa"/>
                    <h1>Carl Douglas</h1>
                    <p>Professor na Universidade de Illinois</p>
                </div>
            </div>
        </div>
</div>



    )
}

export default Home