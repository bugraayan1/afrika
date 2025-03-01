type StatusColor = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusConfig {
  color: StatusColor;
  label: string;
}

export const getStatusConfig = (status: string): StatusConfig => {
  const statusMap: Record<string, StatusConfig> = {
    active: { color: 'success', label: 'Aktif' },
    pending: { color: 'warning', label: 'Beklemede' },
    completed: { color: 'info', label: 'Tamamlandı' },
    failed: { color: 'error', label: 'Başarısız' },
    online: { color: 'success', label: 'Çevrimiçi' },
    offline: { color: 'error', label: 'Çevrimdışı' },
  };

  return statusMap[status.toLowerCase()] || { color: 'default', label: status };
}; 