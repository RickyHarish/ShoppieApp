import React, { useState, useEffect } from 'react'
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
// import {useHistory} from 'react-router-use-history'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderOrderScreen = () => {
    const dispatch = useDispatch()

    
    
    const {id} = useParams()
    const orderId = id

    const [sdkReady, setSdkReady] = useState(false)

    console.log(orderId)

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state=>state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    if(!loading){

        const addDecimals = (num)=>{
            return (Math.round(num*100)/100).toFixed(2)
        }
        //calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item)=> acc+item.price*item.qty, 0).toFixed(2))    

    }

    

    useEffect(()=>{
        const addPayPalScript = async()=>{
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload=()=>{
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }

        if(!order || successPay){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }

       
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult)=>{
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
    

  return loading ? <Loader />:error?<Message>{error}</Message>:<>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                   <p> <strong>Name:</strong>{order.user.name}</p>
                   <p> <strong>Email:</strong> <a href={`mail to ${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong>Address:</strong>
                       {' '} {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered?<Message variant='success'>Delivered on {order.deliveredAt}</Message>:<Message variant='danger'>Not Delivered</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    </p>
                    {order.isPaid?<Message variant='success'>Paid on {order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length===0 ? <Message>Order is Empty</Message>
                    :
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item, index)=>(
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} X {item.price} = {`\u20B9 `}{item.qty*item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
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
                            <Col>Items </Col>
                            <Col>{`\u20B9 `}{order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>{`\u20B9 `}{order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>{`\u20B9 `}{order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>{`\u20B9 `}{order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                            )}
                        </ListGroup.Item>
                    )}
                    </ListGroup>
            </Card>
        </Col>
      </Row>
  </>
}

export default OrderOrderScreen