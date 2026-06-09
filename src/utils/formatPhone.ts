export const formatPhone = (value: string) => {

    let numbers = value.replace(/\D/g, '');

    if (numbers.startsWith('8')) {
        numbers = '7' + numbers.slice(1);
    } else if (!numbers.startsWith('7')) {
        numbers = '7' + numbers;
    }

    numbers = numbers.substring(0, 11);

    let formatted = '+7 (';

    if (numbers.length > 1) {
        formatted += numbers.substring(1, 4);
    }

    if (numbers.length >= 4) {
        formatted += ') ' + numbers.substring(4, 7);
    }

    if (numbers.length >= 7) {
        formatted += '-' + numbers.substring(7, 9);
    }

    if (numbers.length >= 9) {
        formatted += '-' + numbers.substring(9, 11);
    }

    return formatted;
};