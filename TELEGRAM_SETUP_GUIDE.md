# Telegram Bot API Setup Guide

## 🤖 Complete Setup Instructions

### Step 1: Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather and send `/newbot`
3. **Choose a name** for your bot (e.g., "ExpenseIQ Bot")
4. **Choose a username** for your bot (must end with 'bot', e.g., "expenseiq_bot")
5. **Copy the bot token** that BotFather provides (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

#### Method 1: Using @userinfobot
1. Search for `@userinfobot` in Telegram
2. Start a chat and send any message
3. The bot will reply with your user ID

#### Method 2: Using Telegram Web API
1. Send a message to your bot first
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Look for `"chat":{"id":123456789}` in the response

#### Method 3: For Group Chats
1. Add your bot to the group
2. Send a message mentioning the bot
3. Use the same API URL as Method 2
4. Look for the group chat ID (will be negative, e.g., `-123456789`)

### Step 3: Configure Environment Variables

Create or update your `.env.local` file:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=123456789
VITE_USER_ID=your_username
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
VITE_DEBUG_MODE=true
```

### Step 4: Test Your Configuration

1. **Start your application**: `npm run dev`
2. **Navigate to dashboard**: `http://localhost:5173/app`
3. **Click the health check button** (Activity icon in header)
4. **Test each feature**:
   - Send a text message
   - Upload an image
   - Record and send a voice message

## 📱 Telegram Bot Features

### Text Messages
- **Format**: HTML formatting supported
- **Length**: Up to 4,096 characters
- **Features**: Bold, italic, links, mentions

### Images
- **Formats**: JPG, PNG, GIF, WebP
- **Size Limit**: 10MB for photos
- **Captions**: Up to 1,024 characters

### Voice Messages
- **Formats**: OGG, MP3, M4A, WAV
- **Size Limit**: 50MB
- **Duration**: Up to 1 hour
- **Captions**: Up to 1,024 characters

## 🔧 Advanced Configuration

### Bot Permissions
Your bot needs these permissions:
- Send messages
- Send photos
- Send voice messages
- Send documents (optional)

### Rate Limits
Telegram API has these limits:
- **Messages**: 30 messages per second
- **Groups**: 20 messages per minute
- **Same chat**: 1 message per second

### Error Handling
The integration handles these errors:
- **401**: Invalid bot token
- **403**: Bot blocked or chat not found
- **413**: File too large
- **429**: Rate limit exceeded
- **Network errors**: Automatic retry with backoff

## 🛠 Troubleshooting

### Common Issues

#### "Invalid bot token"
- Check your `VITE_TELEGRAM_BOT_TOKEN` in `.env.local`
- Ensure the token format is correct (contains `:`)
- Verify the token with BotFather

#### "Bot blocked or chat not found"
- Check your `VITE_TELEGRAM_CHAT_ID` in `.env.local`
- Ensure you've sent at least one message to the bot
- For groups, make sure the bot is still a member

#### "File too large"
- Images: Maximum 10MB
- Voice: Maximum 50MB
- Compress files if needed

#### "Rate limit exceeded"
- Wait before sending more messages
- The app automatically retries with backoff

### Debug Mode
Enable debug logging by setting:
```env
VITE_DEBUG_MODE=true
```

This will show detailed logs in the browser console.

### Health Check
Use the health check button in the dashboard header to:
- Verify bot token validity
- Check bot information
- Test API connectivity
- Monitor response times

## 🔒 Security Best Practices

### Environment Variables
- Never commit `.env.local` to version control
- Use different bots for development and production
- Rotate bot tokens periodically

### Bot Security
- Set bot privacy mode with BotFather: `/setprivacy`
- Disable unused commands: `/deletebot` (if needed)
- Monitor bot usage regularly

### Chat Security
- Use private chats when possible
- For groups, ensure proper member management
- Consider using bot admin features

## 📊 Monitoring and Analytics

### Built-in Monitoring
The integration provides:
- Health status tracking
- Consecutive failure counting
- Response time monitoring
- Error logging with context

### Custom Analytics
You can extend the integration to track:
- Message delivery rates
- File upload success rates
- User engagement metrics
- Error patterns

## 🚀 Production Deployment

### Environment Setup
```env
# Production environment
VITE_TELEGRAM_BOT_TOKEN=your_production_bot_token
VITE_TELEGRAM_CHAT_ID=your_production_chat_id
VITE_DEBUG_MODE=false
VITE_API_TIMEOUT=15000
```

### Monitoring
Set up monitoring for:
- Bot API availability
- Message delivery success rates
- Error rates and patterns
- Response times

### Scaling Considerations
- Use webhook updates for high-volume bots
- Implement message queuing for reliability
- Consider multiple bots for load distribution
- Monitor Telegram API limits

## 📞 Support

### Telegram Resources
- [Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Telegram Bot Features](https://core.telegram.org/bots/features)

### Common Commands
- `/start` - Start bot interaction
- `/help` - Get help information
- `/settings` - Bot settings (if implemented)

### Getting Help
1. Check the browser console for detailed error logs
2. Use the health check feature to diagnose issues
3. Verify your bot token and chat ID
4. Test with a simple message first
5. Check Telegram's status page for API issues

---

🎉 **Your Telegram Bot integration is now ready!** All text messages, images, and voice recordings from ExpenseIQ will be sent directly to your Telegram chat.