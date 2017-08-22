import { LibString } from './LibString';
import * as distance from 'jaro-winkler';
import { IPerson } from './IPerson';
import { IWeight } from './IWeight';

export class MatchingJaroWinkler {
    private sexMatching(sexA, sexB) {
        if (sexA === sexB) {
            return 1;
        } else {
            return 0;
        }
    }

    private stringMatching(stringA, stringB) {
        let stringAMin = stringA.toLowerCase();
        let stringBMin = stringB.toLowerCase();

        let maxLen = LibString.maxLargo(stringAMin, stringBMin);
        let minLen = LibString.minLargo(stringAMin, stringBMin);
        let coincidencias = 0;


        for (let i = 0; i < minLen; i++) {
            if (stringAMin.charAt(i) === stringBMin.charAt(i)) {
                coincidencias++
            }
        }

        return coincidencias / maxLen;
    }

    public matchJaroWinkler(identidadA: IPerson, identidadB: IPerson, weights: IWeight): number {
        let completeNameA = identidadA.firstname + identidadA.lastname;
        let completeNameB = identidadB.firstname + identidadB.lastname;
        let v1 = weights.name * distance(completeNameA, completeNameB);  // Se utiliza el algoritmo JaroWinkler
        let v2 = weights.gender * this.sexMatching(identidadA.gender, identidadB.gender);
        let v3 = weights.birthDate * this.stringMatching(identidadA.birthDate, identidadB.birthDate);
        let v4 = weights.identity * this.stringMatching(identidadA.identity, identidadB.identity);
        let value = Math.round((v1 + v2 + v3 + v4) * 100) / 100;

        return value;
    }

}
