import * as distance from 'jaro-winkler';
import { IPerson } from './lib/IPerson';
import { IWeight } from './lib/IWeight';
import { MetaphoneES } from './lib/MetaphoneES';
import { SoundexES } from './lib/SoundexES';
import * as debug from 'debug';

let log = debug('match');

log(distance('Natalia', 'Carina', { caseSensitive: false }));
let algSoundex = new SoundexES();
log(algSoundex.soundex('Abadia'));
