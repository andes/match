import { IPerson } from './IPerson';
import { IWeight } from './IWeight';
import { LibString } from './LibString';

export class MatchingAndes {

    /**
     * @description stringMatching - Devuelve la cantidad de coincidencias sobre la mayor longitud
     * @param {string} stringA - unString
     * @param {string} stringB - unString
     * @author Hugo Fernández hfernandez@neuquen.gov.ar
     */
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

    /**
     * @description sexMatching - Devuelve 1 si los datos son idénticos
     * @param {string} sexA - sexo del pacienteA
     * @param {string} sexB - sexo del pacienteB
     * @author Hugo Fernández hfernandez@neuquen.gov.ar
     */
    private sexMatching(sexA, sexB) {
        if (sexA === sexB) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * @description identityMatching - Devuelve 1 si los identificadores son idénticos
     * @param {int} idA - Documento del pacienteA
     * @param {int} idB - Documento del pacienteB
     * @author Hugo Fernández hfernandez@neuquen.gov.ar
     */
    private identityMatching(idA, idB) {
        if (idA === idB) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * @description levenshtein - Devuelve un porcentaje de coincidencia entre dos string
     * @param {string} stringA - Primer string a comparar
     * @param {string} stringB - Segundo string a comparar
     * @author Hugo Fernández hfernandez@neuquen.gov.ar
     */
    public levenshtein(stringA: string, stringB: string): number {
        // let s1 = LibString.preprocessInput(stringA.toLowerCase());
        // let s2 = LibString.preprocessInput(stringB.toLowerCase());
        let s1 = stringA;
        let s2 = stringB;

        let maxLen = LibString.maxLargo(s1, s2);

        let l1 = s1.length;
        let l2 = s2.length;
        let d = [];
        let c = 0;
        let a = 0;

        if (l1 === 0) {
            return 0;
        }

        if (l2 === 0) {
            return 0;
        }

        a = l1 + 1;

        for (let i = 0; i <= l1; d[i] = i++) { };
        for (let j = 0; j <= l2; d[j * a] = j++) { };

        for (let i = 1; i <= l1; i++) {
            for (let j = 1; j <= l2; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    c = 0;
                } else {
                    c = 1;
                }
                let r = d[j * a + i - 1] + 1;
                let s = d[(j - 1) * a + i] + 1;
                let t = d[(j - 1) * a + i - 1] + c;

                d[j * a + i] = Math.min(Math.min(r, s), t);
            }
        }

        return 1 - ((d[l2 * a + l1]) / maxLen)
    }


    /**
     * @description maching - Devuelve un porcentaje macheo entre dos personas
     * @param {IPerson} identidadA - Objeto json de persona A
     * @param {IPerson} identidadB - Objeto json de persona B
     * @param {IWeight} weights - Json de pesos de los campos a comparar
     * @author Hugo Fernández hfernandez@neuquen.gov.ar
     */
    public matchAndes(identidadA: IPerson, identidadB: IPerson, weights: IWeight): number {
        let completeNameA = identidadA.firstname + identidadA.lastname;
        let completeNameB = identidadB.firstname + identidadB.lastname;
        let v1 = weights.name * this.levenshtein(LibString.preprocessInput(completeNameA.toLocaleLowerCase()), LibString.preprocessInput(completeNameB.toLowerCase()));
        let v2 = weights.gender;
        if (identidadA.gender !== null) {
            v2 = weights.gender * this.sexMatching(identidadA.gender, identidadB.gender);
        }
        let v3 = weights.birthDate;
        if (identidadA.birthDate !== null) {
            v3 = weights.birthDate * this.stringMatching(identidadA.birthDate, identidadB.birthDate);
        }
        let v4 = weights.identity * this.levenshtein(identidadA.identity, identidadB.identity);
        let value = Math.round((v1 + v2 + v3 + v4) * 100) / 100;

        return value;
    }
}
