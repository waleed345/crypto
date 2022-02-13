import React, { useState } from 'react'
import { useQuery } from 'react-query'
import constant from '../helper/constant'

function Trade() {
    const [value, setValue] = useState(0)
    const [rate, setRate] = useState(0)
    const [isSwap, setIsSwap] = useState(false)
    const fetchData = () => fetch(`https://data.messari.io/api/v2/assets?fields=symbol,metrics/market_data/price_usd`).then((res) => res.json())
    const {
        data,
    } = useQuery('fetchAssets', fetchData)

    if (localStorage.getItem('email') !== constant.email || localStorage.getItem('pass') !== constant.pass) {
        return "You need to be login first"
    }
    return (
        <div id="app_trade">
            <div className="trade">
                <h3>Trade</h3>
                <div className={`${!isSwap ? 'input-div' : 'rate-div'}`}>
                    <input placeholder='Enter Value' value={value} onChange={(e) => setValue(e.target.value)} />
                    {!isSwap ? (
                        <select value={rate} onChange={e => setRate(e.target.value)}>
                            <option value={0}>Select</option>
                            {data?.data.map((asset, id) => {
                                return (
                                    <option key={id} value={asset?.metrics?.market_data?.price_usd}>{asset.symbol}</option>
                                )
                            })}
                        </select>
                    ) :
                        <span>USD</span>
                    }
                </div>

                <button className='btn' onClick={() => setIsSwap(!isSwap)}>Swap</button>

                <div className={`${isSwap ? 'input-div' : 'rate-div'}`}>
                    <input disabled={true} value={isSwap ? (value / rate).toString() : (value * rate).toFixed(3)} readOnly />
                    {isSwap ? (
                        <select value={rate} onChange={e => setRate(e.target.value)}>
                            <option value={0}>Select</option>
                            {data?.data.map((asset, id) => {
                                return (
                                    <option key={id} value={asset?.metrics?.market_data?.price_usd}>{asset.symbol}</option>
                                )
                            })}
                        </select>
                    ) :
                        <span>USD</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Trade