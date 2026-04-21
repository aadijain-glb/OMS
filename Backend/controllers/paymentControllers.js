// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        // Amount should be passed in smallest currency unit (cents if USD)
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        // Mock payment intent for development without Stripe
        const mockClientSecret = `mock_secret_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        res.json({
            clientSecret: mockClientSecret,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create payment intent", error: error.message });
    }
};
