import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '86ac23fc6cmshc2955d53aebc174p10f51cjsnaf76c69326ce',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
           getCryptos: builder.query({
               query: (count) => createRequest(`/coins?limit=${count}`)
           }),
           getCryptoDetails: builder.query({
               query: (coinId) => createRequest(`/coin/${coinId}`)
           }),
           getCryptoHistory: builder.query({
               query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history`)
           }),
           getExchanges: builder.query({
            query: (coinID) => createRequest(`/coin/Qwsogvtv82FCd/exchanges`),
          })
    })
});

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,useGetExchangesQuery
} = cryptoApi;

