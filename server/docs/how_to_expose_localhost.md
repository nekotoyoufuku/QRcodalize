# How to expose localhost

### 1. Install nginx

install nginx if you don't have one

```bash
brew install nginx
```

How to check if you have nginx

```bash
nginx -v
```

### 2. Create ngrok account

https://dashboard.ngrok.com/

### 3. Install ngrok

```bash
brew install ngrok/ngrok/ngrok
```

### 4. Add your authtoken

(You should get your token when you login to [gnrok.com](https://dashboard.ngrok.com/))

```bash
ngrok config add-authtoken <your_token>
```

### 5. Run localhost

```bash
npm run start
```

### 6. Deploy your localhost

```bash
ngrok http 3000
```

🎉 Congrats you should get url!
