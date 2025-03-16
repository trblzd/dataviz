import React from "react";
import "./Home.css";
import FotoProjeto from "/FotoProjeto.jpeg";
import Elipse from "/elipse.png";
import Pessoa1 from "/pessoa1.jpg";
import Pessoa2 from "/pessoa2.jpg";
import Pessoa3 from "/pessoa3.jpg";
import Amazonia from "/amazonialegal.jpg";



function Home () {
    return(
       
    <div>

        <div className="containerHome">
            <img src={FotoProjeto} alt="Projeto Trajetorias" id="FotoProjeto" />
            <div className="TextoHome">
                <h1>Projeto Trajetorias</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt mauris a nibh cursus iaculis. 
                    Maecenas maximus sit amet sem et ornare. Fusce molestie mauris luctus metus sagittis, non sagittis urna volutpat. 
                    Mauris ultricies dui a nisl laoreet mollis ac eget velit. Mauris ac blandit lectus. Nullam porttitor faucibus facilisis. 
                    Praesent sagittis scelerisque erat sed tincidunt. Ut non leo eleifend, semper sem venenatis, molestie ex. 
                    Maecenas interdum, leo sit amet facilisis posuere, sem turpis imperdiet massa, in laoreet ligula neque a leo. 
                    Fusce semper nisi non finibus tristique. Maecenas congue erat vitae ante hendrerit pellentesque. 
                    Praesent venenatis laoreet condimentum. Maecenas sit amet vehicula urna. Aliquam vitae condimentum tellus, eget blandit enim.
                    Morbi et convallis nisi. Integer id elit eu justo faucibus imperdiet. Quisque auctor tellus dolor, 
                    sit amet gravida eros placerat eu. Nunc consectetur neque a maximus pretium. Vestibulum sit amet volutpat odio, 
                    molestie pretium ante. Aenean lobortis egestas odio, id malesuada velit posuere eu.</p>
             </div>
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
        <div classname="AmazoniaLegal">
            <h1>Amazônia Legal Brasileira</h1>
            <img src={Amazonia} alt="Amazonia" />
        </div>
    </div>



    )
}

export default Home