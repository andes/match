import { Matching } from './lib/matching.class';
import * as distance from 'jaro-winkler';
import * as debug from 'debug';

let log = debug('match');

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
let resultado = m1.matchPersonas(pacienteA, pacienteB, weights, 'Levenshtein');
log('matchig: ', resultado);
