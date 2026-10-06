# Sizzle Bites ordering website

Static ordering website for Sizzle Bites, Chakswari, AJK.

## Included
- Responsive professional burgundy/gold food-brand design
- Light/dark theme button
- Full menu transcribed from the supplied menu photos
- Cart and checkout
- Customer name, phone and delivery address
- Browser “Use my location” button
- 5 km delivery-radius check from the supplied Google Maps location
- Rs. 200 delivery fee
- Cash on Delivery and EasyPaisa option
- WhatsApp order handoff to 923429823459
- Post-order confirmation message telling the customer staff will call to confirm

## Important production note
This version is a static site. The order is handed to WhatsApp using a pre-filled message. It does not silently send an SMS/WhatsApp message to the customer or process EasyPaisa payments automatically. For those features, connect a backend and WhatsApp Business/API provider and an EasyPaisa payment integration.

## Configuration
Edit `app.js` at the top:
- `whatsapp` — the restaurant's WhatsApp number in international format without `+`
- `easypaisa` — payment number
- `lat`, `lng` — restaurant coordinates
- `deliveryRadiusKm` — delivery radius
- `deliveryFee` — delivery charge

The supplied Google Maps short link resolves to Sizzle Bites on Chakswari Rd at approximately 33.2581594, 73.7878513.
