// Importaciones de React y Material-UI
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Función para renderizar la tarjeta de producto
export function ProductoCard({ producto }) {
  const { id, title, price, images, category } = producto;
  const urlImagen = images && images[0] ? images[0].replace(/[\[\]"]/g, "") : 'https://placeholder.com';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia component="img" height="200" image={urlImagen} alt={title} />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Category? es para mostrar el nombre de la categoría */}
        <Typography variant="caption" color="text.secondary">{category?.name}</Typography>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ height: '3rem', overflow: 'hidden', mb: 1 }}>{title}</Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold">${price}</Typography>
      </CardContent>
      {/* Tarjeta para acciones del producto */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button component={Link} to={`/producto/${id}`} variant="contained" fullWidth startIcon={<VisibilityIcon />} size="small">
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
}
