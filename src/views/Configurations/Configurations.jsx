
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress, Alert, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config';

const ConfigurationSettings = () => {
  const [configuration, setConfiguration] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formatoFacturacion, setFormatoFacturacion] = useState('');
  const [updating, setUpdating] = useState(false);

  const token = sessionStorage.getItem('access_token');

  useEffect(() => {
    const fetchConfiguration = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/configuraciones`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener la configuración');
        const data = await response.json();
        setConfiguration(data);
        setFormatoFacturacion(data.formato_facturacion);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar la configuración');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener el perfil');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar el perfil');
      }
    };

    fetchConfiguration();
    fetchUserProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!configuration) return;
    setUpdating(true);
    try {
      const response = await fetch(`${baseUrl}/api/configuraciones/${configuration.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ formato_facturacion: formatoFacturacion })
      });
      if (!response.ok) throw new Error('Error al actualizar la configuración');
      const data = await response.json();
      setConfiguration(data);
      toast.success('Configuración actualizada correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar la configuración');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }} style={{ marginTop: '200px' }}>
      {user && (
        <Paper sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={user.profile && user.profile.avatar ? user.profile.avatar : ''}
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ width: 56, height: 56, mr: 2 }}
          >
            {user.first_name[0]}{user.last_name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
            {user.phone && (
              <Typography variant="body2" color="textSecondary">
                {user.phone}
              </Typography>
            )}
          </Box>
        </Paper>
      )}
      <Paper sx={{ p: 5, boxShadow: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Configuración Predeterminada
        </Typography>
        {configuration ? (
          <form onSubmit={handleUpdate}>
            <Box mb={3}>
              <TextField
                label="Impuesto"
                value="19%"
                fullWidth
                disabled
                helperText="Este valor se fija automáticamente (19%)"
                InputProps={{ style: { fontSize: 22, fontWeight: 500 } }}
                InputLabelProps={{ style: { fontSize: 18 } }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Moneda"
                value={configuration.moneda}
                fullWidth
                disabled
                helperText="La moneda se fija automáticamente (CLP)"
                InputProps={{ style: { fontSize: 22, fontWeight: 500 } }}
                InputLabelProps={{ style: { fontSize: 18 } }}
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Formato de Facturación"
                value={formatoFacturacion}
                onChange={(e) => setFormatoFacturacion(e.target.value)}
                disabled
                fullWidth
                InputProps={{ style: { fontSize: 22, fontWeight: 500 } }}
                InputLabelProps={{ style: { fontSize: 18 } }}
              />
            </Box>
          </form>
        ) : (
          <Alert severity="error">No se encontró configuración para este usuario.</Alert>
        )}
      </Paper>
    </Box>
  );
};

export default ConfigurationSettings;
