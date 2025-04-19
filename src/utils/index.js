export const maskNumber = (number) => {
    const formattedNumber = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    }).format(number);

    return formattedNumber;
}