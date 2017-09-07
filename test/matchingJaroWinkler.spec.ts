import * as chai from 'chai';
import { MatchingJaroWinkler } from '../lib/matchingJaroWinkler.class';
import * as debug from 'debug';
let log = debug('match');


let weights = {
    identity: 0.2,
    name: 0.3,
    gender: 0.4,
    birthDate: 0.1
};

describe('matchJaroWinkler', () => {
    it('same person must return 1', () => {
        let m1 = new MatchingJaroWinkler();
        let paciente = {
            identity: '302569851',
            firstname: 'Gozalobbb',
            lastname: 'Carranza',
            birthDate: '01-01-1980',
            gender: 'male'
        };

        let ratio = m1.matchJaroWinkler(paciente, paciente, weights);
        chai.assert.equal(ratio, 1);
    });

    it('birthDate is not so important', () => {
        let m1 = new MatchingJaroWinkler();
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

        let ratio = m1.matchJaroWinkler(pacienteA, pacienteB, weights);
        /**
         * Este valor es a modo de prueba
         */
        chai.assert.isTrue(ratio > 0.95);
    });

    it('Weights zero must not disturb', () => {
        let m1 = new MatchingJaroWinkler();
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

        let ratio = m1.matchJaroWinkler(pacienteA, pacienteB, auxWeights);
        /**
         * Este valor es a modo de prueba
         */
        chai.assert.isTrue(ratio === 1);
    });


});