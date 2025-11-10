import { TypingAnimation } from "../components/TypingAnimation";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";

export function Inicio() {
    const textos = [
        "Desarrollador Web",
        "Creador de Soluciones",
        "Estudiante de Programación",
        "Entusiasta de React"
    ];

    const secciones = [
        {
            titulo: "💵 Conversor de Divisas",
            descripcion: "Convierte entre USD y HNL con tasas en tiempo real",
            link: "/divisa",
            color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
            titulo: "🌤️ Clima",
            descripcion: "Consulta el clima de cualquier ciudad del mundo",
            link: "/clima",
            color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            titulo: "👥 Clientes",
            descripcion: "Mira la lista de clientes",
            link: "/clientes",
            color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            titulo: "📦 Productos",
            descripcion: "Catálogo de productos disponibles",
            link: "/productos",
            color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Box sx={{ textAlign: 'center', mb: 8, px: 2 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            👋 Bienvenido a mi portafolio
                        </Typography>
                        <Typography 
                            variant="h2" 
                            fontWeight="bold" 
                            gutterBottom 
                            sx={{ 
                                mb: 2,
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                            }}
                        >
                            Hola, soy{" "}
                            <span style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                <TypingAnimation texts={textos} />
                            </span>
                        </Typography>
                        <Typography 
                            variant="h6" 
                            color="text.secondary" 
                            sx={{ 
                                maxWidth: '600px', 
                                mx: 'auto', 
                                mb: 4,
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' }
                            }}
                        >
                            Este es mi proyecto de práctica con React, donde exploro diferentes funcionalidades 
                            y creo aplicaciones web interactivas.
                        </Typography>
                    </Box>
                </motion.div>

                {/* Cards de secciones */}
                <Grid container spacing={3}>
                    {secciones.map((seccion, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            >
                                <Link to={seccion.link} style={{ textDecoration: 'none' }}>
                                    <Card 
                                        sx={{ 
                                            height: '100%',
                                            background: seccion.color,
                                            color: 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                {seccion.titulo}
                                            </Typography>
                                            <Typography variant="body1" sx={{ opacity: 0.95 }}>
                                                {seccion.descripcion}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}