// generate user name ==
export const generateUsername = (): string => {
    const prefix = "user_";
    const randomString = Math.random().toString(36).slice(2)
    const username = prefix + randomString;
    return username;
};