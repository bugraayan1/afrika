import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Proje Hakkında
        </Typography>
        <Typography paragraph>
          Bu proje, Afrika ülkelerine teknoloji transferini kolaylaştırmak amacıyla geliştirilmiştir. 
          Proje, Türkiye Cumhuriyeti İletişim Başkanlığı'nın desteğiyle, Türkiye İletişim Modeli'ni 
          kullanarak, Afrika'daki teknoloji altyapısını güçlendirmeyi hedeflemektedir.
        </Typography>
        <Typography paragraph>
          Türkiye İletişim Modeli, iletişim ve teknoloji alanında Türkiye'nin bilgi birikimini ve 
          deneyimini diğer ülkelere aktarmayı amaçlayan bir modeldir. Bu model, ülkeler arası 
          işbirliğini artırarak, teknoloji transferini hızlandırmayı ve sürdürülebilir kalkınmayı 
          desteklemeyi hedeflemektedir.
        </Typography>
        <Typography paragraph>
          Proje kapsamında, çeşitli teknoloji alanlarında uzmanlaşmış yapay zeka ajanları, 
          Afrika ülkelerindeki projelere destek vermekte ve bu projelerin başarıyla tamamlanmasına 
          katkı sağlamaktadır.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About; 