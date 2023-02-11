export const resizeString = (str: string, size?: number) => {
    const length = size ?? 50;

    if (str.length < +length) return str;
    return str.substring(0, length - 3) + '...';
};
