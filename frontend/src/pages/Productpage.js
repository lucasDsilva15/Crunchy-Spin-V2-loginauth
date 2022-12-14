import { useEffect, useState } from "react"
import userService from '../Services/userServices'
import devService from '../Services/developerServices'
import { useNavigate, useParams } from "react-router-dom"
import EditProduct from "../components/EditProduct"
import { Button, InputLabel, NativeSelect } from "@mui/material"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Productpage ({developer}) {
    const navigate = useNavigate()
    const [product, setProducts] = useState()
    const params = useParams()

    const buttonSx = {
        backgroundColor:'#ff9100',
        color: 'black',
        boxShadow: '10',
        '&:hover':{
            backgroundColor:'#f57c00',
            boxShadow: '15',
        }
    }
    
    const deleteProduct = async () => {
        try {
            const response = await devService.deleteP(params.id)
            console.log(response)
            navigate('/allproducts')
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async () => {
        try {
            const response = await userService.showProduct(params.id)
            setProducts(response.data.product)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePurchase = async () => {
        try {
            await userService.purchaseProduct(params.id)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {
        getProduct()
        // eslint-disable-next-line
    }, [])
    return (
        product ? (
            <div id='showpage'>
            <div id='showpagecontainer'>
                <div id='imageshowpage'>
                    <img src={product.image} alt={product.name}/>   
                </div>
                <div id='productinfo'>
                <h1>{product.name}</h1>
                <p id='productprice'>
                    {'$'+product.price}
                </p>
                <p>
                    {product.description}
                </p>
                {product.category === 'apparel' && (
                    <div>
                         <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Size
                        </InputLabel>
                        <NativeSelect
                            defaultValue='M'
                            inputProps={{
                                name: 'Size',
                                id: 'uncontrolled-native',
                                size: 'large'
                            }}
                            >
                            <option value='XS'>XS</option>
                            <option value='S'>S</option>
                            <option value='M'>M</option>
                            <option value='L'>L</option>
                            <option value='XL'>XL</option>
                        </NativeSelect>
                    </div>
                )}
                <p id='productinventory'>
                    {product.quantity === 0? 'OUT OF STOCK' : product.quantity + ' In Stock'} 
                </p>
            {product.quantity === 0? <Button variant='disabled' sx={{bgcolor: 'text.disabled'}}id='outofstock'> Out Of Stock</Button> : 
                        <Button sx={buttonSx} id='purchasebutton' onClick={() =>{ navigate(`/purchased/${product._id}`); handlePurchase()}}>
                            Buy Now
                        </Button>}
                </div>
            </div>
            {developer === true && (
                <div>
                    <Button startIcon={<DeleteForeverOutlinedIcon/>} color='error' variant='contained' onClick={deleteProduct}> Delete</Button>
                    <EditProduct product={product}/>
                </div>
            )}
        </div>
        ) : (
            <div>
                <h1> Loading... </h1>
            </div>
        )
        
        

    )
}