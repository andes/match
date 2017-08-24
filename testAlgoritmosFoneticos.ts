import { SoundexES } from './lib/soundexES.class';
import * as distance from 'jaro-winkler';
import * as debug from 'debug';

let log = debug('match');

log(distance('Natalia', 'Carina', { caseSensitive: false }));
let algSoundex = new SoundexES();
log(algSoundex.soundex('Abadia'));
