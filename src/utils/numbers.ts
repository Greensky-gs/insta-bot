export const numerize = (int: number) => int.toLocaleString('fr');
export const plurial = (count: number | any[], opts?: { plurial?: string; singular?: string }) => {
    const singular = opts?.singular ?? '';
    const plurial = opts?.plurial ?? 's';

    const int = count instanceof Array ? count.length : count;

    return int === 1 ? singular : plurial;
};
