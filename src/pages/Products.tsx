// import { useState, useEffect } from 'react';
// import {
//     Container,
//     Typography,
//     Grid,
//     TextField,
//     InputAdornment,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Alert,
//     Snackbar,
//     IconButton,
//     Paper,
//     CircularProgress
// } from '@mui/material';
// import {
//     Search as SearchIcon,
//     Add as AddIcon,
//     CloudUpload as UploadIcon,
//     Close as CloseIcon,
//     Refresh as RefreshIcon
// } from '@mui/icons-material';
// import type { Product } from '../types';
// import FoodCard from '../components/FoodCard';
// import { motion } from 'framer-motion';
// import {
//     getAllProducts,
//     createProduct,
//     updateProduct,
//     deleteProduct
// } from '../service/productService';
//
// const Products = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [sortBy, setSortBy] = useState('name');
//     const [openDialog, setOpenDialog] = useState(false);
//     const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
//     const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
//
//     const [formData, setFormData] = useState({
//         name: '',
//         quantity: '',
//         unitPrice: '',
//         imageUrl: ''
//     });
//
//     const [formErrors, setFormErrors] = useState({
//         name: '',
//         quantity: '',
//         unitPrice: ''
//     });
//
//     const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
//     const [submitting, setSubmitting] = useState(false);
//
//     useEffect(() => {
//         fetchProducts();
//     }, []);
//
//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const data = await getAllProducts();
//             setProducts(Array.isArray(data) ? data : []);
//         } catch (error: any) {
//             setSnackbar({
//                 open: true,
//                 message: error.message || 'Failed to fetch products',
//                 severity: 'error'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const validateForm = () => {
//         const errors = { name: '', quantity: '', unitPrice: '' };
//         let valid = true;
//
//         if (!formData.name) {
//             errors.name = 'Product name required';
//             valid = false;
//         }
//         if (!formData.quantity) {
//             errors.quantity = 'Quantity required';
//             valid = false;
//         }
//         if (!formData.unitPrice) {
//             errors.unitPrice = 'Price required';
//             valid = false;
//         }
//
//         setFormErrors(errors);
//         return valid;
//     };
//
//     const handleOpenAddDialog = () => {
//         setDialogType('add');
//         setFormData({ name: '', quantity: '', unitPrice: '', imageUrl: '' });
//         setOpenDialog(true);
//     };
//
//     const handleOpenEditDialog = (product: Product) => {
//         setDialogType('edit');
//         setCurrentProduct(product);
//         setFormData({
//             name: product.name,
//             quantity: product.quantity,
//             unitPrice: product.unitPrice.toString(),
//             imageUrl: product.imageUrl || ''
//         });
//         setImagePreview(product.imageUrl || '');
//         setOpenDialog(true);
//     };
//
//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSubmitting(false);
//     };
//
//     const handleSubmit = async () => {
//         if (!validateForm()) return;
//
//         setSubmitting(true);
//         try {
//             const payload = {
//                 name: formData.name,
//                 quantity: formData.quantity,
//                 unitPrice: parseFloat(formData.unitPrice),
//                 imageUrl: selectedImage
//                     ? URL.createObjectURL(selectedImage)
//                     : formData.imageUrl
//             };
//
//             if (dialogType === 'add') {
//                 const newProduct = await createProduct(payload);
//                 setProducts([newProduct, ...products]);
//                 setSnackbar({ open: true, message: 'Product added!', severity: 'success' });
//             } else if (currentProduct) {
//                 const updated = await updateProduct(currentProduct.id, payload);
//                 setProducts(products.map(p => p.id === currentProduct.id ? updated : p));
//                 setSnackbar({ open: true, message: 'Product updated!', severity: 'success' });
//             }
//
//             handleCloseDialog();
//         } catch (err: any) {
//             setSnackbar({ open: true, message: err.message, severity: 'error' });
//         } finally {
//             setSubmitting(false);
//         }
//     };
//
//     const handleDelete = async (id: number) => {
//         if (!window.confirm('Delete this product?')) return;
//         await deleteProduct(id);
//         setProducts(products.filter(p => p.id !== id));
//     };
//
//     const filtered = products
//         .filter(p =>
//             p.name.toLowerCase().includes(search.toLowerCase())
//         )
//         .sort((a, b) => a.name.localeCompare(b.name));
//
//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }
//
//     return (
//         <Container sx={{ py: 4 }}>
//             <Typography variant="h4" sx={{ mb: 3, color: '#ff6b35' }}>
//                 🍔 Food Menu
//             </Typography>
//
//             {/* Search */}
//             <TextField
//                 fullWidth
//                 placeholder="Search food..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     )
//                 }}
//                 sx={{ mb: 3 }}
//             />
//
//             {/* Add Button */}
//             <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={handleOpenAddDialog}
//                 sx={{ mb: 3 }}
//             >
//                 Add Food
//             </Button>
//
//             {/* Grid */}
//             <Grid container spacing={3}>
//                 {filtered.map((product) => (
//                     <Grid item xs={12} sm={6} md={4} key={product.id}>
//                         <FoodCard
//                             product={product}
//                             onEdit={handleOpenEditDialog}
//                             onDelete={handleDelete}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>
//
//             {/* Dialog */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>
//                     {dialogType === 'add' ? 'Add Food' : 'Edit Food'}
//                 </DialogTitle>
//                 <DialogContent>
//
//                     <TextField
//                         label="Food Name"
//                         fullWidth
//                         sx={{ mb: 2, mt: 1 }}
//                         value={formData.name}
//                         onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                         }
//                     />
//
//                     <TextField
//                         label="Quantity"
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         value={formData.quantity}
//                         onChange={(e) =>
//                             setFormData({ ...formData, quantity: e.target.value })
//                         }
//                     />
//
//                     <TextField
//                         label="Price"
//                         type="number"
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         value={formData.unitPrice}
//                         onChange={(e) =>
//                             setFormData({ ...formData, unitPrice: e.target.value })
//                         }
//                     />
//
//                     <Button component="label" startIcon={<UploadIcon />}>
//                         Upload Image
//                         <input hidden type="file" onChange={(e) => {
//                             if (e.target.files) {
//                                 setSelectedImage(e.target.files[0]);
//                             }
//                         }} />
//                     </Button>
//
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog}>Cancel</Button>
//                     <Button onClick={handleSubmit}>
//                         {dialogType === 'add' ? 'Add' : 'Update'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//
//             {/* Snackbar */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//             >
//                 <Alert severity={snackbar.severity}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };
//
// export default Products;

import { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Snackbar,
    Box,
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon
} from '@mui/icons-material';

import type { Product } from '../types';
import FoodCard from '../components/FoodCard';

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../service/productService';

const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        unitPrice: '',
        imageUrl: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        quantity: '',
        unitPrice: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const [submitting, setSubmitting] = useState(false);

    // ================= FETCH =================
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error: any) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to fetch products',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // ================= VALIDATION =================
    const validateForm = () => {
        const errors = { name: '', quantity: '', unitPrice: '' };
        let valid = true;

        if (!formData.name) {
            errors.name = 'Product name required';
            valid = false;
        }
        if (!formData.quantity) {
            errors.quantity = 'Quantity required';
            valid = false;
        }
        if (!formData.unitPrice) {
            errors.unitPrice = 'Price required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    // ================= DIALOG =================
    const handleOpenAddDialog = () => {
        setDialogType('add');
        setFormData({ name: '', quantity: '', unitPrice: '', imageUrl: '' });
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (product: Product) => {
        setDialogType('edit');
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            quantity: product.quantity,
            unitPrice: product.unitPrice.toString(),
            imageUrl: product.imageUrl || ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSubmitting(false);
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);

        try {
            const payload = {
                name: formData.name,
                quantity: formData.quantity,
                unitPrice: parseFloat(formData.unitPrice),
                imageUrl: formData.imageUrl
            };

            if (dialogType === 'add') {
                const newProduct = await createProduct(payload);
                setProducts([newProduct, ...products]);
                setSnackbar({ open: true, message: 'Product added!', severity: 'success' });
            } else if (currentProduct) {
                const updated = await updateProduct(currentProduct.id, payload);
                setProducts(products.map(p =>
                    p.id === currentProduct.id ? updated : p
                ));
                setSnackbar({ open: true, message: 'Product updated!', severity: 'success' });
            }

            handleCloseDialog();

        } catch (err: any) {
            setSnackbar({
                open: true,
                message: err.message || 'Operation failed',
                severity: 'error'
            });
        } finally {
            setSubmitting(false);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this product?')) return;

        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err: any) {
            setSnackbar({
                open: true,
                message: 'Delete failed',
                severity: 'error'
            });
        }
    };

    // ================= FILTER =================
    const filtered = products
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    // ================= LOADING =================
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    // ================= UI =================
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, color: '#ff6b35' }}>
                🍔 Food Menu
            </Typography>

            {/* SEARCH */}
            <TextField
                fullWidth
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 3 }}
            />

            {/* ADD BUTTON */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{ mb: 3 }}
            >
                Add Food
            </Button>

            {/* GRID */}
            <Grid container spacing={3}>
                {filtered.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <FoodCard
                            product={product}
                            onEdit={handleOpenEditDialog}
                            onDelete={handleDelete}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* DIALOG */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogType === 'add' ? 'Add Food' : 'Edit Food'}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        label="Food Name"
                        fullWidth
                        sx={{ mb: 2, mt: 1 }}
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />

                    <TextField
                        label="Quantity"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.quantity}
                        onChange={(e) =>
                            setFormData({ ...formData, quantity: e.target.value })
                        }
                        error={!!formErrors.quantity}
                        helperText={formErrors.quantity}
                    />

                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.unitPrice}
                        onChange={(e) =>
                            setFormData({ ...formData, unitPrice: e.target.value })
                        }
                        error={!!formErrors.unitPrice}
                        helperText={formErrors.unitPrice}
                    />

                    {/* ✅ IMAGE URL FIELD */}
                    <TextField
                        label="Image URL"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={formData.imageUrl}
                        onChange={(e) =>
                            setFormData({ ...formData, imageUrl: e.target.value })
                        }
                    />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={submitting}>
                        {dialogType === 'add' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* SNACKBAR */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Container>
    );
};

export default Products;