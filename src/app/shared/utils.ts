// Function to generate a simple unique ID
export const generateUniqueId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomPart = Math.random().toString(36).substring(7);
    return `${timestamp}-${randomPart}`;
};