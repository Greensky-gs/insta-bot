import map from './OzenneMap.json';

export enum OzenneMaps {
    SA = 'escalier A',
    SB1 = 'escalier B1',
    SB2 = 'escalier B2',
    SC = 'escalier C',
    SD = 'escalier D',
    SH = 'escalier H',
    SG = 'escalier G',
    SE = 'escalier E',
    F1 = 'étage 1',
    F2 = 'étage 2',
    RDC = 'rez-de-chaussée',
    F3 = 'étage 3',
    F4 = 'étage 4',
    L = 'gauche',
    R = 'droite',
    B1 = 'bâtimment 1',
    B2 = 'bâtiment 2',
    B3 = 'bâtiment 3',
    B4 = 'bâtiment 4'
}
export type WayToClass = {
    room: string;
    steps: (keyof typeof OzenneMaps)[][];
};
export const calculateWayToClass = (room: string) => {
    const steps = map.find((x) => x.room === room) as WayToClass;

    if (!steps) return false;
    const step = steps.steps[0];

    if (['B1', 'B2', 'B3', 'B4'].some((x) => step[0] === x)) {
        return `à partir de l'${OzenneMaps[step[1]]}, allez à ${step[2] === 'R' ? 'droite' : 'gauche'}`;
    } else {
        return `montez l'${OzenneMaps[step[0]]} jusqu'a l'${OzenneMaps[step[1]]}, puis allez à ${
            step[2] === 'R' ? 'droite' : 'gauche'
        }`;
    }
};
