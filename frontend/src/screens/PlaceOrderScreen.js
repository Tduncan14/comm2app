import {useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {toast} from 'react-toastify'
import Checkoutsteps from '../Components/CheckoutSteps';
import Message from  '../Components/Message';
import Loader from '../Components/Loading';
import {useCreateOrderMutation} from '../slices/OrderApiSlice';
import {clearCartItems} from '../slices/CartSlice';


const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector ((state) => state.cart)


    const[createOrder, {isLoading, error}] = useCreateOrderMutation();


  
    useEffect(() => {

        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }
        else if(!cart.paymentMethod){
            navigate('/payment')
        }

    },[cart.paymentMethod, cart.shippingAddress.address, navigate])


    const placeOrderHandler = async () => {

        try{
            const res = await createOrder({
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice

            }).unwrap()

            console.log('hello')

            dispatch(clearCartItems())
            navigate(`/order/${res._id}`);

        }

        catch(error){
            console.log(error)
            console.log('hello')
            toast.error(error)

        }



    }



    return(
       
        <>
       <Checkoutsteps step1 step2 step3 step4 />

       <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{
                        ''}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                     <strong>Method</strong> {cart.paymentMethod}
                </ListGroup.Item>


                <ListGroup.Item>
                    <h2>OrderItems</h2>
                    {cart.cartItems.length === 0 ? (
                        <Message> Your Cart is Empty</Message>
                    ):(
                        <ListGroup.Item>
                               {cart.cartItems.map((item,index) =>(
                                <ListGroup.Item variant='flush' key={index}>
                                   <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded>
                                            
                                        </Image>
                                    </Col>
                                    <Col>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x $ {item.price} = ${item.qty * item.price}
                                    </Col>
                                   </Row>
                                </ListGroup.Item>
                            ))}
                         
                        </ListGroup.Item>
                    )
                    }
                </ListGroup.Item>
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>
                              ${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>
                              ${cart.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>
                              ${cart.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:</Col>
                            <Col>
                              ${cart.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>



                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>
                              ${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>



                    <ListGroup.Item>
                        {error && <Message variant = 'danger'> error </Message>}
                    </ListGroup.Item>


                    <ListGroup.Item>
                         <Button type='button'
                         className="btn-block"
                         disabled={cart.cartItems.length === 0}
                         onClick={placeOrderHandler}>
                               Place Order
                         </Button>


                         {isLoading && <Loader />}
                    </ListGroup.Item>
                </ListGroup>
            </Card>

        </Col>

       </Row>
       </>
    )





}


export default PlaceOrderScreen