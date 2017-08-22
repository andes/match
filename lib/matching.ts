import { MatchingAndes } from './MatchingAndes';
import { MatchingJaroWinkler } from './MatchingJaroWinkler';
import { MatchingMetaphone } from './MatchingMetaphone';
import { MatchingSoundexES } from './MatchingSoundexES';
import { MetaphoneES } from './MetaphoneES';
import { SoundexES } from './SoundexES';
import { IPerson } from './IPerson'


export class Matching {

    convertirFecha(fecha) {
        if (typeof (fecha) !== 'string') {
            let fecha1 = new Date(fecha);
            return ((fecha1.toISOString()).substring(0, 10));
        } else {
            return ((fecha.toString()).substring(0, 10));
        }
    }


    matchPersonas(persona1, persona2, weights, algoritmo) {
        let pacienteA;
        let pacienteB;
        let valor: number;
        let m1;
        let m2;
        let m3;
        let m4;
        m1 = new MatchingJaroWinkler();
        m2 = new MatchingMetaphone();
        m3 = new MatchingAndes();  // 'Levenshtein'
        m4 = new MatchingSoundexES();
        valor = 0;
        pacienteA = {
            identity: persona1.documento.toString(),
            firstname: persona1.nombre,
            lastname: persona1.apellido,
            birthDate: (persona1.fechaNacimiento) ? this.convertirFecha(persona1.fechaNacimiento) : null,
            gender: (persona2.sexo) ? persona1.sexo : null
        };

        pacienteB = {
            identity: persona2.documento.toString(),
            firstname: persona2.nombre,
            lastname: persona2.apellido,
            birthDate: persona2.fechaNacimiento ? this.convertirFecha(persona2.fechaNacimiento) : null,
            gender: (persona2.sexo) ? persona2.sexo : null
        };

        if (algoritmo === 'Jaro Winkler') {

            valor = m1.matchJaroWinkler(pacienteA, pacienteB, weights);

        } else {
            if (algoritmo === 'Metaphone') {

                valor = m2.matchMetaphone(pacienteA, pacienteB, weights);

            } else {
                if (algoritmo === 'Soundex') {

                    valor = m4.matchSoundex(pacienteA, pacienteB, weights);

                } else {

                    valor = m3.matchAndes(pacienteA, pacienteB, weights); // Levensthein

                }
            }


        }

        return valor;
    }


    matchPares(listaPares, listaMatch, weights, algoritmo, collection) {
        /*Se aplica el algoritmo de matcheo por cada par
        Se guarda en la collección listaMatch el par de Paciente y el valor devuelto
        por el algoritmo de match y se persiste la información en collection*/

        let pacienteA;
        let pacienteB;
        let valor: number;
        let valorJW: number;
        let valorM: number;
        let valorL: number;
        let valorS: number;


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
            let m1;
            let m2;
            let m3;
            let m4;
            m1 = new MatchingJaroWinkler();
            m2 = new MatchingMetaphone();
            m3 = new MatchingAndes();  // 'Levenshtein'
            m4 = new MatchingSoundexES();

            if (algoritmo === '') {
                valorJW = m1.matchJaroWinkler(pacienteA, pacienteB, weights);
                valorM = m2.matchMetaphone(pacienteA, pacienteB, weights);
                valorS = m4.matchSoundex(pacienteA, pacienteB, weights);
                valorL = m3.machAndes(pacienteA, pacienteB, weights);
                listaMatch.push({ paciente1: par[0], paciente2: par[1], matchL: valorL, matchJW: valorJW, matchM: valorM, matchS: valorS });
            } else {
                if (algoritmo === 'Jaro Winkler') {

                    valor = m1.machJaroWinkler(pacienteA, pacienteB, weights);

                } else {
                    if (algoritmo === 'Metaphone') {

                        valor = m2.machMetaphone(pacienteA, pacienteB, weights);

                    } else {
                        if (algoritmo === 'Soundex') {

                            valor = m4.matchSoundex(pacienteA, pacienteB, weights);

                        } else {
                            valor = m3.matchAndes(pacienteA, pacienteB, weights); // Levensthein

                        }
                    }


                }

                listaMatch.push({ paciente1: par[0], paciente2: par[1], match: valor });
            }


            // Se guardan los pares de pacientes en la collection matching

            // this.guardarMatch({ paciente1: par[0], paciente2: par[1], match: valor },collection)
            //     .then((res => {
            //         console.log('Se guarda matcheo', valor);
            //     }))
            //     .catch((err => {
            //         console.log('Error al guardar matcheo', err);
            //     }));


        })
    }

    // Se crea la clave de Blocking

    crearClavesBlocking(paciente) {

        let claves = [];

        // let anioNacimiento = '1900';
        // let doc = '';
        // if (paciente['fechaNacimiento']) {
        //     fecha = paciente['fechaNacimiento'].split('-');
        //     //fecha= paciente['fechaNacimiento'].toISOString().split('-');
        //     anioNacimiento = fecha[0].toString();
        // }
        //
        // if (paciente['documento']) {
        //     doc = paciente['documento'].substr(0, 4);
        // }
        //
        // let clave = LibString.obtenerConsonante(paciente.apellido, 3) + LibString.obtenerConsonante(paciente.nombre, 2) +
        //     anioNacimiento + doc;
        //
        // claves.push(clave);

        // Se utiliza el algoritmo metaphone para generar otra clave de Blocking
        // claves.push(paciente.clavesBlocking[0]);
        // claves.push(paciente.clavesBlocking[1]);
        // claves.push(paciente.clavesBlocking[2]);
        let algMetaphone = new MetaphoneES();
        let claveApellido = algMetaphone.metaphone(paciente['apellido']);
        let claveNombre = algMetaphone.metaphone(paciente['nombre']);
        claves.push(claveApellido.slice(0, 4) + claveNombre.slice(0, 3));   // Clave 1: Formada por las primeras 4 letras del apellido y tres del nombre, con metaphone
        claves.push(claveApellido);  // Clave 2: metaphone sobre apellido
        claves.push(claveNombre); // Clave 3: metaphone sobre nombre
        // Se utiliza el algoritmo soundex para generar una nueva clave de Blocking
        let algSoundex = new SoundexES();
        claves.push(algSoundex.soundex(paciente['apellido'] + paciente['nombre']));
        claves.push(algSoundex.soundex(paciente['apellido']));
        return claves;
    }
}
