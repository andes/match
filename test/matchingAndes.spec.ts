import * as chai from 'chai';
import { MatchingAndes } from '../lib/matchingAndes.class';
import * as debug from 'debug';
let log = debug('match');


let weights = {
    identity: 0.2,
    name: 0.3,
    gender: 0.4,
    birthDate: 0.1
};

describe('MatchingAndes', () => {
    describe('levenshtein', () => {
        it('same word must be 1', () => {
            let m1 = new MatchingAndes();
            let ratio = m1.levenshtein('Neuquén', 'Neuquén');

            chai.assert.equal(ratio, 1);
        });

        it('one letter diferent', () => {
            let m1 = new MatchingAndes();
            let ratio = m1.levenshtein('Neuqun', 'Neuquén');
            chai.assert.isTrue(ratio < 1);
        });

        it('two different word must be zero', () => {
            let m1 = new MatchingAndes();
            let ratio = m1.levenshtein('Hola', 'Chau');
            chai.assert.equal(ratio, 0);
        });
    });

    describe('identityMatching', () => {
        it('two equal item must return 1', () => {
            let m1 = new MatchingAndes();
            let ratio = m1.identityMatching('Hola', 'Hola');
            chai.assert.equal(ratio, 1);
        });

        it('different item must return 0', () => {
            let m1 = new MatchingAndes();
            let ratio = m1.identityMatching('Hola', 'Chau');
            chai.assert.equal(ratio, 0);
        });

    });

    describe('matchAndes', () => {
        it('same person must return 1', () => {
            let m1 = new MatchingAndes();
            let paciente = {
                identity: '302569851',
                firstname: 'Gozalobbb',
                lastname: 'Carranza',
                birthDate: '01-01-1980',
                gender: 'male'
            };

            let ratio = m1.matchAndes(paciente, paciente, weights);
            chai.assert.equal(ratio, 1);
        });

        it('birthDate is not so important', () => {
            let m1 = new MatchingAndes();
            let pacienteA = {
                identity: '302569851',
                firstname: 'Gozalobbb',
                lastname: 'Carranza',
                birthDate: '01-01-1980',
                gender: 'male'
            };

            let pacienteB = {
                identity: '302569851',
                firstname: 'Gozalobbb',
                lastname: 'Carranza',
                birthDate: '02-01-1978',
                gender: 'male'
            };

            let ratio = m1.matchAndes(pacienteA, pacienteB, weights);
            /**
             * Este valor es a modo de prueba
             */
            chai.assert.isTrue(ratio > 0.95);
        });

        it('Weights zero must not disturb', () => {
            let m1 = new MatchingAndes();
            let auxWeights = {
                identity: 0.3,
                name: 0.3,
                gender: 0.4,
                birthDate: 0
            };

            let pacienteA = {
                identity: '302569851',
                firstname: 'Gozalobbb',
                lastname: 'Carranza',
                birthDate: '01-01-1980',
                gender: 'male'
            };

            let pacienteB = {
                identity: '302569851',
                firstname: 'Gozalobbb',
                lastname: 'Carranza',
                birthDate: '02-01-1978',
                gender: 'male'
            };

            let ratio = m1.matchAndes(pacienteA, pacienteB, auxWeights);
            /**
             * Este valor es a modo de prueba
             */
            chai.assert.isTrue(ratio === 1);
        });

    });

});