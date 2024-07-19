import {useEffect, useState} from "react";
import {Tooltip, Treemap} from "recharts";

import colors from '../styles/_settings.scss';

const colorPicker = (number) => {
    if (number >=20){
        return colors.color1;
    }else if (number >= 5){
        return colors.green1;
    }else if (number >=0){
        return colors.green2;
    }else if (number >= -5){
        return colors.red1;
    }else if (number >=-20){
        return colors.red2;
    }else {
        return colors.black2;
    }
}

const excludeStableCoin = coin => {
    return !(coin === "usdt" || coin === "usdc" || coin === "busd" || coin === "dai" || coin === "ust" || coin === "mim" || coin === "usde");
}

const GlobalChart = ({coinsData}) => {
    const [dataArray, setDataArray] = useState([]);
    const IsEmpty = coinsData.length === 0;



    useEffect(() => {
        let chartData = [];
        if (!IsEmpty){
            for (let i = 0; i < 50; i++) {
                if (excludeStableCoin(coinsData[i].symbol)){
                    chartData.push({
                        name: coinsData[i].symbol.toUpperCase() +
                            " " + coinsData[i].market_cap_change_percentage_24h.toFixed(1) +
                            "%",
                        size: coinsData[i].market_cap,
                        fill: colorPicker(coinsData[i].market_cap_change_percentage_24h),
                    })
                }
            }
        }
        // console.log(chartData);
        setDataArray(chartData)

    }, [coinsData, IsEmpty]);

    const TreemapToolTip = ({active, payload}) => {
        if (active && payload && payload.length){
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.name}</p>
                </div>
            )
        }
        return null
    }


    return (
        <div className="global-chart">
            <Treemap
                width={730}
                height={181}
                data={dataArray}
                dataKey='size'
                stroke="rgb(51,51,51)"
                fill="black"
                aspectRatio="1"
            >
                <Tooltip content={<TreemapToolTip/>} />
            </Treemap>
        </div>
    );
};

export default GlobalChart;