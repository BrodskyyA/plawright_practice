import { v4 as uuidv4 } from 'uuid';

function generateRandomEmail() {
    const emailPrefix = 'andriy.brodskyy+aqa-user';
    const domain = '@gmail.com';
    const uuid = uuidv4().substr(0, 8);
    const randomEmail = `${emailPrefix}${uuid}${domain}`;
    return randomEmail;

}
function generateRandomPassword() {
    const passwordPrefix = 'Af3';
    const passwordSuffix = '15a' 
    const uuid = uuidv4().substr(0, 8);
    const randomPassword = `${passwordPrefix}${uuid}${passwordSuffix}`
    return randomPassword
}

export const correctEmail = generateRandomEmail();
export const correctPassword = generateRandomPassword();
export const incorrectPassword = 'wrongPassword';
export const registeredEmail = 'a.brodskyy@gmail.com'
export const registeredPassword = 'Lemberg159'