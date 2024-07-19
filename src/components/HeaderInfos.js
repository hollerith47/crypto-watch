import {useEffect, useState} from "react";
import axios from "axios";
import PercentChange from "./PercentChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
    const [headerData, setHeaderData] = useState([]);

    const IsEmpty = headerData.length === 0;

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/global")
            .then((res) => setHeaderData(res.data.data))
    }, []);
    return (
        <div className="header-container">
            <ul className="title">
                <li>
                    <h1><img src="./assets/logo.png" alt="logo"/> Crypto Watch</h1>
                </li>
                <li>Crypto-monnaies: {!IsEmpty &&
                    headerData.active_cryptocurrencies.toLocaleString()}
                </li>
                <li>Marchés: {!IsEmpty && headerData.markets.toLocaleString()}</li>
            </ul>
            <ul className="infos-mkt">
                <li className="global-mkt">
                    Global Market Cap:
                    {!IsEmpty &&
                        <PercentChange percent={headerData.market_cap_change_percentage_24h_usd} />
                    }

                </li>
                <li>BitCoin Dominance: {!IsEmpty && headerData.market_cap_percentage.btc.toFixed(1) + "%"}</li>
                <li>Ethereum Dominance: {!IsEmpty && headerData.market_cap_percentage.eth.toFixed(1) + "%"}</li>
            </ul>
            <TableFilters />
        </div>
    );
};

export default HeaderInfos;