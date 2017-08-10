import {matchingAndes} from './lib/matchingAndes';
import {IPerson} from './lib/IPerson'
import * as distance from 'jaro-winkler';

var weights = {
	identity: 0.3,
	name: 0.2,
	gender: 0.3,
    birthDate: 0.2
};

/*Estos ejemplos de paciente están basados en un subconjunto de campos de FHIR
la idea es comparar un set de datos básicos.
*/

//Ejemplos de Pacientes a comparar

let pacienteA = {
	identity: "302569851",
	firstname: "Gozalobb",
    lastname: "Carranza",
    birthDate: '01-01-1980',
	gender: "male"
};

let pacienteB = {
	identity: "304869851",
	firstname: "Horacio",
    lastname: "Caranza",
    birthDate: '01-01-1980',
	gender: "male"
};

let m1 = new matchingAndes();
let resultado = m1.matchAndes(pacienteA, pacienteB, weights);
console.log("matchig: ", resultado);