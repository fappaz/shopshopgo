export const sleep = async (ms = 1500) => await new Promise(resolve => setTimeout(resolve, ms)); /** @TODO Remove this artificial delay when fetching data from real API */