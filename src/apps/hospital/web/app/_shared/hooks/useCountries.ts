import { useEffect, useState } from 'react';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState([]);
  useEffect(() => {
    async function getCountries() {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const sorted = data.sort((a, b) => (a.name.common < b.name.common ? -1 : 1));
      setCountries(sorted.map((country) => ({ label: country.name.common, value: country.name.common, icon: country.flags.png })));
      setPhoneCodes(
        sorted.map((country) => ({
          label: (country.idd.root?.toString() || country.name.common) + country.idd.suffixes?.at(0).toString(),
          value: (country.idd.root?.toString() || '') + country.idd.suffixes?.at(0).toString(),
          icon: country.flags.png,
        }))
      );
    }
    getCountries();
  }, []);
  return {
    countries,
    phoneCodes,
  };
}
