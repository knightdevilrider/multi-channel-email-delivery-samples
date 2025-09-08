# Webhook Troubleshooting Guide

## 🔍 Root Cause Analysis

### Common Causes of 404 Errors

1. **n8n Workflow Not Activated**
   - The n8n workflow containing the webhook is not active
   - Solution: Go to n8n dashboard and activate the workflow

2. **Incorrect Webhook URL**
   - URL path is wrong or contains typos
   - Solution: Copy the exact webhook URL from n8n

3. **n8n Instance Issues**
   - n8n cloud instance is down or experiencing issues
   - Solution: Check n8n status page

4. **Webhook Node Configuration**
   - Webhook node is not properly configured in the workflow
   - Solution: Verify webhook node settings

## 🛠 Systematic Troubleshooting Steps

### Step 1: Verify Webhook URL
```bash
# Test webhook endpoint directly
curl -X GET "https://sachin1970.app.n8n.cloud/webhook-test/42110d0b-c600-4450-b4b6-c6ed5fb6f0a1"
```

### Step 2: Check n8n Workflow Status
1. Log into your n8n instance
2. Navigate to your workflow
3. Ensure the workflow is **ACTIVE** (toggle should be ON)
4. Check that the webhook node is properly configured

### Step 3: Test with Simple Payload
```bash
curl -X POST "https://sachin1970.app.n8n.cloud/webhook-test/42110d0b-c600-4450-b4b6-c6ed5fb6f0a1" \
  -H "Content-Type: application/json" \
  -d '{"test": "hello"}'
```

### Step 4: Verify Network Connectivity
```javascript
// Test in browser console
fetch('https://sachin1970.app.n8n.cloud/webhook-test/42110d0b-c600-4450-b4b6-c6ed5fb6f0a1', {
  method: 'GET',
  mode: 'cors'
}).then(response => console.log(response.status));
```

## 🔧 n8n Configuration Checklist

### Webhook Node Setup
1. **HTTP Method**: Should accept POST requests
2. **Path**: Must match the URL path exactly
3. **Response Mode**: Set to "On Received" or "Last Node"
4. **Authentication**: Ensure no authentication is required (or properly configured)

### Workflow Configuration
1. **Workflow Status**: Must be ACTIVE
2. **Trigger Node**: Webhook should be the first node
3. **Error Handling**: Add error handling nodes if needed
4. **Response Node**: Include a response node to send data back

## 🚨 Emergency Fixes

### Quick Fix 1: Use Health Check
```javascript
import { healthCheck } from './services/webhooks';

// Check webhook status
const status = await healthCheck();
console.log('Webhook status:', status);
```

### Quick Fix 2: Enable Debug Mode
```env
# Add to .env.local
VITE_DEBUG_MODE=true
```

### Quick Fix 3: Test with Fallback URL
```env
# Add backup webhook URL
VITE_FALLBACK_WEBHOOK_URL=https://your-backup-webhook.com/webhook
```

## 📊 Monitoring and Alerts

### Health Check Implementation
The application now includes:
- Automatic health checks every minute
- Manual health check button in dashboard header
- Detailed error logging with request IDs
- Exponential backoff retry mechanism

### Error Tracking
- All webhook errors are logged with context
- Request/response details captured
- Performance metrics tracked
- Consecutive failure counting

## 🔄 Recovery Procedures

### Automatic Recovery
1. **Retry Logic**: 3 attempts with exponential backoff
2. **Fallback URL**: Automatic failover to backup webhook
3. **Circuit Breaker**: Prevents overwhelming failed endpoints
4. **Health Monitoring**: Continuous endpoint monitoring

### Manual Recovery
1. Check n8n workflow status
2. Verify webhook URL in environment variables
3. Test endpoint connectivity
4. Review application logs
5. Use health check button in dashboard

## 📝 Best Practices

### Development
- Always test webhook endpoints before deployment
- Use environment variables for all URLs
- Implement comprehensive error handling
- Add request/response logging

### Production
- Set up monitoring and alerting
- Configure fallback endpoints
- Implement circuit breaker patterns
- Regular health check scheduling

### n8n Workflow Design
- Keep workflows simple and focused
- Add error handling nodes
- Use proper response formatting
- Test with various payload types

## 🆘 Emergency Contacts

If webhook issues persist:
1. Check n8n status page: https://status.n8n.io/
2. Review n8n documentation: https://docs.n8n.io/
3. Contact n8n support if using paid plan
4. Check application logs for detailed error information

## 📋 Troubleshooting Checklist

- [ ] n8n workflow is active
- [ ] Webhook URL is correct
- [ ] Webhook node accepts POST requests
- [ ] Network connectivity is working
- [ ] Environment variables are set
- [ ] Application logs show detailed errors
- [ ] Health check passes
- [ ] Fallback URL is configured (optional)