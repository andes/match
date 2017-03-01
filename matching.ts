/// <reference path="typings/index.d.ts" />
import {matchingAndes} from './matchingAndes';
import {matchingJaroWinkler} from './matchingJaroWinkler';
import {matchingMetaphone} from './matchingMetaphone';
import {matchingSoundexES} from './matchingSoundexES';



export class matching {

    convertirFecha(fecha) {
        //console.log(fecha,typeof(fecha));
        if (typeof (fecha) != "string") {
            var fecha1 = new Date(fecha);
            return ((fecha1.toISOString()).substring(0, 10));
        }
        else
            return ((fecha.toString()).substring(0, 10));
    }

    matchPersonas(persona1, persona2, weights, algoritmo) {
        var pacienteA;
        var pacienteB;
        var valor: number;
        var m1;
        var m2;
        var m3;
        var m4;
        m1 = new matchingJaroWinkler();
        m2 = new matchingMetaphone();
        m3 = new matchingAndes();  //'Levenshtein'
        m4 = new matchingSoundexES();
        valor = 0;

        pacienteA = {
            identity: persona1.documento,
            firstname: persona1.nombre,
            lastname: persona1.apellido,
            birthDate: this.convertirFecha(persona1.fechaNacimiento),
            gender: persona1.sexo
        };

        pacienteB = {
            identity: persona2.documento,
            firstname: persona2.nombre,
            lastname: persona2.apellido,
            birthDate: this.convertirFecha(persona2.fechaNacimiento),
            gender: persona2.sexo
        };


        if (algoritmo == 'Jaro Winkler') {

            valor = m1.machingJaroWinkler(pacienteA, pacienteB, weights);

        }

        else {
            if (algoritmo == 'Metaphone') {

                valor = m2.machingMetaphone(pacienteA, pacienteB, weights);

            } else {
                if (algoritmo == 'Soundex') {

                    valor = m4.matchingSoundex(pacienteA, pacienteB, weights);

                } else {

                    valor = m3.matchingAndes(pacienteA, pacienteB, weights); //Levensthein

                }
            }


        }

        return valor;



    }


    matchPares(listaPares, listaMatch, weights, algoritmo, collection) {
        /*Se aplica el algoritmo de matcheo por cada par
        Se guarda en la collección listaMatch el par de Paciente y el valor devuelto
        por el algoritmo de match y se persiste la información en collection*/

        var pacienteA;
        var pacienteB;
        var valor: number;
        var valorJW: number;
        var valorM: number;
        var valorL: number;
        var valorS: number;


        listaPares.forEach(par => {

            if (par[0]) {
                pacienteA = {
                    identity: par[0].documento,
                    firstname: par[0].nombre,
                    lastname: par[0].apellido,
                    birthDate: this.convertirFecha(par[0].fechaNacimiento),
                    gender: par[0].sexo
                };
            }
            if (par[1]) {
                pacienteB = {
                    identity: par[1].documento,
                    firstname: par[1].nombre,
                    lastname: par[1].apellido,
                    birthDate: this.convertirFecha(par[1].fechaNacimiento),
                    gender: par[1].sexo
                };

            }
            var m1;
            var m2;
            var m3;
            var m4;
            m1 = new matchingJaroWinkler();
            m2 = new matchingMetaphone();
            m3 = new matchingAndes();  //'Levenshtein'
            m4 = new matchingSoundexES();

            if (algoritmo == '') {
                valorJW = m1.machingJaroWinkler(pacienteA, pacienteB, weights);
                valorM = m2.machingMetaphone(pacienteA, pacienteB, weights);
                valorS = m4.matchingSoundex(pacienteA, pacienteB, weights);
                valorL = m3.maching(pacienteA, pacienteB, weights);
                listaMatch.push({ paciente1: par[0], paciente2: par[1], matchL: valorL, matchJW: valorJW, matchM: valorM, matchS: valorS });
            }
            else {
                if (algoritmo == 'Jaro Winkler') {

                    valor = m1.machingJaroWinkler(pacienteA, pacienteB, weights);

                }

                else {
                    if (algoritmo == 'Metaphone') {

                        valor = m2.machingMetaphone(pacienteA, pacienteB, weights);

                    } else {
                        if (algoritmo == 'Soundex') {

                            valor = m4.matchingSoundex(pacienteA, pacienteB, weights);

                        } else {
                            valor = m3.maching(pacienteA, pacienteB, weights); //Levensthein

                        }
                    }


                }

                listaMatch.push({ paciente1: par[0], paciente2: par[1], match: valor });
            }


            //Se guardan los pares de pacientes en la collection matching

            // this.guardarMatch({ paciente1: par[0], paciente2: par[1], match: valor },collection)
            //     .then((res => {
            //         console.log('Se guarda matcheo', valor);
            //     }))
            //     .catch((err => {
            //         console.log('Error al guardar matcheo', err);
            //     }));


        })


    }
}
