import { useEffect, useState
 } from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import {toast} from 'react-toastify'
import{PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import Message from '../Components/Message';
import Loader from '../Components/Loading';
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../slices/OrderApiSlice';
import { useSelector } from 'react-redux';



const OrderScreen = () => {

    const {id:orderId} = useParams();
    const {data:order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)


    const [payOrder,{isLoading:loadingPay}] = usePayOrderMutation();


    const [{isPending},paypalDispatch] = usePayPalScriptReducer();


    const {data:paypal, isLoading:loadingPayPal, error:errorPayPal} = useGetPaypalClientIdQuery()


    console.log(order,'this is the order')

    console.log(useGetPaypalClientIdQuery(),'this is paypal')

    const {userInfo} = useSelector((state) => state.auth)






    useEffect(( ) => {

        console.log(order,'this is the main order')

        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'client-id':paypal.clientId,
                         currency:'USD'
                    }
                })
                paypalDispatch({type:'setLoadingStatus',value:'pending'});

            }

            if(order && !order.isPaid){
                if(!window.paypal){

                    loadPayPalScript();

                }
            }
        }

    },[order,paypal,paypalDispatch,loadingPayPal,errorPayPal])

    const onApproveTest = () => {
        console.log()
    }

    function onApprove(){

    }

    function onError(){

    }

    function createOrder(){
        
    }





    return (
        <>
        {isLoading ? <Loader /> : error ? <Message variant='danger' /> :(
            <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>
                                    Name: 
                                </strong>    {order.user.name}

                               
                            </p>
                            <p>
                                <strong>
                                    email:
                                </strong>      {order.user.email}

                            
                            </p>
                            <p>
                                <strong>Address:

                                </strong> {order.shippingAddress.address}, {order.shippingAddress.city}{''} {order.shippingAddress.postalCode} {
                                    ''}{order.shippingAddress.country}
                            </p>
                            {order.isDelievered? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ): (
                                <Message variant = 'danger'> Not Delivered </Message>
                            )}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h1>Payment Method</h1>

                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>


                            {order.isPaid ? (
                                <Message variant = 'success'>Paid on {order.paidAt}</Message>
                            ):(<Message variant='danger'> Not Paid</Message>)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                              {
                                order.orderItems.map((item,index) =>(

                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md = {1}>
                                                <Image src={item.image} alt={item.name} fluid rounded /> 
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))
                              }
                         
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant = 'flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>


                            <ListGroup.Item> 
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}

                                        {isPending ? <Loader /> : (
                                            <div>
                                                <Button onClick = {onApproveTest} style={{marginBottom:'10px'}}>
                                                   Test Pay Order
                                                </Button>

                                                <div>
                                                    <PayPalButtons
                                                     createOrder={createOrder}
                                                     onApprove={onApprove}
                                                     onError={onError}>


                                                    </PayPalButtons>
                                                </div>
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                )
                            }
                            {/* pay order later */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            </>
 
        )}
        </>

 

    )

}


export default OrderScreen