import { MatchingAndes } from './lib/matchingAndes.class';
import { MatchingSoundexES } from './lib/matchingSoundexES.class';
import { SoundexES } from './lib/soundexES.class';
import * as distance from 'jaro-winkler';
import * as debug from 'debug';

let log = debug('match');

let weights = {
    identity: 0.2,
    name: 0.3,
    gender: 0.4,
    birthDate: 0.1
};

/*
Estos ejemplos de paciente están basados en un subconjunto de campos de FHIR
la idea es comparar un set de datos básicos.
*/

// Ejemplos de Pacientes a comparar

let pacienteA = {
    identity: '302569851',
    firstname: 'Gozalobbb',
    lastname: 'Carranza',
    birthDate: '01-01-1980',
    gender: 'male'
};

let pacienteB = {
    identity: '35',
    firstname: 'Gonzalo',
    lastname: 'Carranza',
    birthDate: '01-01-1980',
    gender: 'male'
};

let so = new SoundexES();

let tests = [
    'shonatan peres',
    'yonathan perez',
    'Giraldo',
    'Jiraldo',
    'Walter',
    'cien',
    'sein',
    'complicado',
    'xocola',
    'chocolate',
    'Fernández hugo',
    'Hernandez Hugo',
    'Silvina Roga',
    'Silvia Roa',
    'Silvana Rosa'
];

let m = new MatchingSoundexES();
let dato = m.matchSoundex(pacienteA, pacienteB, weights);
log(dato);

let m1 = new MatchingAndes();
log('Provincia', m1.levenshtein('Neuquén', 'Nqn'));
