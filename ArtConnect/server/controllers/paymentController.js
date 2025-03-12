const { Stripe } = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PaymentReq = async (req, res) => {
    try {
        const { name, email, phone, address, amount } = req.body;

        console.log(name, email, phone, address, amount);
        

        if (!name || !email || !amount || !phone || !address) {
            return res.status(404).send({
                success: true,
                message: 'Please enter valid information!',
            })
        }

        let customer;

        const existingCustomer = await stripe.customers.list({ email: email })

        if (existingCustomer.data.length > 0) {
            customer = existingCustomer.data[0];
        } else {
            const newCustomer = await stripe.customers.create({
                name: name,
                email: email,
                phone: phone,
                address: {
                    line1: `${address.streetNumber} ${address.streetName}`,
                    line2: address.unitNumber,
                    city: address.city,
                    postal_code: address.postalCode,
                    country: address.country
                }
            })
            customer = newCustomer;
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2025-02-24.acacia' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseFloat(amount) * 100,  // cents to dollar
            currency: 'cad',
            customer: customer.id,
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter
            // is optional because Stripe enables its functionality by default.
            receipt_email: email,
            setup_future_usage: "on_session",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        });

        return res.json({
            paymentIntent: paymentIntent,
            ephemeralKey: ephemeralKey,
            customer: customer.id,
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: 'ERROR in payment API!',
            error,
        })
    }
}

module.exports = PaymentReq; 