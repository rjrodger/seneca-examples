{
  "pay": {  
    "paypal": {
      "useSandbox": true/false,
      "username": "PAYPAL_API_USERNAME",
      "password": "PAYPAL_API_PASSWORD",
      "signature": "PAYPAL_API_SIGNATURE"
    },
    "stripe": {
      "secretKey": "STRIPE_SECRET_KEY",
      "publishableKey": "STRIPE_PUBLISHABLE_KEY",
      "showAddress": true/false
    },
    "redirect": {
      "hostUrl": "http://localhost:3000",
      "success": "/completed",
      "fail": "/cancelled"
    }
  }
}