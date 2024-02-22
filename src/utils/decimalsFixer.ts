export const decimalsFixer = (amount: number, decimals: number, operator: "*" | "/") => {
    return eval(`${amount} ${operator} ${+["1"].concat(Array(decimals).fill("0")).join("")}`)
}