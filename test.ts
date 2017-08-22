import { IPerson } from './lib/IPerson';
import { IWeight } from './lib/IWeight';
import { MatchingAndes } from './lib/MatchingAndes';
import { MatchingSoundexES } from './lib/MatchingSoundexES';
import { SoundexES } from './lib/SoundexES';
import * as distance from 'jaro-winkler';

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

// var m = new machingDeterministico();
// console.log(m.maching(pacienteA, pacienteB, weights));

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
console.log(dato);

let m1 = new MatchingAndes();
// var dato1 = m1.maching(pacienteA, pacienteB, weights);
// console.log('matchig: ', dato1);

console.log('Provincia', m1.levenshtein('Neuquén', 'Nqn'));

// for(var i=0;i<tests.length;i++){
// 	var dato = so.soundex(tests[i]);
// 	var dato1 = '';
// 	if(i>0)
// 		dato1 = so.soundex(tests[i-1]);

// 	//console.log(tests[i],': ',dato,' -- ',distance(dato,dato1));
// 	console.log(tests[i],': ', dato);
// }
