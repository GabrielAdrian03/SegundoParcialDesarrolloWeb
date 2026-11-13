// Importaciones de React y Material-UI
import { Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

//renderiza la tarjeta de productos
export function ProductoCard({ producto }) {
  const { id, title, price, images, category } = producto;
  const urlImagen = images && images[0] 
  ? images[0].replace(/[\[\]"]/g, "") 
  : 'https://placeholder.com';

  return (
    <Card sx={{ 
      height: '90%',
      maxWidth: 300,
      width: '100%',
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          height: 200,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
          p: 1.5,
          overflow: 'hidden',
      }}>
        
      <Box component="img" 
      src={urlImagen} 
      alt={title} 
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
      }}/>
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', }}>
        {/* Category? es para mostrar el nombre de la categoría */}
        <Typography variant="caption" color="text.secondary" sx= {{minHeight: '1.5rem', display: 'block'}} >{category?.name || 'General'}</Typography>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '3.2rem' }}>{title}</Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ mt: 'auto' }}>${price}</Typography>
      </CardContent>
      {/* acciones del producto */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
        component={Link} 
        to={`/producto/${id}`}
        variant="contained" 
        fullWidth 
        startIcon={<VisibilityIcon />}
        size="small">
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}
