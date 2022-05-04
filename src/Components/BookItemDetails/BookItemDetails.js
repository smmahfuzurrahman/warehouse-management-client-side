import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookItemDetails.css';
const BookItemDetails = () => {
    const { itemsId } = useParams();
    const [bookItem, setBookItem] = useState({});
    const navigate = useNavigate();

    console.log(bookItem);
    useEffect(() => {
        const url = `http://localhost:5000/items/${itemsId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setBookItem(data))
    }, [])
    const handleDelivered = data => {
        const { quantity, ...rest } = bookItem;
        const quantity1 = parseInt(bookItem.quantity) - 1;
        const quantityStr = quantity1.toString();
        const newQuantity = { quantity: quantityStr, ...rest }
        setBookItem(newQuantity);

        const getquantity = bookItem.quantity;
        console.log(getquantity);
        const updateQuantity = { getquantity };
        const url = `http://localhost:5000/items/${itemsId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateQuantity)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }
    return (
        <div>
            <div className='item mx-auto item-slice'>
                <div>
                    <img src={bookItem.img} alt="" />
                </div>
                <div className='item-information'>
                    <h5 className='ms-3'>Name: {bookItem.name}</h5>
                    <h6 className='ms-3'>ID: {bookItem._id}</h6>
                    <p><b>Description:</b> {bookItem.description?.slice(0, 130)}...</p>
                    <p><b>Quantity:</b> {bookItem.quantity}</p>
                    <p><b>Price:</b> ${bookItem.price}</p>
                    <p><b>Publish by</b> {bookItem.publisher}</p>
                    <div className='btn-update'>
                        <button onClick={handleDelivered}>Delivered</button>
                    </div>
                </div>
            </div>
            <div className='manage-inv'>
                <button onClick={() => navigate('/manageitems')}>Manage Inventories</button>
            </div>
        </div>
    );
};

export default BookItemDetails;