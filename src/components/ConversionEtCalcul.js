import React, { Component } from 'react';
import Select from 'react-select';
import styles from '../../styles/Components/ConversionEtCalcul.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ConversionEtCalcul = () => {
  //
  //! Constantes pour API de conversion.

  const euros = 'EUR';
  const dirham = 'AED';
  const cleApi = '884d7361855aca074a01d304581f49c33c3c172e';
  const url = 'https://api.getgeoapi.com/v2/currency/convert';

  //! -------------------------------------------------------------------------------

  //! Les constantes.

  const [prixAED, setPrixAED] = useState(0);
  const [afficheCoursAED, setAfficheCoursAED] = useState(0);
  const [affichePrixEuro, setAffichePrixEuro] = useState(0);
  const [cotationManuelle, setCotationManuelle] = useState(0);
  const [afficheDroitdouane, setAfficheDroitdouane] = useState(0);
  const [afficheTvaRegionale, setAfficheTvaRegionale] = useState(0);
  const [afficheOctroiDeMer, setAfficheOctroiDeMer] = useState(0);
  const [total, setTotal] = useState(0);
  const [differencePrix, setDifferencePrix] = useState(0);
  const [afficheTitle, setAfficheTitle] = useState(0);
  const [infoCylindree, setInfoCylindree] = useState(0);
  const [affichePrixVehicule, setAffichePrixVehicule] = useState(0);
  const [optionCylindree, setOptionCylindree] = useState('');

  //! -------------------------------------------------------------------------------

  //! Les constantes.

  const droitsDeDouane = 10;
  const tvaRegionale = 8.5;
  const commission = 1500;
  const transport = 2300;
  const homologation = 4500;
  const entretient = 1500;
  const transite = 1500;

  //! -------------------------------------------------------------------------------

  //! Les variables.

  let prixEnEuros = 0;
  let coursAED;
  let montantDroitsDeDouane;
  let montantTvaRegionale;
  let calculeDuTotal;
  let difference;
  let differenceBrut;
  let octroiDeMer;
  let montantoctroiDeMer;
  let prixVehiculeBrut;
  let prixVehicule;

  //! -------------------------------------------------------------------------------

  //! Récupération informations véhicule dans la base de données.

  let getCarData = () => {
    axios
      // .get('http://localhost:3003/api/dataFromExtensionRoute/getData/')
      .get(
        'https://rocky-temple-30433.herokuapp.com/api/dataFromExtensionRoute/getInfoVehicule/'
      )
      .then((response) => {
        //console.log('Requete brute : ', response.data);

        prixVehiculeBrut = response.data[0].prixVehicule;
        prixVehicule = parseFloat(prixVehiculeBrut);

        if (prixVehicule >= 0.1) {
          prixVehicule = prixVehicule;

          // console.log('Typeof prixVehicule = Number :', prixVehicule);

          document.getElementById('pasDeCotationId').style.display = 'none';
          document.getElementById('coteManu').style.display = 'none';
        } else {
          prixVehicule = 0;

          // console.log('Typeof prixVehicule = NaN :', prixVehicule);

          document.getElementById('pasDeCotationId').style.display = 'block';
          document.getElementById('coteManu').style.display = 'flex';
        }

        setAffichePrixVehicule(prixVehicule);
        setAfficheTitle(response.data[0].infoVehicule);
        setInfoCylindree(response.data[0].infoCyndree);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCarData();
  }),
    [];

  //! -------------------------------------------------------------------------------

  //! Fonction au clic du bouton valider "Informations pour la cotation"

  const validerCalcule = (e) => {
    e.preventDefault();

    //
    axios
      .get(
        url +
          '?api_key=' +
          cleApi +
          '&from=' +
          dirham +
          '&to=' +
          euros +
          '&amount=' +
          prixAED +
          '&format=json'
      )

      //! 1) Conversion du prix AED en Euros.
      //
      .then((response) => {
        // console.log(response.data);

        coursAED = response.data.rates.EUR.rate;
        console.log('le cours de l AED du jour : ' + coursAED);

        setAfficheCoursAED(coursAED);

        let prixEnEurosBrut = parseFloat(
          response.data.rates.EUR.rate_for_amount
        );

        prixEnEuros = Math.round(prixEnEurosBrut * 100) / 100;

        setAffichePrixEuro(prixEnEuros);

        console.log(
          '1) Le prix convertis en euros =====> ' + prixEnEuros + '€'
        );
      })

      //! -------------------------------------------------------------------------------

      //! 2) Calcule des droits de douane.
      .then(() => {
        //

        let droitsDeDouaneBrut = prixEnEuros * (droitsDeDouane / 100);
        montantDroitsDeDouane = Math.round(droitsDeDouaneBrut * 100) / 100;
        console.log(
          '2) Les droits de douane ===========> ' + montantDroitsDeDouane + '€'
        );
        // console.log(
        //   'Type arrondi droits de douane = ' + typeof montantDroitsDeDouane
        // );

        setAfficheDroitdouane(montantDroitsDeDouane); // Ligne 20.
      })

      //! -------------------------------------------------------------------------------

      //! 3) Calcule TVA régionale.

      .then(() => {
        //

        let tvaRegionaleBrut = prixEnEuros * (tvaRegionale / 100);
        montantTvaRegionale = Math.round(tvaRegionaleBrut * 100) / 100;
        console.log(
          '3) Montant de la TVA Régionale ====> ' + montantTvaRegionale + '€'
        );
        // console.log(
        //   'le type de montantTvaRegionale : ' + typeof montantTvaRegionale
        // );

        setAfficheTvaRegionale(montantTvaRegionale); // Ligne 21.
      })

      //! -------------------------------------------------------------------------------

      //! 4) Calcule octroi de mer.
      //
      .then(() => {
        //

        octroiDeMer = parseFloat(optionCylindree);

        let octroiDeMerBrut = prixEnEuros * (octroiDeMer / 100);
        montantoctroiDeMer = Math.round(octroiDeMerBrut * 100) / 100;
        console.log(
          '4) Montant octroi De Mer ===========> ' + montantoctroiDeMer + '€'
        );
        // console.log(
        //   'le type de montantoctroiDeMer : ' + typeof montantoctroiDeMer
        // );

        setAfficheOctroiDeMer(montantoctroiDeMer); // Ligne 22.
      })

      //! -------------------------------------------------------------------------------

      //! 5) Calule du total.
      //
      .then(() => {
        //

        let calculeDuTotalBrut =
          prixEnEuros +
          montantDroitsDeDouane +
          montantTvaRegionale +
          montantoctroiDeMer +
          commission +
          transport +
          homologation +
          entretient +
          transite;

        // console.log(
        //   '5) Prix du véhicule TTC ===========> ' + typeof calculeDuTotalBrut
        // );

        calculeDuTotal = Math.round(calculeDuTotalBrut * 100) / 100;

        setTotal(calculeDuTotal);

        console.log('5) Prix du véhicule TTC ===========> ' + calculeDuTotal);
      })

      //! -------------------------------------------------------------------------------

      //! 6) Calcule de la différence.
      //
      .then(() => {
        //

        differenceBrut = calculeDuTotal - (prixVehicule + cotationManuelle);

        difference = Math.round(differenceBrut * 100) / 100;

        console.log('6) La différence de cotation ======> ' + difference + '€');
        // console.log(
        //   '6) La différence de cotation ======> ' + typeof difference
        // );

        setDifferencePrix(difference);
      })

      //! -------------------------------------------------------------------------------
      .catch((error) => {
        console.log(error);
      });
  };

  //!---------------------------- JSX ---------------------------------------

  return (
    <div className={styles.box}>
      {/*  */}
      {/****************** Informations sur le véhicule ******************/}

      <div id="result" className={styles.cardBody}>
        <div className={styles.cardTitle}>Véhicule côté</div>

        <div className={styles.cardDataBody}>
          <div className={styles.cardInfoTech}>{afficheTitle}</div>

          <div className={styles.cardInfoTechCylindree}> {infoCylindree}</div>

          <div className={styles.cardInfoPrix}>
            Prix : {affichePrixVehicule} €
          </div>
          <span id="pasDeCotationId" className={styles.cardInfoCotation}>
            Pas de cotation disponible
          </span>

          <div id="coteManu" className={styles.cardInputBox}>
            <input
              id="cotationManuelle"
              className={styles.cardInput}
              type="number"
              placeholder="Cotation manuelle"
              required
              onChange={(e) => setCotationManuelle(e.target.valueAsNumber)}
            ></input>
          </div>

          <div
            className={styles.cardSelectBox}
            onChange={(e) => setOptionCylindree(e.target.value)}
          >
            <select>
              <optgroup>
                <option value="">Options Cylindrée</option>
                <option value="0.0">Electrique</option>
                <option value="4.0">Hybride -2500 CC</option>
                <option value="10.5">-1000 CC</option>
                <option value="15.5">1001 à 1500 CC</option>
                <option value="20.5">1501 à 2000 CC</option>
                <option value="25.5">2001 à 2500 CC</option>
                <option value="34">+ 2501 CC</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/************************************************************************/}

      {/************ Conversion prix ************/}

      <div id="result" className={styles.cardBody}>
        <div className={styles.cardTitle}>Conversion prix</div>

        <div className={styles.cardDataBody}>
          <div className={styles.cardInfoText}>
            {"Cour de l'AED :"} {afficheCoursAED} €
          </div>

          {/* Le prix en AED  */}

          <div className={styles.cardInputBox}>
            <input
              id="prixAED"
              className={styles.cardInput}
              type="number"
              placeholder="Entrer le prix en AED"
              required
              onChange={(e) => setPrixAED(e.target.valueAsNumber)}
            ></input>
          </div>

          <div className={styles.cardInfoText}>Le prix en euros</div>
          <div className={styles.cardInfoPrix}>{affichePrixEuro} €</div>
        </div>
      </div>
      {/************************************************************************/}

      {/************ Calculs des taxes  ************/}

      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>Calculs des taxes</div>
        <div className={styles.cardDataBody}>
          <div className={styles.detailsDesCalculsBox}>
            <div className={styles.cardInfoText}>
              Droit de douane = {afficheDroitdouane} €
            </div>

            <div className={styles.cardInfoText}>
              TVA régionale = {afficheTvaRegionale} €
            </div>

            <div className={styles.cardInfoText}>
              Octroi de mer = {afficheOctroiDeMer} €
            </div>

            <div className={styles.cardInfoText}>
              Commission = {commission} €
            </div>

            <div className={styles.cardInfoText}>Transport = {transport} €</div>

            <div className={styles.cardInfoText}>
              Homologation = {homologation} €
            </div>

            <div className={styles.cardInfoText}>
              Entretient = {entretient} €
            </div>

            <div className={styles.cardInfoText}>Transite = {transite} €</div>

            <div className={styles.cardInfoPrix}>Total = {total} €</div>
          </div>
        </div>
      </div>
      {/************************************************************************/}

      {/************ La différence de cotation ************/}

      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>Différence de prix</div>
        <div className={styles.cardInfoPrix}>{differencePrix} €</div>
      </div>
      {/************************************************************************/}

      {/************ Bouton valider ************/}

      <div className={styles.cardInputBox}>
        <button className={styles.validationButton} onClick={validerCalcule}>
          Valider
        </button>
      </div>

      {/************************************************************************/}
    </div>
  );
};

export default ConversionEtCalcul;
