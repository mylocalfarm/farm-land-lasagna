using System;
using Microsoft.Extensions.Options;
using RestSharp;
using RestSharp.Authenticators;

namespace FarmLandLasanga.Services
{
    public class MailGunEmailService : IEmailService
    {
        private MailGunEmailOptions _options;

        public MailGunEmailService(IOptionsSnapshot<MailGunEmailOptions> options)
        {
            _options = options.Value;
        }

        public void SendOneTimePassword(string email, string magicLink)
        {
            System.Console.WriteLine(new
            {
                from = _options.MailGunFromAddress,
                to = email,
                magicLink
            });

            var client = new RestClient();

            client.BaseUrl = new Uri($"https://api.mailgun.net/v3/{_options.MailGunDomain}");

            client.Authenticator = new HttpBasicAuthenticator("api", _options.MailGunApiKey);

            var request = new RestRequest();

            request.Resource = "messages";
            request.Method = Method.POST;

            request.AddParameter("from", $"MyLocal.Farm <{_options.MailGunFromAddress}>");
            request.AddParameter("to", email);
            request.AddParameter("subject", "Log in to MyLocal.Farm");
            request.AddParameter("text", magicLink);

            var response = client.Execute(request);

            System.Console.WriteLine(response.Content);
        }
    }
}