const options = [
    {
      label:"All",
      value:"all",
    },
    {
      label:"Name",
      value:"name",
    },
    {
      label:"Full name",
      value:"full_name"
    },
    {
      label:"Country Code",
      value:"country_code"
    },
    {
      label:"Currency",
      value:"currency"
    },
    {
      label:"Language",
      value:"language"
    },
    {
      label:"Capital City",
      value:"capital_city"
    },
    {
        label:"Demonym",
        value:"demonym"
    },
    {
      label:"Region",
      value:"region"
    },
    {
      label:"Sub Region",
      value:"sub_region"
    },
    {
      label:"Translation",
      value:"translation"
    }
]

const urls = {
    all: (all) => `https://restcountries.com/v3.1/all`,
    name: (name) => `https://restcountries.com/v3.1/name/${name}`,
    full_name: (name) => `https://restcountries.com/v3.1/name/${name}?fullText=true`,
    country_code: (code) => `https://restcountries.com/v3.1/alpha/${code}`,
    codes: (codes) => `https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}`,
    currency: (currency) => `https://restcountries.com/v3.1/currency/${currency}`,
    demonym: (demonym) => `https://restcountries.com/v3.1/demonym/${demonym}`,
    language: (language) => `https://restcountries.com/v3.1/lang/${language}`,
    capital_city: (capital) => `https://restcountries.com/v3.1/capital/${capital}`,
    region: (region) => `https://restcountries.com/v3.1/region/${region}`,
    sub_region: (subregion) => `https://restcountries.com/v3.1/subregion/${subregion}`,
    translation: (translation) => `https://restcountries.com/v3.1/translation/${translation}`
  };

export {options , urls }