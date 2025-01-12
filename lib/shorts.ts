import countries from '@/datas/countries.json';
export const countriesOptions = countries.map((country) => ({
    value: country.country.toLowerCase(),
    label: country.country
}))
export const countriesString = countries.map((country) => country.country.toLowerCase())