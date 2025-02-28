import React, { useEffect, useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText 
} from '@mui/material';

interface MinistryListProps {
  country: string;
  selectedMinistries: string[];
  onMinistryChange: (ministries: string[]) => void;
}

interface Ministry {
  id: string;
  name: string;
  url: string;
}

const MinistryList: React.FC<MinistryListProps> = ({
  country,
  selectedMinistries,
  onMinistryChange,
}) => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMinistries = async () => {
      if (!country) return;
      
      setLoading(true);
      try {
        // Bu kısım backend'den gelecek şekilde düzenlenebilir
        const mockMinistries = [
          { id: 'edu', name: 'Eğitim Bakanlığı', url: 'https://education.gov.ng' },
          { id: 'health', name: 'Sağlık Bakanlığı', url: 'https://health.gov.ng' },
          { id: 'tech', name: 'Teknoloji Bakanlığı', url: 'https://tech.gov.ng' },
          { id: 'agr', name: 'Tarım Bakanlığı', url: 'https://agric.gov.ng' },
        ];
        setMinistries(mockMinistries);
      } catch (error) {
        console.error('Bakanlık listesi alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, [country]);

  return (
    <FormControl fullWidth disabled={!country || loading}>
      <InputLabel>Bakanlıklar</InputLabel>
      <Select
        multiple
        value={selectedMinistries}
        onChange={(e) => onMinistryChange(e.target.value as string[])}
        renderValue={(selected) => 
          selected
            .map(id => ministries.find(m => m.id === id)?.name)
            .filter(Boolean)
            .join(', ')
        }
      >
        {ministries.map((ministry) => (
          <MenuItem key={ministry.id} value={ministry.id}>
            <Checkbox checked={selectedMinistries.includes(ministry.id)} />
            <ListItemText primary={ministry.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MinistryList; 