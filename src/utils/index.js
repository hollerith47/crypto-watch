export const isStableCoin = (coin) =>{
    let stables = [
        "usdt",
        "usdc",
        "busd",
        "dai",
        "ust",
        "mim",
        "tusd",
        "usdp",
        "usdn",
        "fei",
        "tribe",
        "gusd",
        "frax",
        "lusd",
        "husd",
        "ousd",
        "xsgd",
        "usdx",
        "eurs"
    ];
    if (stables.includes(coin)){
        return false
    }else{
        return true
    }
}