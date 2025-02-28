import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const AFRICAN_COUNTRIES = [
  { code: 'NG', name: 'Nijerya' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'Güney Afrika' },
  { code: 'EG', name: 'Mısır' },
  { code: 'ET', name: 'Etiyopya' },
  // Daha fazla Afrika ülkesi eklenebilir
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Ülke Seçin</InputLabel>
      <Select
        value={selectedCountry}
        label="Ülke Seçin"
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {AFRICAN_COUNTRIES.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountrySelector; 