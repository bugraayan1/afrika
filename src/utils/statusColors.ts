type StatusColor = 'success' | 'warning' | 'error' | 'default';

export const getStatusColor = (status: string): StatusColor => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'online':
      return 'success';
    case 'warning':
    case 'pending':
      return 'warning';
    case 'error':
    case 'offline':
      return 'error';
    default:
      return 'default';
  }
}; 