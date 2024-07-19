import PercentChange from "./PercentChange";
import StarIcon from "./StarIcon";
import {useState} from "react";
import CoinChart from "./CoinChart";

const priceFormater = (number) => {
    if (Math.round(number).toString().length < 4){
        return new Intl.NumberFormat("us-Us", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 7
        }).format(number)
    } else {
        return number;
    }
}

const marketCapFormater = (number) => {
    let newNumber = String(number).split("");
    newNumber = Number(newNumber.join(""));
    if (newNumber >= 1e9) {
        return (newNumber / 1e9).toFixed(2) + " Md$";
    } else if (newNumber >= 1e6) {
        return (newNumber / 1e6).toFixed(2) + " M$";
    } else {
        return newNumber;
    }
}
const TableLine = ({coin, index}) => {
    const [showChart, setShowChart] = useState(false);
    return (
        <>
            <div className="table-line">
                <div className="infos-container">
                    <StarIcon coinId={coin.id} />
                    <p>{index + 1}</p>
                    <div className="img">
                        <img src={coin.image} height="20" alt={coin.symbol}/>
                    </div>
                    <div className="infos">
                        <div onMouseEnter={()=>setShowChart(true)}
                             onMouseLeave={()=>setShowChart(false)}
                             className="chart-img"
                        >
                            <img src="./assets/chart-icon.svg" alt={coin.symbol}/>
                            <div className="chart-container" id={coin.name}>
                                {showChart && <CoinChart coinId={coin.id} coinName={coin.name}/>}
                            </div>
                        </div>
                        <h4>{coin.name}</h4>
                        <span>- {coin.symbol.toUpperCase()}</span>
                        <a rel='noreferrer' target="_blank" href={`https://www.coingecko.com/fr/pi%C3%A8ces/${coin.id.toLowerCase()}`}>
                            <img src="./assets/info-icon.svg" alt={coin.symbol}/>
                        </a>
                    </div>
                </div>
                <p>{priceFormater(coin.current_price).toLocaleString()} $</p>
                <p className="mktcap">{marketCapFormater(coin.market_cap).toLocaleString()}</p>
                <p className="volume">{marketCapFormater(coin.total_volume).toLocaleString()}</p>
                <PercentChange percent={coin.price_change_percentage_1h_in_currency}/>
                <PercentChange percent={coin.price_change_percentage_24h}/>
                <PercentChange percent={coin.price_change_percentage_7d_in_currency}/>
                <PercentChange percent={coin.price_change_percentage_30d_in_currency}/>
                <PercentChange percent={coin.price_change_percentage_200d_in_currency}/>
                <PercentChange percent={coin.price_change_percentage_1y_in_currency}/>
                <PercentChange percent={coin.ath_change_percentage}/>
            </div>
        </>
    );
};

export default TableLine;