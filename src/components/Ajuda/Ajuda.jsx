import React from "react";
import { Link } from "react-router-dom";
import "./Ajuda.css";

import Juan from "/juan.jpg";
import Tobias from "/tobias.png";
import Carol from "/carolina.png";
import Pessoa4 from "/pessoa3.jpg";

const Help = () => {
  return (
    <div className="help-page">
      <h1 className="help-title">Contacting Us</h1>
      <p className="help-intro">
        Welcome to <strong>Amazon Views</strong>! Here you can find answers to frequently asked questions and ways to contact us.</p>

      <section className="help-section">
                <div className="ContactUs">
                    <div id="Pessoas">
                        <div className="PessoasFotoHelp">
                          <img src={Juan} alt="Juan"/>
                            <h1>Juan Salamanca</h1>
                            <p>Universidade de Illinois</p>
                            <br/>
                            <br/>
                            <br/>
                            <a href="#">Details/CV</a>
                        </div>
                        <div className="PessoasFotoHelp">
                         <img src={Tobias} alt="Tobias"/>
                            <h1>Tobias Mulling</h1>
                            <p>UFPel</p>
                            <br/>
                            <br/>
                            <br/>
                            <a href="#">Details/CV</a>
                        </div>
                        <div className="PessoasFotoHelp">
                           <img src={Carol} alt="Carol"/>
                            <h1>Carolina Pillon</h1>
                            <p>UFPel</p>
                            <br/>
                            <br/>
                            <br/>
                            <a href="#">Details/CV</a>
                        </div>
                        <div className="PessoasFotoHelp">
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
      </section>

      <section className="help-section">
        <h2>FAQ</h2>
        <details>
          <summary>How do I use the interactive tool?</summary>
          <p>Access the <strong>"Interactive Tool"</strong> tab, select a dimension, and explore the available interactive maps and charts.</p>
        </details>
        
        <details>
          <summary>How do I use the interactive tool?</summary>
          <p>Access the <strong>"Interactive Tool"</strong> tab, select a dimension, and explore the available interactive maps and charts.</p>
        </details>

        <details>
          <summary>What are the project dimensions?</summary>
          <p>The dimensions represent different aspects of the Amazon: Environmental, Epidemiological, Socioeconomic, and Economic.</p>
        </details>

        <details>
          <summary>What are the project dimensions?</summary>
          <p>The dimensions represent different aspects of the Amazon: Environmental, Epidemiological, Socioeconomic, and Economic.</p>
        </details>
      </section>
    </div>
  );
};

export default Help;
