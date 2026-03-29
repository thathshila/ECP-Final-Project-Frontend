import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Product } from '../types';
import { motion } from 'framer-motion';

interface FoodCardProps {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
}

const FoodCard = ({ product, onEdit, onDelete }: FoodCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(255, 107, 53, 0.1)',
                transition: '0.3s',
                position: 'relative',
                '&:hover': {
                    boxShadow: '0 8px 30px rgba(255, 107, 53, 0.2)',
                }
            }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={
                        product.imageUrl ||
                        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={product.name}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    {/* Food Name */}
                    <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: '#333',
                            mb: 1
                        }}
                    >
                        {product.name}
                    </Typography>

                    {/* Quantity */}
                    <Typography
                        variant="body2"
                        sx={{ color: '#666', mb: 1 }}
                    >
                        {product.quantity}
                    </Typography>

                    {/* Price */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#ff6b35',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        Rs. {product.unitPrice}
                    </Typography>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {onEdit && (
                            <IconButton
                                size="small"
                                onClick={() => onEdit(product)}
                                sx={{ color: '#ff6b35', mr: 0.5 }}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                        {onDelete && (
                            <IconButton
                                size="small"
                                onClick={() => onDelete(product.id)}
                                sx={{ color: '#ff6b35' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default FoodCard;