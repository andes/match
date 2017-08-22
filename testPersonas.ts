import { Matching } from './lib/matching';
import { IPerson } from './lib/IPerson';
import * as distance from 'jaro-winkler';

let weights = {
    identity: 0.3,
    name: 0.2,
    gender: 0.3,
    birthDate: 0.2
};

/*Estos ejemplos de paciente están basados en un subconjunto de campos de FHIR
la idea es comparar un set de datos básicos.
*/

// Ejemplos de Pacientes a comparar
let pacienteA = {
    documento: '302569851',
    nombre: 'Gozalobb',
    apellido: 'Carranza',
    // fechaNacimiento: '01-01-1980',
    // sexo: 'male'
};

let pacienteB = {
    documento: 304869851,
    apellido: 'Caranza',
    nombre: 'Horacio',
    // fechaNacimiento: '01-01-1980',
    // sexo: 'male'
};

let m1 = new Matching();
let resultado = m1.matchPersonas(pacienteA, pacienteB, weights, 'Levensthein');
console.log('matchig: ', resultado);
