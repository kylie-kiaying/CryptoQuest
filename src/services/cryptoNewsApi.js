import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'X-RapidAPI-Key': '1f1e432c9fmsh2dc34f8661dafb6p12f173jsne65750381548',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
}

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/v1/coindesk?limit=${count}`), 
    })
  })
});


export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;

