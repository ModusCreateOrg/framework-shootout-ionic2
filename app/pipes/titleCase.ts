import {Pipe, PipeTransform} from 'angular2/core';
import * as titleCase from 'title-case';

const ignored = ['BMW', 'GMC', 'AWD', 'CX-3', 'CX-5', 'MX-5', 'CTS', ' DTS', ' ESCALADE', ' ESCALADE ESV', ' ESCALADE EXT', ' SRX', ' STS', ' XLR', ' F-150', ' F-250', ' F-350', ' CR-V', ' FCX', ' LR3', ' SQ5', ' TT', 'TTS'];

@Pipe({ name: 'titlecase' })
export class TitleCasePipe implements PipeTransform {
    transform(value: string) {
        if (ignored.indexOf(value) === -1) {
            return titleCase(value);
        }
        else {
            return value;
        }
    }
}
