import React, { useRef, useReducer, useEffect } from "react";
import { connect } from "react-redux";
import DisplayGrid from "@root/Framework/Blocks/Grid/Grid";
import { DataRef } from "@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData";
import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";
import * as SubjectBusinessLogic from "@shared/Application/c.Intranet/Modules/8_Competency/Subject/SubjectBusinessLogic";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

const Subject = props => {
  return (
    <div className="subject-container">
      <div className="filter">
        <div className="filter-block">
          <span className="filter-label">Fachbereich wähle: </span>
          <select className="Dropdown">
            <option value="">bitte wählen</option>
            <option value="0">Hauptgebiet</option>
            <option value="6257">Mathematik</option>
            <option value="6258">-- Zahl und Variable</option>
            <option value="6259">-- Form und Raum</option>
            <option value="6260">
              -- Grössen, Funktionen, Daten und Zufall
            </option>
            <option value="6261">-- Datendarstellung, Proportionalität</option>
            <option value="6316">1</option>
            <option value="6218">Deutsch</option>
            <option value="6233">-- Hören</option>
            <option value="6235">-- Lesen</option>
            <option value="6237">-- Sprache im Fokus</option>
            <option value="6236">-- Schreiben</option>
            <option value="7004">-- Literatur im Fokus</option>
            <option value="6234">-- Sprechen</option>
            <option value="6298">-- Schreibanlass</option>
            <option value="6219">Französisch</option>
            <option value="6238">-- Hören</option>
            <option value="6240">-- Lesen</option>
            <option value="6241">-- Sprache im Fokus</option>
            <option value="6239">-- an Gesprächen teilnehmen</option>
            <option value="6242">-- zusammenhängend Sprechen</option>
            <option value="6220">Englisch</option>
            <option value="6243">-- Hören</option>
            <option value="6245">-- Lesen</option>
            <option value="7068">-- Sprache im Fokus</option>
            <option value="6246">-- Sprechen</option>
            <option value="7067">-- 4 Schreiben</option>
            <option value="7069">-- 6 Kulturen im Fokus</option>
            <option value="6244">-- an Gesprächen teilnehmen</option>
            <option value="6247">-- zusammenhängend Sprechen</option>
            <option value="6222">Latein</option>
            <option value="6248">-- F Formenlehre</option>
            <option value="6249">-- R röm. Kultur</option>
            <option value="6250">-- S Syntax</option>
            <option value="6251">-- T Textverständnis</option>
            <option value="6252">-- W Wortschatz</option>
            <option value="6221">Vorstellung</option>
            <option value="6253">-- zweidimensional</option>
            <option value="6254">-- dreidimensional</option>
            <option value="6255">-- prozedural</option>
            <option value="6292">TLV</option>
            <option value="6293">-- Technisches Verständnis</option>
            <option value="6294">-- Logisches Verständnis</option>
            <option value="6217">Natur und Technik 1</option>
            <option value="6230">-- Biologie</option>
            <option value="6231">-- Physik</option>
            <option value="6232">-- Chemie</option>
            <option value="6301">PSM</option>
            <option value="6302">-- Belastbarkeit</option>
            <option value="6303">-- Selbstvertrauen</option>
            <option value="6304">-- Emotionale Stabilität</option>
            <option value="6305">-- Autonomie</option>
            <option value="6306">-- Persönliche Ziele</option>
            <option value="6307">-- Zuverlässigkeit</option>
            <option value="6308">-- Flexibilität und Kreativität</option>
            <option value="6309">-- Kontaktorientierung</option>
            <option value="6310">-- Teamorientierung</option>
            <option value="6311">-- Regelbewusstsein</option>
            <option value="6312">-- Harmoniebedürfnis</option>
            <option value="6313">-- Einfühlungsvermögen</option>
            <option value="6314">-- Toleranz</option>
            <option value="6315">-- Lerntechniken</option>
            <option value="7261">Wirtschaft, Arbeit, Haushalt</option>
            <option value="7262">Räume, Zeiten, Gesellschaften</option>
            <option value="7263">Ethik, Religionen, Gemeinschaft</option>
            <option value="7264">Bildnerisches Gestalten</option>
            <option value="7265">Textiles undd Technisches Gestalten</option>
            <option value="7266">Musik</option>
            <option value="7267">Bewegung und Sport</option>
            <option value="7021">Natur und Technik</option>
            <option value="7022">
              -- 1 | Wesen und Bedeutung von Naturwissenschaften und Technik
              verstehen
            </option>
            <option value="7023">-- 2 | Stoffe untersuchen und gewinnen</option>
            <option value="7059">-- 3 | Chemische Reaktionen erforschen</option>
            <option value="7060">
              -- 4 | Energieumwandlungen analysieren und reflektieren
            </option>
            <option value="7061">
              -- 5 | Mechanische und elektrische Phänomene untersuchen
            </option>
            <option value="7062">-- 6 | Sinne und Signale erforschen</option>
            <option value="7063">-- 7 | Körperfunktionen verstehen</option>
            <option value="7064">
              -- 8 | Fortpflanzung und Entwicklung analysieren
            </option>
            <option value="7065">-- 9 | Ökosysteme erkunden</option>
            <option value="7847">NaTech</option>
            <option value="7848">-- NaTech</option>
            <option value="7066">NMG</option>
            <option value="7091">
              -- 1 | Identität, Körper, Gesundheit - sich kennen und sich Sorge
              tragen
            </option>
            <option value="7092">
              -- 2 | Tiere, Pflanzen und Lebensräume erkunden und erhalten
            </option>
            <option value="7093">
              -- 3 | Stoffe, Energie und Bewegungen beschreiben, untersuchen und
              nutzen
            </option>
            <option value="7094">
              -- 4 | Phänomene der belebten und unbelebten Natur erforschen und
              erklären
            </option>
            <option value="7095">
              -- 5 | Technische Entwicklungen und Umsetzungen erschliessen,
              einschätzen und anwenden
            </option>
            <option value="7096">
              -- 6 | Arbeit, Produktion und Konsum - Situationen erschliessen
            </option>
            <option value="7097">
              -- 7 | Lebensweisen und Lebensräume von Menschen erschliessen und
              vergleichen
            </option>
            <option value="7098">
              -- 8 | Menschen nutzen Räume - sich orientieren und mitgestalten
            </option>
            <option value="7099">
              -- 9 | Zeit, Dauer und Wandel verstehen - Geschichte und
              Geschichten unterscheiden
            </option>
            <option value="7100">
              -- 10 | Gemeinschaft und Gesellschaft - Zusammenleben gestalten
              und sich engagieren
            </option>
            <option value="7101">
              -- 11 | Grunderfahrungen, Werte und Normen erkunden und
              reflektieren
            </option>
            <option value="7102">
              -- 12 | Religionen und Weltsichten begegnen
            </option>
            <option value="6216">Mathematik_2006</option>
            <option value="6223">-- Zahlen und Zahlenraum</option>
            <option value="6224">-- Grössen</option>
            <option value="6225">-- Operationen</option>
            <option value="6226">-- Gleichungen</option>
            <option value="6300">-- testting</option>
            <option value="6227">-- Zuordnungen</option>
            <option value="6228">-- Abbildungen-Konstruktionen</option>
            <option value="6229">-- Geometrische Berechnungen</option>
            <option value="6268">9: Mathematik</option>
            <option value="6269">-- 9: Zahlen, Grössen, Operationen</option>
            <option value="6270">-- 9: Form und Mass in Ebene und Raum</option>
            <option value="6271">-- 9: Variable, Term, Gleichung</option>
            <option value="6272">
              -- 9: Datendarstellung, Proportionalität
            </option>
            <option value="6262">Rumantsch</option>
            <option value="6263">-- Hören</option>
            <option value="6264">-- Sprechen</option>
            <option value="6265">-- Lesen</option>
            <option value="6266">-- Schreiben</option>
            <option value="6267">-- Sprachreflexion/Rechtschreibung</option>
            <option value="6273">9: Deutsch</option>
            <option value="6274">-- 9: Hören und Verstehen</option>
            <option value="6275">-- 9: Lesen und Verstehen</option>
            <option value="6276">-- 9: Schreibfertigkeiten</option>
            <option value="6277">
              -- 9: Sprachreflexion und Rechtschreibung
            </option>
            <option value="6278">9: Natur und Technik</option>
            <option value="6279">
              -- 9: Biologie - Mensch, Pflanzen, Ökosystem
            </option>
            <option value="6280">
              -- 9: Physik - Elektrizität, Kraft und Bewegung
            </option>
            <option value="6281">
              -- 9: Chemie - Stoffe, Gemische, Stoffumwandlungen
            </option>
            <option value="6282">9: Französisch</option>
            <option value="6283">-- 9: Hören</option>
            <option value="6284">-- 9: Lesen</option>
            <option value="6285">-- 9: Sprachliche Mittel</option>
            <option value="6286">9: Englisch</option>
            <option value="6287">-- 9: Hören</option>
            <option value="6288">-- 9: Lesen</option>
            <option value="6289">-- 9: Sprachliche Mittel</option>
            <option value="6290">SystemCheck</option>
            <option value="6291">-- SystemCheck</option>
            <option value="6256">Testen</option>
            <option value="6296">Jobskills</option>
            <option value="6297">-- Demo</option>
            <option value="6299">Sprachen</option>
            <option value="6950">-- Befragung</option>
            <option value="6951">-- Befragung</option>
            <option value="6971">Normierung Englisch</option>
            <option value="6973">-- Hören</option>
            <option value="6974">-- Lesen</option>
            <option value="6975">-- Sprachliche Mittel</option>
            <option value="6979">-- Befragung</option>
            <option value="6972">Normierung Französisch</option>
            <option value="6976">-- Hören</option>
            <option value="6977">-- Lesen</option>
            <option value="6978">-- Sprachliche Mittel</option>
            <option value="6980">-- Befragung</option>
            <option value="7024">AlleDeutsch</option>
            <option value="7025">-- Hören und Verstehen</option>
            <option value="7026">-- Lesen</option>
            <option value="7027">-- Sprache im Fokus</option>
            <option value="7028">AlleMathematik</option>
            <option value="7029">-- Zahl und Variable</option>
            <option value="7030">-- Form und Raum</option>
            <option value="7031">
              -- Grössen, Funktionen, Daten und Zufall
            </option>
            <option value="7077">Normierung Deutsche</option>
            <option value="7079">-- Hören und Verstehen</option>
            <option value="7080">-- Lesen</option>
            <option value="7081">-- Schreiben</option>
            <option value="7082">-- Sprache im Fokus</option>
            <option value="7083">-- Literatur im Fokus</option>
            <option value="7087">-- Befragung</option>
            <option value="7078">Normierung Mathematik</option>
            <option value="7084">-- Zahl und Variable</option>
            <option value="7085">-- Form und Raum</option>
            <option value="7086">
              -- Grössen, Funktionen, Daten und Zufall
            </option>
            <option value="7088">-- Befragung</option>
            <option value="6295">test</option>
          </select>
        </div>
      </div>

      <div className="task-flex">
        <div className="task-grid">
          <table className="task-grid-table">
            <tr>
              <td>
                <input className="Checkbox" type="checkbox" />
              </td>
              <td>Gebietsnummer</td>
              <td>Bildnummer</td>
              <td>Muttergebiet</td>
              <td>Name</td>
              <td>Reihenfolge</td>
              <td>cIsLearnCoacherSubject</td>
              <td>aktiv</td>
              <td>Konstanz</td>
              <td>Variance</td>
              <td>Anzeigename</td>
              <td>Beschreibung</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subject;
