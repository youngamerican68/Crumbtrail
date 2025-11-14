# Email Form Setup Instructions

## Get Your Web3Forms Access Key

1. Go to https://web3forms.com
2. Enter your email: **crumbtrailcookies@gmail.com**
3. Click "Get Access Key"
4. Check your email (crumbtrailcookies@gmail.com) for the access key
5. Copy the access key

## Update the Form

1. Open `index.html` in a text editor
2. Find the line: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">`
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
4. Save the file
5. Commit and push the changes to deploy

Example:
```html
<input type="hidden" name="access_key" value="abc123-your-actual-key-here">
```

## That's it!

Once you update the access key and deploy, all newsletter signups will be sent to crumbtrailcookies@gmail.com with the subject "New Newsletter Signup - Crumb Trail Cookies"
