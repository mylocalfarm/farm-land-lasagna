namespace FarmLandLasanga.Services
{
    public interface IEmailService
    {
        void SendOneTimePassword(string email, string magicLink);
    }
}