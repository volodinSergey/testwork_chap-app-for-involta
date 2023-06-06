/**
 * @title Sleep function
 * @description Used for artifical delay
 * @param ms How many seconds to wait 
 */
export const sleep = async (ms: number) => new Promise(res => setTimeout(res, ms))
