import React, { useState, useEffect } from 'react';

import './Mapas.css'; 
import { useSearchParams } from "react-router-dom";


import IconEnv from '/environmentalicon.svg';
import IconEpi from '/epidemiologicalicon.svg';
import IconSoc from '/socioeconomicicon.svg';
import IconEco from '/economicicon.svg';
import rec from "/rec.png";
import FotoProjeto from "/amazon.jpg";

import defor from "/habitatLoss_Maps_defor-1.png";
import deorg from "/habitatLoss_Maps_deorg-1.png";
import dgfor from "/habitatLoss_Maps_dgfor-1.png";
import dgorg from "/habitatLoss_Maps_dgorg-1.png";
import fire from "/habitatLoss_Maps_fire-1.png";
import fragcore from "/habitatLoss_Maps_fragmentation_core-1.png";
import fragedge from "/habitatLoss_Maps_fragmentation_edge-1.png";
import minig from "/habitatLoss_Maps_minig-1.png";
import crop from "/landUse_Maps_crop-1.png";
import pasture from "/landUse_Maps_pasture-1.png";
import refor from "/landUse_Maps_refor-1.png";
import secveg from "/landUse_Maps_secveg-1.png";
import urban from "/landUse_Maps_urban-1.png";
import pvinc from "/mdPovertyIncidence-1.png"
import pvint from "/mdPovertyIntensity-1.png";
import mdi from "/mdPovertyMDI-1.png";
import port from "/transportation_Maps_port-1.png";
import river from "/transportation_Maps_river-1.png";
import road from "/transportation_Maps_road-1.png";
import precn from "/climate_Maps_precn-1.png";
import precp from "/climate_Maps_precp-1.png";
import tempp from "/climate_Maps_tempp-1.png";
import chagas from "/vectorBorneDiseases_Maps_diseaseChagas-1.png";
import dengue from "/vectorBorneDiseases_Maps_diseaseDengue-1.png";
import cl from "/vectorBorneDiseases_Maps_diseaseCL-1.png";
import malaria from "/vectorBorneDiseases_Maps_diseaseMalaria-1.png";
import falciparum from "/vectorBorneDiseases_Maps_diseaseMalariaFalciparum-1.png";
import vivax from "/vectorBorneDiseases_Maps_diseaseMalariaVivax+Falciparum-1.png";
import vl from "/vectorBorneDiseases_Maps_diseaseVL-1.png";

const DimensionsPage = () => {
  const [searchParams] = useSearchParams();
  const dimParam = searchParams.get("dim");
    useEffect(() => {
      if (dimParam) {
        const selectedDimension = dimensionsData.find(dim => dim.id === dimParam);
        if (selectedDimension) {
          setActiveDimension(selectedDimension);
          setActiveSubcategory(
            selectedDimension.subcategories.length > 0 ? selectedDimension.subcategories[0] : null
          );
          setActiveIndicator(
            selectedDimension.subcategories.length > 0 && selectedDimension.subcategories[0].indicators.length > 0
              ? selectedDimension.subcategories[0].indicators[0]
              : null
          );
        }
      }
    }, [dimParam]);

  const dimensionsData = [
  {
    id: 'environmental',
    title: 'Environmental Dimension',
    description: 'The Environmental dimension is divided four subdimensions: Habitat loss, Land use and cover, Climate anomalies, and Transport network density.',
    icon: IconEnv,
    subcategories: [
      { id: 'habitatLoss', name: 'Habitat Loss', indicators: ['Deforestation', 'Forest degradation', 'Fires', 'Mining', 'Vegetation fragmentation'] },
      { id: 'landUseCover', name: 'Land Use and Land Cover', indicators: ['Remnant forest', 'Secondary vegetation', 'Pasture', 'Crop', 'Urban area'] },
      { id: 'transportationNetworks', name: 'Transportation networks', indicators: ['Roads network', 'Waterways network', 'Ports'] },
      { id: 'climaticAnomalies', name: 'Climatic anomalies', indicators: ['Precipitation', 'Minimum temperature'] },
    ],
  },
  {
    id: 'epidemiological',
    title: 'Epidemiological Dimension',
    description: 'The Epidemiological dimension is focused on the Occurrence of Diseases, covering indicators such as Malaria, Chagas, Visceral Leishmaniasis, Cutaneous Leishmaniasis, and Dengue.',
    icon: IconEpi,
    subcategories: [
      { id: 'occurrenceofDiseases', name: 'Occurrence of Diseases', indicators: ['Malaria', 'Chagas', 'Visceral leishmaniasis', 'Cutaneous leishmaniasis', 'Dengue'] },
    ],
  },
  {
    id: 'socioeconomic',
    title: 'Socioeconomic Dimension',
    description: 'The Socioeconomic dimension explores Population Density, with key indicators being Rural Population and Urban Population.',
    icon: IconSoc,
    subcategories: [
      { id: 'populationDensity', name: 'Population Density', indicators: ['Rural population', 'Urban population'] },
    ],
  },
  {
    id: 'economic',
    title: 'Economic Dimension',
    description: 'The Economic dimension focuses on Poverty Indices, with a primary indicator of Deprivations Indicators.',
    icon: IconEco,
    subcategories: [
      { id: 'povertyIndices', name: 'Poverty Indices', indicators: ['Deprivations indicators'] }
    ],
  },
];

  const [activeDimension, setActiveDimension] = useState(dimensionsData[0]);

  const [activeSubcategory, setActiveSubcategory] = useState(
    dimensionsData[0].subcategories.length > 0 ? dimensionsData[0].subcategories[0] : null
  );

  const [activeIndicator, setActiveIndicator] = useState(
    activeSubcategory && activeSubcategory.indicators.length > 0
      ? activeSubcategory.indicators[0]
      : null
  );

  const handleDimensionClick = (dimensionId) => {
    const selectedDimension = dimensionsData.find(dim => dim.id === dimensionId);
    if (selectedDimension) {
      setActiveDimension(selectedDimension);
      setActiveSubcategory(
        selectedDimension.subcategories.length > 0 ? selectedDimension.subcategories[0] : null
      );
      setActiveIndicator(
        selectedDimension.subcategories.length > 0 && selectedDimension.subcategories[0].indicators.length > 0
          ? selectedDimension.subcategories[0].indicators[0]
          : null
      );
    }
  };

  const handleSubcategoryClick = (subcategoryId) => {
    const selectedSubcategory = activeDimension.subcategories.find(
      (sub) => sub.id === subcategoryId
    );
    if (selectedSubcategory) {
      setActiveSubcategory(selectedSubcategory);
      setActiveIndicator(
        selectedSubcategory.indicators.length > 0
          ? selectedSubcategory.indicators[0]
          : null
      );
    }
  };

  const handleIndicatorClick = (indicatorName) => {
    setActiveIndicator(indicatorName);
  };

const indicatorImages = {
  "Deforestation": [defor, deorg,],
  "Forest degradation": [dgfor, dgorg],
  "Fires": [fire],
  "Mining": [minig],
  "Vegetation fragmentation": [fragcore, fragedge],

  "Remnant forest": [refor],
  "Secondary vegetation": [secveg],
  "Pasture": [pasture],
  "Crop": [crop],
  "Urban area": [urban],

  "Roads network": [road],
  "Waterways network": [river],
  "Ports": [port],

  "Precipitation": [precn, precp],
  "Minimum temperature": [tempp],

  "Malaria": [malaria, falciparum, vivax],
  "Chagas": [chagas],
  "Visceral leishmaniasis": [vl],
  "Cutaneous leishmaniasis": [cl],
  "Dengue": [dengue],

  "Rural population": [],
  "Urban population": [urban],

  "Deprivations indicators": [pvinc, pvint, mdi]
};


  return (
    <div className="dimensions-page">
      
      <div className="hero-wrapper">
        <img src={rec} alt="Gradiente" id="Gradiente" />
        <img src={FotoProjeto} alt="Projeto Trajetorias" id="FotoProjeto" />
      <section className="hero-section">
        
        <div className="hero-content">
          <h1>{activeDimension.title}</h1>
          <p>{activeDimension.description}</p>
        </div>
        <div className="hero-icon">
          <img src={activeDimension.icon} alt={`${activeDimension.title} Icon`} />
        </div>
      </section>

      <section className="dimension-navigation">
        {activeDimension.subcategories.map((subcat) => (
          <button
            key={subcat.id}
            className={`dimension-button ${activeSubcategory && activeSubcategory.id === subcat.id ? 'active' : ''}`}
            onClick={() => handleSubcategoryClick(subcat.id)}
          >
            {subcat.name}
          </button>
        ))}
      </section>
      </div>


      <section className="indicators-navigation">
        <div className="indicators-label">INDICATORS</div>
        <div className="indicator-list">
          {activeSubcategory && activeSubcategory.indicators.map((indicator) => (
            <button
              key={indicator}
              className={`indicator-button ${activeIndicator === indicator ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(indicator)}
            >
              {indicator}
            </button>
          ))}
        </div>
      </section>

      <section className="content-area">
  {activeIndicator ? (
    <div>
      <div className="indicator-gallery">
        {indicatorImages[activeIndicator]?.map((img, index) => (
          <img key={index} src={img} alt={`${activeIndicator} ${index + 1}`} className="indicator-image" />
        )) || <p>No images available for this indicator.</p>}
      </div>
    </div>
  ) : (
    <p>Please select an indicator to view data.</p>
  )}
</section>

    </div>
  );
};

export default DimensionsPage;