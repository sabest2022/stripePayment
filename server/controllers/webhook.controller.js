
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET;
const path = require('path');
const ordersFilePath = path.join(__dirname, '../db', "orders.json");
const fs = require('fs');


const handleWebhook = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.error(err.stack);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            break;
        case 'checkout.session.completed':
            try {
                const checkoutSession = event.data.object;
                const amountTotal = checkoutSession.amount_total / 100;
                const currency = checkoutSession.currency;
                const customerId = checkoutSession.customer;
                const customer = checkoutSession.customer_details.email;
                const paymentStatus = checkoutSession.payment_status;
                const eventCreatedAt = event.created;
                const paymentCompletedDate = new Date(eventCreatedAt * 1000);
                // Retrieve the session's line items
                const fullSession = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
                    expand: ['line_items'],
                },);
                const lineItems = fullSession.line_items.data;
                const orderedItems = lineItems.map(item => {
                    return {
                        name: item.description,
                        price: item.price.unit_amount / 100,
                        quantity: item.quantity
                    };
                });
                const order = { customerId, customer, amountTotal, currency, orderedItems, paymentStatus, paymentCompletedDate };
                console.log("Line items:", orderedItems);
                // Save order details
                const ordersJson = fs.readFileSync(ordersFilePath, "utf8");
                const orders = JSON.parse(ordersJson);
                orders.push(order);
                fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
            } catch (error) {
                console.error("Error processing checkout.session.completed event:", error);
            }
            break;

        case 'charge.succeeded':
            const chargeSucceded = event.data.object;
            // console.log("chargeSucceded", chargeSucceded);
            break;
        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            // console.log("paymentIntentCreated", paymentIntentCreated);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
};

module.exports = { handleWebhook };