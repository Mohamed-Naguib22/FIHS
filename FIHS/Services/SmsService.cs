using Twilio.Types;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace FIHS.Services
{
    public class SmsService
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _twilioPhoneNumber;

        public SmsService(string accountSid, string authToken, string twilioPhoneNumber)
        {
            _accountSid = accountSid;
            _authToken = authToken;
            _twilioPhoneNumber = twilioPhoneNumber;
        }

        public void SendSms(string toPhoneNumber, string message)
        {
            TwilioClient.Init(_accountSid, _authToken);

            var to = new PhoneNumber(toPhoneNumber);
            var from = new PhoneNumber(_twilioPhoneNumber);

            MessageResource.Create(to: to, from: from, body: message);
        }
    }
}
