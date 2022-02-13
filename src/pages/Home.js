import React, { useState } from 'react'
import { useQuery } from 'react-query'

const Home = () => {
    const [limit, setLimit] = useState(5)
    const fetchData = (limit = 5) => fetch(`https://data.messari.io/api/v2/assets?fields=id,name,slug,symbol,metrics/market_data/price_usd&limit=${limit}`).then((res) => res.json())
    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
    } = useQuery(['fetchAssets', limit], () => fetchData(limit), { keepPreviousData: true })

    return (
        <div id="app_home">
            {isLoading ? (
                <div className="loading">Loading</div>
            )
                :

                isError ? (
                    <div className="error">{error.message}</div>
                )
                    :
                    <React.Fragment>
                        <h1>Digital Assets</h1>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Name</th>
                                        <th>Price (USD)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.map(project => (
                                        <tr key={project.id}>
                                            <td>
                                                <p>{project.symbol}</p>
                                            </td>
                                            <td>
                                                <p>{project.name}</p>
                                            </td>
                                            <td>
                                                <p>{project.metrics.market_data.price_usd.toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <select>
                                                    <option>Buy</option>
                                                    <option>Sell</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {isFetching ? 'Loading' :
                                <button className='btn' onClick={() => setLimit(old => old + 5)} >Load More</button>
                            }
                        </div>
                    </React.Fragment>
            }
        </div>
    )
}

export default Home