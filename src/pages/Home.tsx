import { Container, Typography, Box, Paper, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

import homeBackground from '../assets/home.jpg';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';

const Home = () => {
    const featuredFoods = [
        {
            id: 1,
            name: "Cheese Burger",
            category: "Fast Food",
            price: "Rs. 1200",
            image: food1
        },
        {
            id: 2,
            name: "Chicken Pizza",
            category: "Italian",
            price: "Rs. 2500",
            image: food2
        },
        {
            id: 3,
            name: "Fried Rice",
            category: "Asian",
            price: "Rs. 1500",
            image: food3
        }
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                background: `url(${homeBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    py: 8
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            background: 'rgba(126,121,121,0.32)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 4,
                            maxWidth: '900px',
                            margin: '0 auto 40px auto',
                            textAlign: 'center'
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                background: 'linear-gradient(135deg, #ff6b35 0%, #e54b1a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            🍔 Food Ordering System
                        </Typography>

                        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                            Delicious Food Delivered to You
                        </Typography>

                        <Typography sx={{ color: '#e5e0e0' }}>
                            Browse your favorite meals, order instantly,
                            and enjoy fresh food delivered fast.
                        </Typography>
                    </Paper>

                    {/* Featured Foods */}
                    <Box sx={{ mb: 5 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: '#ff6b35',
                                mb: 3,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >
                            Featured Foods 🍕
                        </Typography>

                        <Grid container spacing={3}>
                            {featuredFoods.map((food, index) => (
                                <Grid item xs={12} sm={6} md={4} key={food.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                    >
                                        <Card
                                            sx={{
                                                borderRadius: 3,
                                                '&:hover': {
                                                    transform: 'translateY(-10px)',
                                                    boxShadow: '0 20px 40px rgba(255, 107, 53, 0.3)',
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="250"
                                                image={food.image}
                                                alt={food.name}
                                            />

                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {food.name}
                                                </Typography>

                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    {food.category}
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    sx={{ color: '#ff6b35', mt: 1 }}
                                                >
                                                    {food.price}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Home;