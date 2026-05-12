export const getPetAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff =
        today.getMonth() - birthDate.getMonth();
    if (
        monthDiff < 0 ||
        (
            monthDiff === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }
    return age;
};

export const formatAge = (birthday: string) => {
    const age = getPetAge(birthday)
    if (age % 10 === 1 && age % 100 !== 11) {
        return `${age} год`;
    }
    if (
        [2, 3, 4].includes(age % 10) &&
        ![12, 13, 14].includes(age % 100)
    ) {
        return `${age} года`;
    }
    return `${age} лет`;
};
